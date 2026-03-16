import { ServicoCadastro } from "../ServicoCadastro";
import { Endpoint } from "../../Endpoint";
import { DiaDaSemana } from "../../../Utilidades/Dia";
import { HorarioDoDia } from "../../../Utilidades/Horario";

export class EscutaCadastro implements ServicoCadastro {
  private idAutenticador: string | number;
  private numeroDoProcesso: string;
  private diasDeCaptura: DiaDaSemana[] | string;
  private horariosDeCaptura: HorarioDoDia[] | string;

  constructor(
    idAutenticador: string | number,
    numeroDoProcesso: string,
    diasDeCaptura: DiaDaSemana[] | string,
    horariosDeCaptura: HorarioDoDia[] | string
  ) {
    this.idAutenticador = idAutenticador;
    this.numeroDoProcesso = numeroDoProcesso;
    this.diasDeCaptura = diasDeCaptura;
    this.horariosDeCaptura = horariosDeCaptura;
  }

  getEndpoint(): string {
    return `${Endpoint.ESCUTA}${Endpoint.CADASTRAR}`;
  }

  getRequest(): Record<string, any> {
    return {
      form_params: {
        autenticacao_id: this.idAutenticador,
        numero_processo: this.numeroDoProcesso,
        dias_de_captura: this.diasDeCaptura,
        horarios_de_captura: this.horariosDeCaptura,
      },
    };
  }
}
