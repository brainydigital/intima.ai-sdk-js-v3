import { ServicoBusca } from "../ServicoBusca";
import { Endpoint } from "../../Endpoint";

export class ConsultaPreAnaliseBusca implements ServicoBusca {
  private id: string | number | null;

  constructor(id: string | number | null = null) {
    this.id = id;
  }

  getEndpoint(): string {
    if (!this.id) {
      return `${Endpoint.CONSULTA_PRE_ANALISE}${Endpoint.BUSCAR}`;
    }

    return `${Endpoint.CONSULTA_PRE_ANALISE}/${this.id}${Endpoint.BUSCAR}`;
  }
}
