import { ServicoBusca } from "../ServicoBusca";
import { Endpoint } from "../../Endpoint";

export class ProtocoloBusca implements ServicoBusca {
  private id: string | number | null;

  constructor(id: string | number | null = null) {
    this.id = id;
  }

  getEndpoint(): string {
    if (!this.id) {
      return `${Endpoint.PROTOCOLO}${Endpoint.BUSCAR}`;
    }

    return `${Endpoint.PROTOCOLO}/${this.id}${Endpoint.BUSCAR}`;
  }
}
