import { ServicoBusca } from "../../ServicoBusca";
import { Endpoint } from "../../../Endpoint";

export class EventosEprocBusca implements ServicoBusca {
  private idProtocolo: string | number;

  constructor(idProtocolo: string | number) {
    this.idProtocolo = idProtocolo;
  }

  getEndpoint(): string {
    return `${Endpoint.EPROC}${Endpoint.PROTOCOLO}/${this.idProtocolo}${Endpoint.EVENTOS}`;
  }
}
