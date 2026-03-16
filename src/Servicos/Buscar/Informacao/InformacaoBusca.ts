import { ServicoBusca } from "../ServicoBusca";
import { Endpoint } from "../../Endpoint";

export class InformacaoBusca implements ServicoBusca {
  private id: string | number | null;

  constructor(id: string | number | null = null) {
    this.id = id;
  }

  getEndpoint(): string {
    if (!this.id) {
      return `${Endpoint.INFORMACAO}${Endpoint.BUSCAR}`;
    }

    return `${Endpoint.INFORMACAO}/${this.id}${Endpoint.BUSCAR}`;
  }
}
