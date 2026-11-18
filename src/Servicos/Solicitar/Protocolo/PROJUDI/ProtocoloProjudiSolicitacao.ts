import { ServicoSolicitacao } from "../../ServicoSolicitacao";
import { Endpoint } from "../../../Endpoint";
import { Documento } from "../../../../Modelos/Documento";
import { Helpers } from "../../../Helpers";

export class ProtocoloProjudiSolicitacao implements ServicoSolicitacao {
  private idAutenticador: string | number;
  private numeroDoProcesso: string;
  private tipoDocumentoMensagemGeral: string | number;
  private documentos: Documento[];

  constructor(
    idAutenticador: string | number,
    numeroDoProcesso: string,
    tipoDocumentoMensagemGeral: string | number,
    documentos: Documento[] = []
  ) {
    this.idAutenticador = idAutenticador;
    this.numeroDoProcesso = numeroDoProcesso;
    this.tipoDocumentoMensagemGeral = tipoDocumentoMensagemGeral;
    this.documentos = documentos;
  }

  getEndpoint(): string {
    return `${Endpoint.PROJUDI}${Endpoint.PROTOCOLO}${Endpoint.SOLICITAR}`;
  }

  getRequest(): Record<string, any> {
    const parametrosParaMultiForm: Record<string, any> = {
      numero_processo: this.numeroDoProcesso,
      autenticacao_id: this.idAutenticador,
      tipo_documento_mensagem_geral: this.tipoDocumentoMensagemGeral,
    };

    Helpers.definirDocumentos(this.documentos, parametrosParaMultiForm);

    return {
      multipart: Helpers.definirMultiPart(parametrosParaMultiForm),
    };
  }
}
