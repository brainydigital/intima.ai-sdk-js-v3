import { ServicoBusca } from "../ServicoBusca";
import { Endpoint } from "../../Endpoint";

export class CapturaAgendadaBusca implements ServicoBusca {
  private id: string | number | null;

  constructor(id: string | number | null = null) {
    this.id = id;
  }

  getEndpoint(): string {
    if (!this.id) {
      return `${Endpoint.CAPTURA_AGENDADA}${Endpoint.BUSCAR}`;
    }

    return `${Endpoint.CAPTURA_AGENDADA}/${this.id}${Endpoint.BUSCAR}`;
  }
}
