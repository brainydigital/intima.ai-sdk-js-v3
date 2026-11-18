import { ServicoAtualizacao } from "../ServicoAtualizacao";
import { Endpoint } from "../../Endpoint";

export class AutenticadorPerfilAtualizacao implements ServicoAtualizacao {
  private id: string | number;
  private usuarioSigla: string | null;
  private usuarioDescricao: string | null;

  constructor(id: string | number, usuarioSigla: string | null = null, usuarioDescricao: string | null = null) {
    this.id = id;
    this.usuarioSigla = usuarioSigla;
    this.usuarioDescricao = usuarioDescricao;
  }

  getEndpoint(): string {
    return `${Endpoint.AUTENTICADOR}/${this.id}${Endpoint.ATUALIZAR_PERFIL}`;
  }

  getRequest(): Record<string, any> {
    return {
      form_params: {
        usuario_sigla: this.usuarioSigla,
        usuario_descricao: this.usuarioDescricao,
      },
    };
  }
}
