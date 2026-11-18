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
  private partesVinculadas: Array<ParteVinculada | string>;
  private tipoDocumentoMensagemGeral: string | number;
  private descricao: string | null;
  private mensagemGeral: string | null;
  private documentos: Documento[];

  constructor(
    id: string | number,
    tipoSolicitacao: TipoSolicitacaoTipo,
    tipoDeclaracao: TipoDeclaracaoTipo,
    polo: PoloTipo,
    partesVinculadas: Array<ParteVinculada | string>,
    tipoDocumentoMensagemGeral: string | number,
    descricao: string | null = null,
    mensagemGeral: string | null = null,
    documentos: Documento[] = []
  ) {
    this.id = id;
    this.tipoSolicitacao = tipoSolicitacao;
    this.tipoDeclaracao = tipoDeclaracao;
    this.polo = polo;
    this.partesVinculadas = partesVinculadas;
    this.tipoDocumentoMensagemGeral = tipoDocumentoMensagemGeral;
    this.descricao = descricao;
    this.mensagemGeral = mensagemGeral;
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
      descricao: this.descricao,
      mensagem_geral: this.mensagemGeral,
    };

    this.partesVinculadas.forEach((parte, indice) => {
      parametrosParaMultiForm[`partes_vinculadas[${indice}]`] =
        parte instanceof ParteVinculada ? parte.getNome() : parte;
    });

    Helpers.definirDocumentos(this.documentos, parametrosParaMultiForm);

    return {
      multipart: Helpers.definirMultiPart(parametrosParaMultiForm),
    };
  }
}
