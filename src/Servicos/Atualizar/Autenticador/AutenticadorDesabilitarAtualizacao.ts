import { ServicoAtualizacao } from "../ServicoAtualizacao";
import { Endpoint } from "../../Endpoint";

export class AutenticadorDesabilitarAtualizacao implements ServicoAtualizacao {
  private id: string | number;

  constructor(id: string | number) {
    this.id = id;
  }

  getEndpoint(): string {
    return `${Endpoint.AUTENTICADOR}/${this.id}${Endpoint.DESABILITAR}`;
  }

  getRequest(): Record<string, any> {
    return {};
  }
}
