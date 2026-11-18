import { ServicoSolicitacao } from "../ServicoSolicitacao";
import { Endpoint } from "../../Endpoint";
import { Oab } from "../../../DadosTipo/Oab";

export class ConsultaSolicitacao implements ServicoSolicitacao {
  private idAutenticador: string | number;
  private numeroDoProcesso: string;
  private nomeParte: string;
  private nomeRepresentante: string;
  private oab: Oab | Oab[] | null;
  private numeroDocumentoParte: string;

  constructor(
    idAutenticador: string | number,
    numeroDoProcesso: string = "",
    nomeParte: string = "",
    nomeRepresentante: string = "",
    oab: Oab | Oab[] | null = null,
    numeroDocumentoParte: string = ""
  ) {
    this.idAutenticador = idAutenticador;
    this.numeroDoProcesso = numeroDoProcesso;
    this.nomeParte = nomeParte;
    this.nomeRepresentante = nomeRepresentante;
    this.oab = oab;
    this.numeroDocumentoParte = numeroDocumentoParte;
  }

  getEndpoint(): string {
    return `${Endpoint.CONSULTA}${Endpoint.SOLICITAR}`;
  }

  getRequest(): Record<string, any> {
    return {
      form_params: {
        autenticacao_id: this.idAutenticador,
        numero_processo: this.numeroDoProcesso,
        nome_parte: this.nomeParte,
        nome_representante: this.nomeRepresentante,
        oab: Array.isArray(this.oab) ? this.oab[0] : this.oab,
        numero_documento_parte: this.numeroDocumentoParte,
      },
    };
  }
}
