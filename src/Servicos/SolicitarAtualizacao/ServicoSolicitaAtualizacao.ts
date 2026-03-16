export interface ServicoSolicitaAtualizacao {
  getEndpoint(): string;
  getRequest(): Record<string, any>;
}
