import { ServicoExclusao } from "../ServicoExclusao";
import { Endpoint } from "../../Endpoint";

export class NotificacaoEmailExclusao implements ServicoExclusao {
  private id: string | number;

  constructor(id: string | number) {
    this.id = id;
  }

  getEndpoint(): string {
    return `${Endpoint.NOTIFICACAO}${Endpoint.EMAIL}/${this.id}${Endpoint.EXCLUIR}`;
  }
}
