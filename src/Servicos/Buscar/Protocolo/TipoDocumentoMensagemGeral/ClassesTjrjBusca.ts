import { ServicoBusca } from "../../ServicoBusca";
import { Endpoint } from "../../../Endpoint";

export class ClassesTjrjBusca implements ServicoBusca {
  private idProtocolo: string | number;

  constructor(idProtocolo: string | number) {
    this.idProtocolo = idProtocolo;
  }

  getEndpoint(): string {
    return `${Endpoint.TJRJ}${Endpoint.PROTOCOLO}/${this.idProtocolo}${Endpoint.CLASSES}`;
  }
}
