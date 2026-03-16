import { ServicoCadastro } from "../ServicoCadastro";
import { Endpoint } from "../../Endpoint";

export class NotificacaoEmailCadastro implements ServicoCadastro {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  getEndpoint(): string {
    return `${Endpoint.NOTIFICACAO}${Endpoint.EMAIL}${Endpoint.CADASTRAR}`;
  }

  getRequest(): Record<string, any> {
    return {
      form_params: {
        email: this.email,
      },
    };
  }
}
