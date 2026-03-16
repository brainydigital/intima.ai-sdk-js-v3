import { ServicoBusca } from "../ServicoBusca";
import { Endpoint } from "../../Endpoint";

export class ConsultaBusca implements ServicoBusca {
  private id: string | number | null;

  constructor(id: string | number | null = null) {
    this.id = id;
  }

  getEndpoint(): string {
    if (!this.id) {
      return `${Endpoint.CONSULTA}${Endpoint.BUSCAR}`;
    }

    return `${Endpoint.CONSULTA}/${this.id}${Endpoint.BUSCAR}`;
  }
}
