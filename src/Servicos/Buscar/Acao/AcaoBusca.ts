import { ServicoBusca } from "../ServicoBusca";
import { Endpoint } from "../../Endpoint";

export class AcaoBusca implements ServicoBusca {
  private id: string | number | null;

  constructor(id: string | number | null = null) {
    this.id = id;
  }

  getEndpoint(): string {
    if (!this.id) {
      return `${Endpoint.ACAO}${Endpoint.BUSCAR}`;
    }

    return `${Endpoint.ACAO}/${this.id}${Endpoint.BUSCAR}`;
  }
}
