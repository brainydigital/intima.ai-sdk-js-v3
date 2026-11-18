import { ServicoSolicitacao } from "../../ServicoSolicitacao";
import { Endpoint } from "../../../Endpoint";
import { Documento } from "../../../../Modelos/Documento";
import { Peticao } from "../../../../Modelos/Peticao";
import { Helpers } from "../../../Helpers";

export class ProtocoloPjeSolicitacao implements ServicoSolicitacao {
  private idAutenticador: string | number;
  private numeroDoProcesso: string;
  private tipoDocumentoMensagemGeral: string | number;
  private peticao: Peticao | null;
  private documentos: Documento[];

  constructor(
    idAutenticador: string | number,
    numeroDoProcesso: string,
    tipoDocumentoMensagemGeral: string | number,
    peticao: Peticao | null = null,
    documentos: Documento[] = []
  ) {
    this.idAutenticador = idAutenticador;
    this.numeroDoProcesso = numeroDoProcesso;
    this.tipoDocumentoMensagemGeral = tipoDocumentoMensagemGeral;
    this.peticao = peticao;
    this.documentos = documentos;
  }

  getEndpoint(): string {
    return `${Endpoint.PJE}${Endpoint.PROTOCOLO}${Endpoint.SOLICITAR}`;
  }

  getRequest(): Record<string, any> {
    const parametrosParaMultiForm: Record<string, any> = {
      numero_processo: this.numeroDoProcesso,
      autenticacao_id: this.idAutenticador,
      tipo_documento_mensagem_geral: this.tipoDocumentoMensagemGeral,
    };

    Helpers.definirPeticao(this.peticao, parametrosParaMultiForm);
    Helpers.definirDocumentos(this.documentos, parametrosParaMultiForm);

    return {
      multipart: Helpers.definirMultiPart(parametrosParaMultiForm),
    };
  }
}
