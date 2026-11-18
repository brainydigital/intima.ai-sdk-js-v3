import { ServicoAtualizacao } from "../ServicoAtualizacao";
import { Endpoint } from "../../Endpoint";

export class EscutaAtualizacao implements ServicoAtualizacao {
  private id: string | number;
  private diasDeCaptura: string | Array<string | number>;
  private horariosDeCaptura: string | string[];

  constructor(
    id: string | number,
    diasDeCaptura: string | Array<string | number>,
    horariosDeCaptura: string | string[]
  ) {
    this.id = id;
    this.diasDeCaptura = diasDeCaptura;
    this.horariosDeCaptura = horariosDeCaptura;
  }

  getEndpoint(): string {
    return `${Endpoint.ESCUTA}/${this.id}${Endpoint.ATUALIZAR}`;
  }

  getRequest(): Record<string, any> {
    return {
      form_params: {
        dias_de_captura: this.diasDeCaptura,
        horarios_de_captura: this.horariosDeCaptura,
      },
    };
  }
}
