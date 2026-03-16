import { ServicoTentaNovamente } from "../ServicoTentaNovamente";
import { Endpoint } from "../../Endpoint";

export class AcaoTentaNovamente implements ServicoTentaNovamente {
  private id: string | number;

  constructor(id: string | number) {
    this.id = id;
  }

  getEndpoint(): string {
    return `${Endpoint.ACAO}/${this.id}${Endpoint.TENTAR_NOVAMENTE}`;
  }
}
