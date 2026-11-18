import { ServicoCadastro } from "../ServicoCadastro";
import { Endpoint } from "../../Endpoint";

export class AutenticadorDoisFatoresCadastro implements ServicoCadastro {
  private ids: string | number | Array<string | number>;
  private secret: string;

  constructor(ids: string | number | Array<string | number>, secret: string) {
    this.ids = ids;
    this.secret = secret;
  }

  getEndpoint(): string {
    const ids = Array.isArray(this.ids) ? this.ids.join(",") : this.ids;

    return `${Endpoint.AUTENTICADOR}/${ids}${Endpoint.DOIS_FATORES}`;
  }

  getRequest(): Record<string, any> {
    return {
      form_params: {
        secret: this.secret,
      },
    };
  }
}
