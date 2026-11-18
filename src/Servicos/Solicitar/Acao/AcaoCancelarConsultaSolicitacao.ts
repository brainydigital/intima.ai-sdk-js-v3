import { ServicoSolicitacao } from "../ServicoSolicitacao";
import { Endpoint } from "../../Endpoint";

export class AcaoCancelarConsultaSolicitacao implements ServicoSolicitacao {
  private id: string | number;

  constructor(id: string | number) {
    this.id = id;
  }

  getEndpoint(): string {
    return `${Endpoint.ACAO}/${this.id}${Endpoint.CANCELAR_CONSULTA}`;
  }

  getRequest(): Record<string, any> {
    return {};
  }
}
