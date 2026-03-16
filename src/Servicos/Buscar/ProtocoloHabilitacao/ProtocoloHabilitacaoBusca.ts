import { ServicoBusca } from "../ServicoBusca";
import { Endpoint } from "../../Endpoint";

export class ProtocoloHabilitacaoBusca implements ServicoBusca {
  private id: string | number | null;

  constructor(id: string | number | null = null) {
    this.id = id;
  }

  getEndpoint(): string {
    if (!this.id) {
      return `${Endpoint.PROTOCOLO_HABILITACAO}${Endpoint.BUSCAR}`;
    }

    return `${Endpoint.PROTOCOLO_HABILITACAO}/${this.id}${Endpoint.BUSCAR}`;
  }
}
