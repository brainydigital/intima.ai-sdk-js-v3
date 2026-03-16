import { ServicoSolicitacao } from "../../ServicoSolicitacao";
import { Endpoint } from "../../../Endpoint";
import { Documento } from "../../../../Modelos/Documento";
import { ParteVinculada } from "../../../../Modelos/ParteVinculada";
import { Helpers } from "../../../Helpers";

export class ProtocoloEprocSegundoPassoSolicitacao
  implements ServicoSolicitacao
{
  private id: string | number;
  private tipoDocumentoMensagemGeral: string | number;
  private partesVinculadas: ParteVinculada[];
  private documentos: Documento[];

  constructor(
    id: string | number,
    tipoDocumentoMensagemGeral: string | number,
    partesVinculadas: ParteVinculada[],
    documentos: Documento[] = []
  ) {
    this.id = id;
    this.tipoDocumentoMensagemGeral = tipoDocumentoMensagemGeral;
    this.partesVinculadas = partesVinculadas;
    this.documentos = documentos;
  }

  getEndpoint(): string {
    return `${Endpoint.EPROC}${Endpoint.PROTOCOLO}/${this.id}${Endpoint.SEGUNDA_ETAPA}`;
  }

  getRequest(): Record<string, any> {
    const parametrosParaMultiForm: Record<string, any> = {
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
