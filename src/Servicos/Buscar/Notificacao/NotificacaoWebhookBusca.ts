import { ServicoBusca } from "../ServicoBusca";
import { Endpoint } from "../../Endpoint";

export class NotificacaoWebhookBusca implements ServicoBusca {
  private id: string | null;

  constructor(id: string | null = null) {
    this.id = id;
  }

  getEndpoint(): string {
    if (!this.id) {
      return `${Endpoint.NOTIFICACAO}${Endpoint.WEBHOOK}${Endpoint.BUSCAR}`;
    }

    return `${Endpoint.NOTIFICACAO}${Endpoint.WEBHOOK}/${this.id}${Endpoint.BUSCAR}`;
  }
}
