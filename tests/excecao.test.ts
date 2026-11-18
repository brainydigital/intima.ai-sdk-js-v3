import { test } from "node:test";
import assert from "node:assert/strict";
import { criar } from "./apoio";
import { AcaoBusca, APIRequestException, DoisFatoresException, LimiteDeRequisicoesException } from "../src";

async function falhar(status: number, data: any, headers: Record<string, string> = {}): Promise<APIRequestException> {
  const { intimai } = criar([{ status, data, headers }]);

  try {
    await intimai.servicos.buscar(new AcaoBusca());
  } catch (erro) {
    assert.ok(erro instanceof APIRequestException);
    return erro;
  }

  assert.fail("A SDK deveria ter lançado APIRequestException.");
}

test("erro de validação expõe status, corpo e erros", async () => {
  const corpo = { autenticacao_id: ["O campo autenticacao id é obrigatório."] };
  const erro = await falhar(422, corpo);

  assert.equal(erro.constructor, APIRequestException);
  assert.equal(erro.getStatus(), 422);
  assert.equal(erro.status, 422);
  assert.deepEqual(erro.getCorpo(), corpo);
  assert.deepEqual(erro.getErros(), corpo);
  assert.deepEqual(erro.toJson(), { code: 422, error: corpo });
});

test("erro de negócio com código não vira erro de validação", async () => {
  const erro = await falhar(422, { error: "Complete seus dados fiscais.", code: 613 });

  assert.deepEqual(erro.getErros(), {});
  assert.equal(erro.getMensagem(), "Complete seus dados fiscais.");
  assert.equal(erro.getCorpo().code, 613);
});

test("limites do plano, certificado e saldo trazem a mensagem da API", async () => {
  assert.equal((await falhar(457, { error: "Limite por hora atingido." })).getStatus(), 457);
  assert.equal((await falhar(458, { error: "Certificado inválido." })).getStatus(), 458);

  const saldo = await falhar(459, { error: "Você não possui saldo suficiente" });
  assert.equal(saldo.getStatus(), 459);
  assert.equal(saldo.getMensagem(), "Você não possui saldo suficiente");
});

test("401 de 2FA vira DoisFatoresException", async () => {
  for (const mensagem of ["Código 2FA obrigatório", "Código 2FA inválido", "2FA ativado: conclua o cadastro no painel"]) {
    const erro = await falhar(401, { data: { error: true, message: mensagem } });

    assert.ok(erro instanceof DoisFatoresException);
    assert.equal(erro.name, "DoisFatoresException");
    assert.equal(erro.getMensagem(), mensagem);
  }
});

test("401 de token inválido não é de 2FA", async () => {
  const erro = await falhar(401, { data: { error: true, message: "Unauthenticated" } });

  assert.equal(erro.constructor, APIRequestException);
  assert.equal(erro.getMensagem(), "Unauthenticated");
});

test("429 de 2FA traz Retry-After", async () => {
  const erro = await falhar(429, { data: { error: true, message: "Muitos códigos 2FA inválidos." } }, { "retry-after": "42" });

  assert.ok(erro instanceof LimiteDeRequisicoesException);
  assert.equal((erro as LimiteDeRequisicoesException).getRetryAfter(), 42);
});

test("429 do limite geral sem Retry-After", async () => {
  const erro = await falhar(429, { message: "Too Many Attempts." });

  assert.ok(erro instanceof LimiteDeRequisicoesException);
  assert.equal((erro as LimiteDeRequisicoesException).getRetryAfter(), undefined);
  assert.equal(erro.getMensagem(), "Too Many Attempts.");
});

test("corpo que não é JSON fica como texto", async () => {
  const erro = await falhar(500, "Erro interno");

  assert.equal(erro.getStatus(), 500);
  assert.equal(erro.getCorpo(), "Erro interno");
  assert.deepEqual(erro.getErros(), {});
  assert.equal(erro.getMensagem(), erro.message);
});
