import { ServicoSolicitacao } from "../../ServicoSolicitacao";
import { Endpoint } from "../../../Endpoint";
import { Documento } from "../../../../Modelos/Documento";
import { ParteVinculada } from "../../../../Modelos/ParteVinculada";
import { Peticao } from "../../../../Modelos/Peticao";
import { Helpers } from "../../../Helpers";

export class ProtocoloTjrjSegundoPassoSolicitacao
  implements ServicoSolicitacao
{
  private id: string | number;
  private idClasse: string | number;
  private partesVinculadas: ParteVinculada[];
  private peticao: Peticao;
  private documentos: Documento[];
  private idCategoria: string | number | null;

  constructor(
    id: string | number,
    idClasse: string | number,
    partesVinculadas: ParteVinculada[],
    peticao: Peticao,
    documentos: Documento[] = [],
    idCategoria: string | number | null = null
  ) {
    this.id = id;
    this.idClasse = idClasse;
    this.partesVinculadas = partesVinculadas;
    this.peticao = peticao;
    this.documentos = documentos;
    this.idCategoria = idCategoria;
  }

  getEndpoint(): string {
    return `${Endpoint.TJRJ}${Endpoint.PROTOCOLO}/${this.id}${Endpoint.SEGUNDA_ETAPA}`;
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
      multipart: Helpers.definirMultiPart(parametrosParaMultiForm),
    };
  }
}
