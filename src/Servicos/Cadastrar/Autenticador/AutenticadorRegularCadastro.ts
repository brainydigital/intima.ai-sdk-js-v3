import { ServicoCadastro } from "../ServicoCadastro";
import { Endpoint } from "../../Endpoint";
import { Oab } from "../../../DadosTipo/Oab";

export class AutenticadorRegularCadastro implements ServicoCadastro {
  private idTribunal: string | number;
  private oab: Oab;
  private usuario: string;
  private senha: string;

  constructor(
    idTribunal: string | number,
    oab: Oab,
    usuario: string,
    senha: string
  ) {
    this.idTribunal = idTribunal;
    this.oab = oab;
    this.usuario = usuario;
    this.senha = senha;
  }

  getEndpoint(): string {
    return `${Endpoint.AUTENTICADOR}${Endpoint.REGULAR}${Endpoint.CADASTRAR}`;
  }

  getRequest(): Record<string, any> {
    return {
      form_params: {
        tribunal_id: this.idTribunal,
        usuario: this.usuario,
        senha: this.senha,
        oab_numero: this.oab.numero,
        oab_letra: this.oab.letra || "",
        oab_uf: this.oab.uf,
      },
    };
  }
}
