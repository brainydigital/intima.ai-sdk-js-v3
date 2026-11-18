import { test } from "node:test";
import assert from "node:assert/strict";
import * as http from "http";
import { AddressInfo } from "net";
import { arquivoTemporario } from "./apoio";
import { Certificado, CertificadoSolicitacaoCadastro, ConsultaSolicitacao, Intimai } from "../src";

type Recebida = { url: string; headers: http.IncomingHttpHeaders; corpo: string };

async function comServidor(executar: (intimai: Intimai, recebidas: Recebida[]) => Promise<void>): Promise<void> {
  const recebidas: Recebida[] = [];
  const servidor = http.createServer((req, res) => {
    const partes: Buffer[] = [];
    req.on("data", (parte) => partes.push(parte));
    req.on("end", () => {
      recebidas.push({ url: String(req.url), headers: req.headers, corpo: Buffer.concat(partes).toString() });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end('{"data":{"id":1}}');
    });
  });

  await new Promise<void>((resolver) => servidor.listen(0, "127.0.0.1", resolver));
  const { port } = servidor.address() as AddressInfo;

  try {
    await executar(new Intimai("token-teste", { proxy: { protocol: "http", host: "127.0.0.1", port } }), recebidas);
  } finally {
    servidor.close();
  }
}

test("formulário chega serializado com colchetes", async () => {
  await comServidor(async (intimai, recebidas) => {
    const resultado = await intimai.servicos.solicitar(
      new ConsultaSolicitacao(5, "", "", "", { numero: "123", letra: "A", uf: "RJ" })
    );

    assert.deepEqual(resultado, { data: { id: 1 } });
    assert.equal(recebidas[0].url, "https://app.intima.ai/api/v3/consulta-processual/solicitar?api_token=token-teste&page=1");
    assert.equal(recebidas[0].headers["content-type"], "application/x-www-form-urlencoded");
    assert.deepEqual([...new URLSearchParams(recebidas[0].corpo)], [
      ["autenticacao_id", "5"],
      ["numero_processo", ""],
      ["nome_parte", ""],
      ["nome_representante", ""],
      ["oab[numero]", "123"],
      ["oab[letra]", "A"],
      ["oab[uf]", "RJ"],
      ["numero_documento_parte", ""],
    ]);
  });
});

test("multipart chega com boundary e o conteúdo do arquivo", async () => {
  await comServidor(async (intimai, recebidas) => {
    await intimai.servicos.solicitarCadastro(
      new CertificadoSolicitacaoCadastro(new Certificado(arquivoTemporario("conteudo-pfx"), "senha"))
    );

    const contentType = String(recebidas[0].headers["content-type"]);
    assert.match(contentType, /^multipart\/form-data; boundary=/);
    assert.match(recebidas[0].corpo, /name="arquivo"; filename="arquivo\.pdf"\r\nContent-Type: [^\r]+\r\n\r\nconteudo-pfx\r\n/);
    assert.match(recebidas[0].corpo, /name="senha"\r\n\r\nsenha\r\n/);
    assert.match(recebidas[0].corpo, /name="senha_confirmation"\r\n\r\nsenha\r\n/);
  });
});
