export interface ServicoAtualizacao {
  getEndpoint(): string;
  getRequest(): Record<string, any>;
}
