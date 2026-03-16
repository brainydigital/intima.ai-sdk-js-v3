import { ServicoResultado } from "../ServicoResultado";
import { Endpoint } from "../../Endpoint";

export class AcaoResultado implements ServicoResultado {
  private id: string | number;

  constructor(id: string | number) {
    this.id = id;
  }

  getEndpoint(): string {
    return `${Endpoint.ACAO}/${this.id}${Endpoint.RESULTADO}`;
  }
}
