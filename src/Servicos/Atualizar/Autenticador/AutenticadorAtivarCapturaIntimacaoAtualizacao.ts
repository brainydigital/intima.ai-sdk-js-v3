import { ServicoAtualizacao } from "../ServicoAtualizacao";
import { Endpoint } from "../../Endpoint";

export class AutenticadorAtivarCapturaIntimacaoAtualizacao
  implements ServicoAtualizacao
{
  private id: string | number;
  private abas: string | string[];
  private diasDeCaptura: string | string[];
  private horariosDeCaptura: string | string[];
  private capturarProcuradorias: boolean | number;

  constructor(
    id: string | number,
    abas: string | string[],
    diasDeCaptura: string | string[],
    horariosDeCaptura: string | string[],
    capturarProcuradorias: boolean | number = false
  ) {
    this.id = id;
    this.abas = abas;
    this.diasDeCaptura = diasDeCaptura;
    this.horariosDeCaptura = horariosDeCaptura;
    this.capturarProcuradorias = capturarProcuradorias;
  }

  getEndpoint(): string {
    return `${Endpoint.AUTENTICADOR}/${this.id}/ativar-captura-intimacao`;
  }

  getRequest(): Record<string, any> {
    return {
      abas: this.abas,
      dias_de_captura: this.diasDeCaptura,
      horarios_de_captura: this.horariosDeCaptura,
      capturar_procuradorias: this.capturarProcuradorias,
    };
  }
}
