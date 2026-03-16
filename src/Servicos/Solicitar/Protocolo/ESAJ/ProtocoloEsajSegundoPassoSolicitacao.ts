import { ServicoSolicitacao } from "../../ServicoSolicitacao";
import { Endpoint } from "../../../Endpoint";
import { Documento } from "../../../../Modelos/Documento";
import { ParteVinculada } from "../../../../Modelos/ParteVinculada";
import { Peticao } from "../../../../Modelos/Peticao";
import { Helpers } from "../../../Helpers";

export class ProtocoloEsajSegundoPassoSolicitacao
  implements ServicoSolicitacao
{
  private id: string | number;
  private idClasse: string | number;
  private idCategoria: string | number;
  private partesVinculadas: ParteVinculada[];
  private peticao: Peticao;
  private documentos: Documento[];

  constructor(
    id: string | number,
    idClasse: string | number,
    idCategoria: string | number,
    partesVinculadas: ParteVinculada[],
    peticao: Peticao,
    documentos: Documento[] = []
  ) {
    this.id = id;
    this.idClasse = idClasse;
    this.idCategoria = idCategoria;
    this.partesVinculadas = partesVinculadas;
    this.peticao = peticao;
    this.documentos = documentos;
  }

  getEndpoint(): string {
    return `${Endpoint.ESAJ}${Endpoint.PROTOCOLO}/${this.id}${Endpoint.SEGUNDA_ETAPA}`;
  }

  getRequest(): Record<string, any> {
    const parametrosParaMultiForm: Record<string, any> = {
      classe_id: this.idClasse,
      categoria_id: this.idCategoria,
    };

    Helpers.definirPartes(this.partesVinculadas, parametrosParaMultiForm);
    Helpers.definirPeticao(this.peticao, parametrosParaMultiForm);
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
