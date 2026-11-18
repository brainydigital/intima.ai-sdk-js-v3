import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { APIRequestException } from "../Exceptions/APIRequestException";

type ValorCodigo2fa = string | number | null | undefined;

export type Codigo2fa =
  | ValorCodigo2fa
  | (() => ValorCodigo2fa | Promise<ValorCodigo2fa>);

export type OpcoesAPI = AxiosRequestConfig & { codigo_2fa?: Codigo2fa };

export class API {
  public static readonly URL_BASE = "https://app.intima.ai/api/v3";
  public static readonly USER_AGENT = "Intimai_SDK/3.1.0";
  public static readonly HEADER_CODIGO_2FA = "X-Codigo-2FA";

  private apiToken: string;
  private opcoesAPI: AxiosRequestConfig;
  private cliente: AxiosInstance;
  private codigo2fa: Codigo2fa = null;

  constructor(apiToken: string, opcoes: OpcoesAPI = {}) {
    const { codigo_2fa, ...opcoesAPI } = opcoes;

    this.apiToken = apiToken;
    this.codigo2fa = codigo_2fa ?? null;
    this.opcoesAPI = opcoesAPI;
    this.cliente = axios.create();
  }

  definirCodigo2fa(codigo: Codigo2fa): void {
    this.codigo2fa = codigo ?? null;
  }

  static formulario(dados: Record<string, any>): string {
    const parametros = new URLSearchParams();

    const adicionar = (chave: string, valor: any): void => {
      if (valor === null || valor === undefined) {
        return;
      }

      if (Array.isArray(valor)) {
        valor.forEach((item, indice) => adicionar(`${chave}[${indice}]`, item));
        return;
      }

      if (typeof valor === "object") {
        Object.entries(valor).forEach(([subchave, item]) => adicionar(`${chave}[${subchave}]`, item));
        return;
      }

      parametros.append(chave, typeof valor === "boolean" ? (valor ? "1" : "0") : String(valor));
    };

    Object.entries(dados).forEach(([chave, valor]) => adicionar(chave, valor));

    return parametros.toString();
  }

  private static multipart(campos: Array<{ name: string; contents: any }>): FormData {
    const formulario = new FormData();

    for (const { name, contents } of campos) {
      if (contents === null || contents === undefined) {
        continue;
      }

      if (contents instanceof Blob) {
        formulario.append(name, contents);
      } else {
        formulario.append(name, String(contents));
      }
    }

    return formulario;
  }

  private async getOpcoes(
    pagina: number = 1,
    filtros: Record<string, any> = {},
    request: Record<string, any> = {}
  ): Promise<AxiosRequestConfig> {
    const { headers: headersOpcoes, params: paramsOpcoes, ...opcoes } = this.opcoesAPI;

    const headers: Record<string, string> = {
      Accept: "application/json",
      "User-Agent": API.USER_AGENT,
    };

    if (request.multipart) {
      headers["Content-Type"] = "multipart/form-data";
    } else if (request.form_params !== undefined) {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    const codigo = typeof this.codigo2fa === "function" ? await this.codigo2fa() : this.codigo2fa;

    if (codigo !== null && codigo !== undefined && codigo !== "") {
      headers[API.HEADER_CODIGO_2FA] = String(codigo);
    }

    return {
      ...opcoes,
      headers: {
        ...headers,
        ...((headersOpcoes as Record<string, string>) || {}),
        ...(request.headers || {}),
      },
      params: {
        api_token: this.apiToken,
        page: pagina,
        ...(paramsOpcoes || {}),
        ...(filtros?.filtros ?? filtros ?? {}),
      },
    };
  }

  private corpo(request: Record<string, any>): any {
    if (request.multipart) {
      return API.multipart(request.multipart);
    }

    if (request.form_params !== undefined) {
      return API.formulario(request.form_params);
    }

    return undefined;
  }

  private async requisitar(
    metodo: "get" | "post" | "put" | "delete",
    endpoint: string,
    config: AxiosRequestConfig,
    dados?: any
  ): Promise<any> {
    try {
      const response = await this.cliente.request({
        ...config,
        method: metodo,
        url: `${API.URL_BASE}${endpoint}`,
        data: dados,
      });

      return response.data === "" || response.data === undefined ? {} : response.data;
    } catch (error: any) {
      throw APIRequestException.doErro(error);
    }
  }

  async get(
    endpoint: string,
    pagina: number = 1,
    filtros: Record<string, any> = {},
    request: Record<string, any> = {}
  ): Promise<any> {
    return this.requisitar("get", endpoint, await this.getOpcoes(pagina, filtros, request));
  }

  async post(endpoint: string, request: Record<string, any> = {}): Promise<any> {
    const dados = this.corpo(request);

    return this.requisitar("post", endpoint, await this.getOpcoes(1, {}, request), dados);
  }

  async put(endpoint: string, request: Record<string, any> = {}): Promise<any> {
    const dados = this.corpo(request);

    return this.requisitar("put", endpoint, await this.getOpcoes(1, {}, request), dados);
  }

  async delete(endpoint: string): Promise<any> {
    return this.requisitar("delete", endpoint, await this.getOpcoes());
  }
}
