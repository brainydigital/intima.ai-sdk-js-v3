import { ServicoAtualizacao } from "../ServicoAtualizacao";
import { Endpoint } from "../../Endpoint";

export class IntimacaoMarcarComoRevisadaAtualizacao
  implements ServicoAtualizacao
{
  private id: string | number;

  constructor(id: string | number) {
    this.id = id;
  }

  getEndpoint(): string {
    return `${Endpoint.INTIMACAO}/${this.id}${Endpoint.MARCAR_COMO_REVISADA}`;
  }

  getRequest(): Record<string, any> {
    return {};
  }
}
