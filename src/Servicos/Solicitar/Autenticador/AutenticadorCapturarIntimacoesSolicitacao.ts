import { ServicoSolicitacao } from "../ServicoSolicitacao";
import { Endpoint } from "../../Endpoint";

export class AutenticadorCapturarIntimacoesSolicitacao implements ServicoSolicitacao {
  private id: string | number;

  constructor(id: string | number) {
    this.id = id;
  }

  getEndpoint(): string {
    return `${Endpoint.AUTENTICADOR}/${this.id}${Endpoint.CAPTURAR_INTIMACOES}`;
  }

  getRequest(): Record<string, any> {
    return {};
  }
}
