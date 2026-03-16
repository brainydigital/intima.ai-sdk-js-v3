import { ServicoBusca } from "../ServicoBusca";
import { Endpoint } from "../../Endpoint";

export class AndamentoBusca implements ServicoBusca {
  private id: string | number | null;

  constructor(id: string | number | null = null) {
    this.id = id;
  }

  getEndpoint(): string {
    if (!this.id) {
      return `${Endpoint.ANDAMENTO}${Endpoint.BUSCAR}`;
    }

    return `${Endpoint.ANDAMENTO}/${this.id}${Endpoint.BUSCAR}`;
  }
}
