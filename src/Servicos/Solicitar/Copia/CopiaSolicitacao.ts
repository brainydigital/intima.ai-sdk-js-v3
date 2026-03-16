import { ServicoSolicitacao } from "../ServicoSolicitacao";
import { Endpoint } from "../../Endpoint";

export class CopiaSolicitacao implements ServicoSolicitacao {
  private idAutenticador: string | number;
  private numeroDoProcesso: string;

  constructor(idAutenticador: string | number, numeroDoProcesso: string) {
    this.idAutenticador = idAutenticador;
    this.numeroDoProcesso = numeroDoProcesso;
  }

  getEndpoint(): string {
    return `${Endpoint.COPIA}${Endpoint.SOLICITAR}`;
  }

  getRequest(): Record<string, any> {
    return {
      form_params: {
        autenticacao_id: this.idAutenticador,
        numero_processo: this.numeroDoProcesso,
      },
    };
  }
}
