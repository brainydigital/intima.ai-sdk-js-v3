import * as fs from "fs";
import { lerArquivo } from "./lerArquivo";

export class Certificado {
  private caminhoDoCertificado: string;
  private senha: string;

  constructor(caminhoDoCertificado: string, senha: string) {
    this.caminhoDoCertificado = caminhoDoCertificado;
    this.senha = senha;
  }

  getCaminhoDoCertificado(): string {
    return this.caminhoDoCertificado;
  }

  getSenha(): string {
    return this.senha;
  }

  /**
   * Retorna uma stream de leitura do certificado
   * @throws Error se o arquivo não puder ser lido
   */
  getArquivo(): fs.ReadStream {
    try {
      return fs.createReadStream(this.caminhoDoCertificado);
    } catch (error) {
      throw new Error("O caminho do arquivo informado é inválido!");
    }
  }

  /**
   * Retorna os dados do certificado no formato de array para envio (multipart/form-data)
   */
  emArray(): Array<{ name: string; contents: any; filename?: string }> {
    return [
      {
        name: "arquivo",
        contents: lerArquivo(this.caminhoDoCertificado),
      },
      {
        name: "senha",
        contents: this.senha,
      },
      {
        name: "senha_confirmation",
        contents: this.senha,
      },
    ];
  }
}
