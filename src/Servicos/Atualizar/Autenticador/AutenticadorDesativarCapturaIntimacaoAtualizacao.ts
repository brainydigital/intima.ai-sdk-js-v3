import { ServicoAtualizacao } from "../ServicoAtualizacao";
import { Endpoint } from "../../Endpoint";

export class AutenticadorDesativarCapturaIntimacaoAtualizacao
  implements ServicoAtualizacao
{
  private id: string | number;

  constructor(id: string | number) {
    this.id = id;
  }

  getEndpoint(): string {
    return `${Endpoint.AUTENTICADOR}/${this.id}/desativar-captura-intimacao`;
  }

  getRequest(): Record<string, any> {
    return {};
  }
}
