import { ServicoCadastro } from "../ServicoCadastro";
import { Endpoint } from "../../Endpoint";

export class NotificacaoWebhookCadastro implements ServicoCadastro {
  private tipoAcao: string | number;
  private verboHttp: string;
  private url: string;

  constructor(tipoAcao: string | number, verboHttp: string, url: string) {
    this.tipoAcao = tipoAcao;
    this.verboHttp = verboHttp;
    this.url = url;
  }

  getEndpoint(): string {
    return `${Endpoint.NOTIFICACAO}${Endpoint.WEBHOOK}${Endpoint.CADASTRAR}`;
  }

  getRequest(): Record<string, any> {
    return {
      form_params: {
        tipo_acao: this.tipoAcao,
        verbo_http: this.verboHttp,
        url: this.url,
      },
    };
  }
}
