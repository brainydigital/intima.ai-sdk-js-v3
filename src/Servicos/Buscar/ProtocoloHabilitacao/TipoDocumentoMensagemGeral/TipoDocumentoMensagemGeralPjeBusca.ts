import { ServicoBusca } from "../../ServicoBusca";
import { Endpoint } from "../../../Endpoint";

export class TipoDocumentoMensagemGeralPjeBusca implements ServicoBusca {
  private idProtocoloHabilitacao: string | number;

  constructor(idProtocoloHabilitacao: string | number) {
    this.idProtocoloHabilitacao = idProtocoloHabilitacao;
  }

  getEndpoint(): string {
    return `${Endpoint.PJE}${Endpoint.PROTOCOLO_HABILITACAO}/${this.idProtocoloHabilitacao}${Endpoint.TIPOS_DOCUMENTO_MENSAGEM_GERAL}`;
  }
}
