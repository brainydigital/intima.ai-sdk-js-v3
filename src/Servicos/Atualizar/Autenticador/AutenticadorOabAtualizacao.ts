import { ServicoAtualizacao } from "../ServicoAtualizacao";
import { Endpoint } from "../../Endpoint";
import { Oab } from "../../../DadosTipo/Oab";

export class AutenticadorOabAtualizacao implements ServicoAtualizacao {
  private id: string | number;
  private oab: Oab;

  constructor(id: string | number, oab: Oab) {
    this.id = id;
    this.oab = oab;
  }

  getEndpoint(): string {
    return `${Endpoint.AUTENTICADOR}/${this.id}${Endpoint.ATUALIZAR}-oab`;
  }

  getRequest(): Record<string, any> {
    return {
      oab_numero: this.oab.numero,
      oab_letra: this.oab.letra || "",
      oab_uf: this.oab.uf,
    };
  }
}
