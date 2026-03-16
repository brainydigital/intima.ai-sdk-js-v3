import { ServicoBusca } from "../../ServicoBusca";
import { Endpoint } from "../../../Endpoint";

export class ClassesEsajBusca implements ServicoBusca {
  private idProtocolo: string | number;

  constructor(idProtocolo: string | number) {
    this.idProtocolo = idProtocolo;
  }

  getEndpoint(): string {
    return `${Endpoint.ESAJ}${Endpoint.PROTOCOLO}/${this.idProtocolo}${Endpoint.CLASSES}`;
  }
}
