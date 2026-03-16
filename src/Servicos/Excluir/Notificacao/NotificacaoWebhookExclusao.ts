import { ServicoExclusao } from "../ServicoExclusao";
import { Endpoint } from "../../Endpoint";

export class NotificacaoWebhookExclusao implements ServicoExclusao {
  private id: string | number;

  constructor(id: string | number) {
    this.id = id;
  }

  getEndpoint(): string {
    return `${Endpoint.NOTIFICACAO}${Endpoint.WEBHOOK}/${this.id}${Endpoint.EXCLUIR}`;
  }
}
