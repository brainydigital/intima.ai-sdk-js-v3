import { ServicoBusca } from "../../ServicoBusca";
import { Endpoint } from "../../../Endpoint";

export class TipoDocumentoEprocBusca implements ServicoBusca {
  private idProtocolo: string | number;
  private idEvento: string | number | null;

  constructor(
    idProtocolo: string | number,
    idEvento: string | number | null = null
  ) {
    this.idProtocolo = idProtocolo;
    this.idEvento = idEvento;
  }

  getEndpoint(): string {
    if (!this.idEvento) {
      return `${Endpoint.EPROC}${Endpoint.PROTOCOLO}/${this.idProtocolo}${Endpoint.TIPOS_DOCUMENTO}`;
    }

    return `${Endpoint.EPROC}${Endpoint.PROTOCOLO}/${this.idProtocolo}${Endpoint.TIPOS_DOCUMENTO}/${this.idEvento}`;
  }
}
