import { ServicoBusca } from "../ServicoBusca";
import { Endpoint } from "../../Endpoint";

export class EscutaBusca implements ServicoBusca {
  private id: string | number | null;

  constructor(id: string | number | null = null) {
    this.id = id;
  }

  getEndpoint(): string {
    if (!this.id) {
      return `${Endpoint.ESCUTA}${Endpoint.BUSCAR}`;
    }

    return `${Endpoint.ESCUTA}/${this.id}${Endpoint.BUSCAR}`;
  }
}
