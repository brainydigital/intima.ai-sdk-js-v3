import { ServicoBusca } from "../../ServicoBusca";
import { Endpoint } from "../../../Endpoint";

export class TipoDocumentoPjeBusca implements ServicoBusca {
  private idAutenticador: string | number;

  constructor(idAutenticador: string | number) {
    this.idAutenticador = idAutenticador;
  }

  getEndpoint(): string {
    return `${Endpoint.PJE}${Endpoint.PROTOCOLO}/${this.idAutenticador}${Endpoint.TIPOS_DOCUMENTO}`;
  }
}
