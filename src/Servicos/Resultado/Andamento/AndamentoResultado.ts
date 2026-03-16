import { ServicoResultado } from "../ServicoResultado";
import { Endpoint } from "../../Endpoint";

export class AndamentoResultado implements ServicoResultado {
  private id: string | number;
  private idProcesso: string | number | null;

  constructor(id: string | number, idProcesso: string | number | null = null) {
    this.id = id;
    this.idProcesso = idProcesso;
  }

  getEndpoint(): string {
    if (!this.idProcesso) {
      return `${Endpoint.ANDAMENTO}/${this.id}${Endpoint.RESULTADO}`;
    }

    return `${Endpoint.ANDAMENTO}/${this.id}${Endpoint.RESULTADO}/${this.idProcesso}`;
  }
}
