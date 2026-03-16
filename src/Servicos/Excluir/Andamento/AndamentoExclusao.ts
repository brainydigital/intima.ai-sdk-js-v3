import { ServicoExclusao } from "../ServicoExclusao";
import { Endpoint } from "../../Endpoint";

export class AndamentoExclusao implements ServicoExclusao {
  private id: string | number;

  constructor(id: string | number) {
    this.id = id;
  }

  getEndpoint(): string {
    return `${Endpoint.ANDAMENTO}/${this.id}${Endpoint.EXCLUIR}`;
  }
}
