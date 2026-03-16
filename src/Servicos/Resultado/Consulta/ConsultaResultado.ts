import { ServicoResultado } from "../ServicoResultado";
import { Endpoint } from "../../Endpoint";

export class ConsultaResultado implements ServicoResultado {
  private id: string | number;

  constructor(id: string | number) {
    this.id = id;
  }

  getEndpoint(): string {
    return `${Endpoint.CONSULTA}/${this.id}${Endpoint.RESULTADO}`;
  }
}
