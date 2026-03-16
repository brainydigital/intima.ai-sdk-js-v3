import { ServicoSolicitacao } from "../../ServicoSolicitacao";
import { Endpoint } from "../../../Endpoint";
import { Documento } from "../../../../Modelos/Documento";
import { ParteVinculada } from "../../../../Modelos/ParteVinculada";
import { Helpers } from "../../../Helpers";
import { PoloTipo } from "../../../../Utilidades/Polo";
import { TipoDeclaracaoTipo } from "../../../../Utilidades/TipoDeclaracao";
import { TipoSolicitacaoTipo } from "../../../../Utilidades/TipoSolicitacao";

export class ProtocoloHabilitacaoPjeSegundoPassoSolicitacao
  implements ServicoSolicitacao
{
  private id: string | number;
  private tipoSolicitacao: TipoSolicitacaoTipo;
  private tipoDeclaracao: TipoDeclaracaoTipo;
  private polo: PoloTipo;
  private partesVinculadas: ParteVinculada[];
  private tipoDocumentoMensagemGeral: string | number;
  private documentos: Documento[];

  constructor(
    id: string | number,
    tipoSolicitacao: TipoSolicitacaoTipo,
    tipoDeclaracao: TipoDeclaracaoTipo,
    polo: PoloTipo,
    partesVinculadas: ParteVinculada[],
    tipoDocumentoMensagemGeral: string | number,
    documentos: Documento[] = []
  ) {
    this.id = id;
    this.tipoSolicitacao = tipoSolicitacao;
    this.tipoDeclaracao = tipoDeclaracao;
    this.polo = polo;
    this.partesVinculadas = partesVinculadas;
    this.tipoDocumentoMensagemGeral = tipoDocumentoMensagemGeral;
    this.documentos = documentos;
  }

  getEndpoint(): string {
    return `${Endpoint.PJE}${Endpoint.PROTOCOLO_HABILITACAO}/${this.id}${Endpoint.SEGUNDA_ETAPA}`;
  }

  getRequest(): Record<string, any> {
    const parametrosParaMultiForm: Record<string, any> = {
      tipo_solicitacao: this.tipoSolicitacao,
      tipo_declaracao: this.tipoDeclaracao,
      polo: this.polo,
      tipo_documento_mensagem_geral: this.tipoDocumentoMensagemGeral,
    };

    Helpers.definirPartes(this.partesVinculadas, parametrosParaMultiForm);
    Helpers.definirDocumentos(this.documentos, parametrosParaMultiForm);

    return {
      headers: {
        Accept: "application/json",
        "User-Agent": "Intimai_SDK/3.0.0",
      },
      multipart: Helpers.definirMultiPart(parametrosParaMultiForm),
    };
  }
}
