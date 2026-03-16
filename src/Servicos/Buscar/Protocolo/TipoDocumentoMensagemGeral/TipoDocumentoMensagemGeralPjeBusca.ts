import { ServicoBusca } from "../../ServicoBusca";
import { Endpoint } from "../../../Endpoint";

export class TipoDocumentoMensagemGeralPjeBusca implements ServicoBusca {
  private idAutenticador: string | number;

  constructor(idAutenticador: string | number) {
    this.idAutenticador = idAutenticador;
  }

  getEndpoint(): string {
    return `${Endpoint.PJE}${Endpoint.PROTOCOLO}/${this.idAutenticador}${Endpoint.TIPOS_DOCUMENTO_MENSAGEM_GERAL}`;
  }
}
