import { ServicoCadastro } from "../ServicoCadastro";
import { Endpoint } from "../../Endpoint";
import { Oab } from "../../../DadosTipo/Oab";

export class AutenticadorCertificadoCadastro implements ServicoCadastro {
  private idTribunal: string | number;
  private oab: Oab;
  private idCertificado: string | number;

  constructor(
    idTribunal: string | number,
    oab: Oab,
    idCertificado: string | number
  ) {
    this.idTribunal = idTribunal;
    this.oab = oab;
    this.idCertificado = idCertificado;
  }

  getEndpoint(): string {
    return `${Endpoint.AUTENTICADOR}${Endpoint.CERTIFICADO}${Endpoint.CADASTRAR}`;
  }

  getRequest(): Record<string, any> {
    return {
      form_params: {
        tribunal_id: this.idTribunal,
        certificado_id: this.idCertificado,
        oab_numero: this.oab.numero,
        oab_letra: this.oab.letra || "",
        oab_uf: this.oab.uf,
      },
    };
  }
}
