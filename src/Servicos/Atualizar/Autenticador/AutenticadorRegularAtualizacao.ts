import { ServicoAtualizacao } from "../ServicoAtualizacao";
import { Endpoint } from "../../Endpoint";

export class AutenticadorRegularAtualizacao implements ServicoAtualizacao {
  private id: string | number;
  private usuario: string | null;
  private senha: string | null;

  constructor(
    id: string | number,
    usuario: string | null = null,
    senha: string | null = null
  ) {
    this.id = id;
    this.usuario = usuario;
    this.senha = senha;
  }

  getEndpoint(): string {
    return `${Endpoint.AUTENTICADOR}${Endpoint.REGULAR}/${this.id}${Endpoint.ATUALIZAR}`;
  }

  getRequest(): Record<string, any> {
    return {
      usuario: this.usuario,
      senha: this.senha,
    };
  }
}
