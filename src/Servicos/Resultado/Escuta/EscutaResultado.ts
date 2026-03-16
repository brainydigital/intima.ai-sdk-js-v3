import { ServicoResultado } from "../ServicoResultado";
import { Endpoint } from "../../Endpoint";

export class EscutaResultado implements ServicoResultado {
  private id: string | number;

  constructor(id: string | number) {
    this.id = id;
  }

  getEndpoint(): string {
    return `${Endpoint.ESCUTA}/${this.id}${Endpoint.RESULTADO}`;
  }
}
