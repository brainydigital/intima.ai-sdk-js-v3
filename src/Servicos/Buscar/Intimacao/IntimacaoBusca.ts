import { ServicoBusca } from "../ServicoBusca";
import { Endpoint } from "../../Endpoint";

export class IntimacaoBusca implements ServicoBusca {
  private id: string | number | null;

  constructor(id: string | number | null = null) {
    this.id = id;
  }

  getEndpoint(): string {
    if (!this.id) {
      return `${Endpoint.INTIMACAO}${Endpoint.BUSCAR}`;
    }

    return `${Endpoint.INTIMACAO}/${this.id}${Endpoint.BUSCAR}`;
  }
}
