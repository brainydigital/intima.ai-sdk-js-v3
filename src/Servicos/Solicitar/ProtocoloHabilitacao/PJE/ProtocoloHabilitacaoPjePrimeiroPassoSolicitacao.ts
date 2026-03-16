import { ServicoSolicitacao } from "../../ServicoSolicitacao";
import { Endpoint } from "../../../Endpoint";

export class ProtocoloHabilitacaoPjePrimeiroPassoSolicitacao
  implements ServicoSolicitacao
{
  private idAutenticador: string | number;
  private numeroDoProcesso: string;

  constructor(idAutenticador: string | number, numeroDoProcesso: string) {
    this.idAutenticador = idAutenticador;
    this.numeroDoProcesso = numeroDoProcesso;
  }

  getEndpoint(): string {
    return `${Endpoint.PJE}${Endpoint.PROTOCOLO_HABILITACAO}${Endpoint.PRIMEIRA_ETAPA}`;
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
