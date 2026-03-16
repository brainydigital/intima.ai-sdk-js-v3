import { ServicoBusca } from "../../ServicoBusca";
import { Endpoint } from "../../../Endpoint";

export class TipoDocumentoEsajBusca implements ServicoBusca {
  private idProtocolo: string | number;
  private idClasse: string | number | null;

  constructor(
    idProtocolo: string | number,
    idClasse: string | number | null = null
  ) {
    this.idProtocolo = idProtocolo;
    this.idClasse = idClasse;
  }

  getEndpoint(): string {
    if (!this.idClasse) {
      return `${Endpoint.ESAJ}${Endpoint.PROTOCOLO}/${this.idProtocolo}${Endpoint.TIPOS_DOCUMENTO}`;
    }

    return `${Endpoint.ESAJ}${Endpoint.PROTOCOLO}/${this.idProtocolo}${Endpoint.TIPOS_DOCUMENTO}/${this.idClasse}`;
  }
}
