import { ServicoCadastro } from "../ServicoCadastro";
import { Endpoint } from "../../Endpoint";
import { Oab } from "../../../DadosTipo/Oab";

export class AutenticadorRegularCadastro implements ServicoCadastro {
  private idTribunal: string | number | Array<string | number>;
  private oab: Oab;
  private usuario: string;
  private senha: string;
  private idCertificado: string | number | null;
  private usuarioSigla: string | null;
  private usuarioDescricao: string | null;
  private secret: string | null;

  constructor(
    idTribunal: string | number | Array<string | number>,
    oab: Oab,
    usuario: string,
    senha: string,
    idCertificado: string | number | null = null,
    usuarioSigla: string | null = null,
    usuarioDescricao: string | null = null,
    secret: string | null = null
  ) {
    this.idTribunal = idTribunal;
    this.oab = oab;
    this.usuario = usuario;
    this.senha = senha;
    this.idCertificado = idCertificado;
    this.usuarioSigla = usuarioSigla;
    this.usuarioDescricao = usuarioDescricao;
    this.secret = secret;
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
        certificado_id: this.idCertificado,
        oab_numero: this.oab.numero,
        oab_letra: this.oab.letra || "",
        oab_uf: this.oab.uf,
        usuario_sigla: this.usuarioSigla,
        usuario_descricao: this.usuarioDescricao,
        secret: this.secret,
      },
    };
  }
}
