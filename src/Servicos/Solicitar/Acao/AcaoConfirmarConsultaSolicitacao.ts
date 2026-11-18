import { ServicoSolicitacao } from "../ServicoSolicitacao";
import { Endpoint } from "../../Endpoint";

export class AcaoConfirmarConsultaSolicitacao implements ServicoSolicitacao {
  private id: string | number;

  constructor(id: string | number) {
    this.id = id;
  }

  getEndpoint(): string {
    return `${Endpoint.ACAO}/${this.id}${Endpoint.CONFIRMAR_CONSULTA}`;
  }

  getRequest(): Record<string, any> {
    return {};
  }
}
