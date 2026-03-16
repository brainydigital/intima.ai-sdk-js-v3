import { ServicoExclusao } from "../ServicoExclusao";
import { Endpoint } from "../../Endpoint";

export class EscutaExclusao implements ServicoExclusao {
  private id: string | number;

  constructor(id: string | number) {
    this.id = id;
  }

  getEndpoint(): string {
    return `${Endpoint.ESCUTA}/${this.id}${Endpoint.EXCLUIR}`;
  }
}
