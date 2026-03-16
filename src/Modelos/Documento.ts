import * as fs from "fs";

export class Documento {
  private caminho: string;
  private tipo: string;
  private descricao: string;
  private ordem: number;

  /**
   * Cria um novo Documento
   * @param caminho Caminho do arquivo
   * @param ordem Ordem do documento
   * @param tipo Tipo do documento (opcional)
   * @param descricao Descrição do documento (opcional)
   */
  constructor(
    caminho: string,
    ordem: number,
    tipo: string | number = "",
    descricao: string = ""
  ) {
    this.caminho = caminho;
    this.tipo = String(tipo);
    this.descricao = descricao;
    this.ordem = ordem;
  }

  getCaminho(): string {
    return this.caminho;
  }

  getTipo(): string {
    return this.tipo;
  }

  getDescricao(): string {
    return this.descricao;
  }

  getOrdem(): number {
    return this.ordem;
  }

  /**
   * Retorna a stream do arquivo
   * @throws Error se não for possível abrir
   */
  getArquivo(): fs.ReadStream {
    try {
      return fs.createReadStream(this.caminho);
    } catch (error) {
      throw new Error("O caminho do arquivo informado é inválido!");
    }
  }

  /**
   * Retorna os dados do documento no formato de array para envio via multipart/form-data
   */
  emArray(): Record<string, any> {
    const index = this.ordem - 1;

    return {
      [`documentos[${index}][arquivo]`]: this.getArquivo(),
      [`documentos[${index}][tipo_documento]`]: this.tipo,
      [`documentos[${index}][descricao_documento]`]: this.descricao,
      [`documentos[${index}][ordem]`]: this.ordem,
    };
  }
}
