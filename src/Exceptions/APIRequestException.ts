export class APIRequestException extends Error {
  public status?: number;
  public originalError?: any;
  public corpo?: any;
  public headers: Record<string, any>;

  constructor(
    message: string,
    status?: number,
    originalError?: any,
    corpo?: any,
    headers: Record<string, any> = {}
  ) {
    super(message);
    this.name = new.target.name;
    this.status = status;
    this.originalError = originalError;
    this.corpo = corpo;
    this.headers = headers;
  }

  static doErro(error: any): APIRequestException {
    const resposta = error?.response;
    const status: number | undefined = resposta?.status;
    const corpo = resposta?.data;
    const headers = resposta?.headers ? { ...resposta.headers } : {};
    const mensagem = corpo?.data?.message ?? corpo?.message;
    const ehDoisFatores = status === 401 && typeof mensagem === "string" && mensagem.includes("2FA");

    const Classe = ehDoisFatores
      ? DoisFatoresException
      : status === 429
        ? LimiteDeRequisicoesException
        : APIRequestException;

    return new Classe(error?.message ?? String(error), status, error, corpo, headers);
  }

  getStatus(): number | undefined {
    return this.status;
  }

  getCorpo(): any {
    return this.corpo;
  }

  getMensagem(): string {
    const corpo = this.corpo;
    const mensagem = corpo && typeof corpo === "object"
      ? corpo.data?.message ?? corpo.message ?? corpo.error
      : undefined;

    return typeof mensagem === "string" ? mensagem : this.message;
  }

  getErros(): Record<string, string[]> {
    if (this.status !== 422 || !this.corpo || typeof this.corpo !== "object") {
      return {};
    }

    return Object.fromEntries(
      Object.entries(this.corpo).filter(([, valor]) => Array.isArray(valor))
    ) as Record<string, string[]>;
  }

  getHeader(nome: string): string | undefined {
    const chave = Object.keys(this.headers).find((item) => item.toLowerCase() === nome.toLowerCase());
    const valor = chave === undefined ? undefined : this.headers[chave];

    return Array.isArray(valor) ? valor[0] : valor === undefined ? undefined : String(valor);
  }

  toJson(): Record<string, any> {
    return {
      code: this.status,
      error: this.corpo ?? this.message,
    };
  }
}

export class DoisFatoresException extends APIRequestException {}

export class LimiteDeRequisicoesException extends APIRequestException {
  getRetryAfter(): number | undefined {
    const valor = this.getHeader("Retry-After");

    return valor !== undefined && /^\d+$/.test(valor) ? Number(valor) : undefined;
  }
}
