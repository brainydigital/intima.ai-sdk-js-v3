import * as fs from "fs";
import { lerArquivo } from "./lerArquivo";

export class Peticao {
  private caminho: string;
  private tipo: number | string;
  private descricao: string;

  constructor(
    caminho: string,
    tipo: number | string = "",
    descricao: string = ""
  ) {
    this.caminho = caminho;
    this.tipo = tipo;
    this.descricao = descricao;
  }

  getArquivo(): fs.ReadStream {
    try {
      return fs.createReadStream(this.caminho);
    } catch (error) {
      throw new Error("O caminho do arquivo informado é inválido!");
    }
  }

  emArray(): Record<string, any> {
    return {
      "peticao[arquivo]": lerArquivo(this.caminho),
      "peticao[tipo_documento]": this.tipo,
      "peticao[descricao_documento]": this.descricao,
    };
  }

  getTipo(): number | string {
    return this.tipo;
  }

  getDescricao(): string {
    return this.descricao;
  }

  getCaminho(): string {
    return this.caminho;
  }
}
