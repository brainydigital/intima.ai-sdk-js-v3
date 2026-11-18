import * as fs from "fs";
import * as path from "path";

export function lerArquivo(caminho: string): File {
  let conteudo: Buffer;

  try {
    conteudo = fs.readFileSync(caminho);
  } catch {
    throw new Error("O caminho do arquivo informado é inválido!");
  }

  return new File([conteudo], path.basename(caminho));
}
