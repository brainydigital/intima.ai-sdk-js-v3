import { ServicoBusca } from "../ServicoBusca";
import { Endpoint } from "../../Endpoint";

export class AutenticadorBusca implements ServicoBusca {
  private id: string | number | null;

  constructor(id: string | number | null = null) {
    this.id = id;
  }

  getEndpoint(): string {
    if (!this.id) {
      return `${Endpoint.AUTENTICADOR}${Endpoint.BUSCAR}`;
    }

    return `${Endpoint.AUTENTICADOR}/${this.id}${Endpoint.BUSCAR}`;
  }
}
