import { ServicoSolicitacao } from "../ServicoSolicitacao";
import { Endpoint } from "../../Endpoint";

export class AndamentoSolicitacao implements ServicoSolicitacao {
  private id: string | number;

  constructor(id: string | number) {
    this.id = id;
  }

  getEndpoint(): string {
    return `${Endpoint.ANDAMENTO}/${this.id}${Endpoint.SOLICITAR}`;
  }

  getRequest(): Record<string, any> {
    return {};
  }
}
