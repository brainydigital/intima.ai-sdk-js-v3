import { ServicoSolicitacao } from "../ServicoSolicitacao";
import { Endpoint } from "../../Endpoint";

export class EscutaSolicitacao implements ServicoSolicitacao {
  private id: string | number;

  constructor(id: string | number) {
    this.id = id;
  }

  getEndpoint(): string {
    return `${Endpoint.ESCUTA}/${this.id}${Endpoint.SOLICITAR}`;
  }

  getRequest(): Record<string, any> {
    return {};
  }
}
