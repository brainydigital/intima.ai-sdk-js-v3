export interface ServicoSolicitacao {
  getEndpoint(): string;
  getRequest(): Record<string, any>;
}
