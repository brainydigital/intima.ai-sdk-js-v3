import { ServicoCadastro } from "../ServicoCadastro";
import { Endpoint } from "../../Endpoint";

export class AndamentoCadastro implements ServicoCadastro {
  private numeroDoProcesso: string;
  private idAutenticador: string | number;

  constructor(idAutenticador: string | number, numeroDoProcesso: string) {
    this.idAutenticador = idAutenticador;
    this.numeroDoProcesso = numeroDoProcesso;
  }

  getEndpoint(): string {
    return `${Endpoint.ANDAMENTO}${Endpoint.CADASTRAR}`;
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
