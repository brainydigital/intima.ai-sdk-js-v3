import { ServicoSolicitacao } from "../ServicoSolicitacao";
import { Endpoint } from "../../Endpoint";
import { Oab } from "../../../DadosTipo/Oab";

export class ConsultaSolicitacao implements ServicoSolicitacao {
  private idAutenticador: string | number;
  private numeroDoProcesso: string;
  private nomeParte: string;
  private nomeRepresentante: string;
  private oab: Oab[];
  private numeroDocumentoParte: string;
  private token: string;

  constructor(
    idAutenticador: string | number,
    numeroDoProcesso: string = "",
    nomeParte: string = "",
    nomeRepresentante: string = "",
    oab: Oab[] = [],
    numeroDocumentoParte: string = "",
    token: string = ""
  ) {
    this.idAutenticador = idAutenticador;
    this.numeroDoProcesso = numeroDoProcesso;
    this.nomeParte = nomeParte;
    this.nomeRepresentante = nomeRepresentante;
    this.oab = oab;
    this.numeroDocumentoParte = numeroDocumentoParte;
    this.token = token;
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
        oab: this.oab,
        numero_documento_parte: this.numeroDocumentoParte,
        token: this.token,
      },
    };
  }
}
