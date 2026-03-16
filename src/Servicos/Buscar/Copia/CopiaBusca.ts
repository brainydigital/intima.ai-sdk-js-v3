import { ServicoBusca } from "../ServicoBusca";
import { Endpoint } from "../../Endpoint";

export class CopiaBusca implements ServicoBusca {
  private id: string | number | null;

  constructor(id: string | number | null = null) {
    this.id = id;
  }

  getEndpoint(): string {
    if (!this.id) {
      return `${Endpoint.COPIA}${Endpoint.BUSCAR}`;
    }

    return `${Endpoint.COPIA}/${this.id}${Endpoint.BUSCAR}`;
  }
}
