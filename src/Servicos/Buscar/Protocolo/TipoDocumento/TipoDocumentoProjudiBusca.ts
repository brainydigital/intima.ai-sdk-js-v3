import { ServicoBusca } from "../../ServicoBusca";
import { Endpoint } from "../../../Endpoint";

export class TipoDocumentoProjudiBusca implements ServicoBusca {
  private idAutenticador: string | number;

  constructor(idAutenticador: string | number) {
    this.idAutenticador = idAutenticador;
  }

  getEndpoint(): string {
    return `${Endpoint.PROJUDI}${Endpoint.PROTOCOLO}/${this.idAutenticador}${Endpoint.TIPOS_DOCUMENTO}`;
  }
}
