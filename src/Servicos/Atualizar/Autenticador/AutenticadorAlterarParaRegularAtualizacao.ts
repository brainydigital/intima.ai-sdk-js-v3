import { Endpoint } from "../../Endpoint";
import { ServicoAtualizacao } from "../ServicoAtualizacao";

export class AutenticadorAlterarParaRegularAtualizacao
  implements ServicoAtualizacao
{
  private readonly id: string | number;
  private readonly usuario: string;
  private readonly senha: string;

  constructor(id: string | number, usuario: string, senha: string) {
    this.id = id;
    this.usuario = usuario;
    this.senha = senha;
  }

  public getEndpoint(): string {
    return `${Endpoint.AUTENTICADOR}${Endpoint.REGULAR}/${this.id}${Endpoint.ALTERAR_PARA_REGULAR}`;
  }

  public getRequest() {
    return {
      form_params: {
        usuario: this.usuario,
        senha: this.senha,
      },
    };
  }
}
