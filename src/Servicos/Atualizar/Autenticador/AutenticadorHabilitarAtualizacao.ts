import { ServicoAtualizacao } from "../ServicoAtualizacao";
import { Endpoint } from "../../Endpoint";

export class AutenticadorHabilitarAtualizacao implements ServicoAtualizacao {
  private id: string | number;

  constructor(id: string | number) {
    this.id = id;
  }

  getEndpoint(): string {
    return `${Endpoint.AUTENTICADOR}/${this.id}${Endpoint.HABILITAR}`;
  }

  getRequest(): Record<string, any> {
    return {};
  }
}
