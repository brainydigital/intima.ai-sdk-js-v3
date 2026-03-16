import { ServicoBusca } from "../ServicoBusca";
import { Endpoint } from "../../Endpoint";

export class NotificacaoEmailBusca implements ServicoBusca {
  private id: string | number | null;

  constructor(id: string | number | null = null) {
    this.id = id;
  }

  getEndpoint(): string {
    if (!this.id) {
      return `${Endpoint.NOTIFICACAO}${Endpoint.EMAIL}${Endpoint.BUSCAR}`;
    }

    return `${Endpoint.NOTIFICACAO}${Endpoint.EMAIL}/${this.id}${Endpoint.BUSCAR}`;
  }
}
