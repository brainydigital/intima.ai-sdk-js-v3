import { test } from "node:test";
import assert from "node:assert/strict";
import { arquivoTemporario, criar } from "./apoio";
import {
  API,
  AcaoBusca,
  AutenticadorAtivarCapturaIntimacaoAtualizacao,
  AutenticadorOabAtualizacao,
  Certificado,
  CertificadoSolicitacaoCadastro,
  Dia,
  EscutaAtualizacao,
  Horario,
  NotificacaoEmailCadastro,
} from "../src";

test("envia token na query e headers da collection", async () => {
  const { intimai, requisicoes } = criar();

  await intimai.servicos.cadastrar(new NotificacaoEmailCadastro("a@b.com"));

  const [requisicao] = requisicoes;
  assert.equal(requisicao.metodo, "POST");
  assert.equal(requisicao.caminho, "/api/v3/notificacao/email/cadastrar");
  assert.deepEqual(requisicao.query, { api_token: "token-teste", page: "1" });
  assert.equal(requisicao.headers["accept"], "application/json");
  assert.equal(requisicao.headers["content-type"], "application/x-www-form-urlencoded");
  assert.equal(requisicao.headers["user-agent"], API.USER_AGENT);
  assert.equal(requisicao.headers["x-codigo-2fa"], undefined);
  assert.equal(requisicao.headers["authorization"], undefined);
  assert.deepEqual(requisicao.corpo, [["email", "a@b.com"]]);
});

test("corpo de formulário usa colchetes para listas e objetos, como a API espera", async () => {
  const { intimai, requisicoes } = criar([{}, {}, {}]);

  await intimai.servicos.atualizar(new AutenticadorAtivarCapturaIntimacaoAtualizacao(5, ["aba"], [Dia.SEGUNDA_FEIRA, Dia.SEXTA_FEIRA], [Horario.DEZ_HORAS], true));
  await intimai.servicos.atualizar(new EscutaAtualizacao(7, [Dia.SEGUNDA_FEIRA], [Horario.DEZ_HORAS, Horario.DEZOITO_HORAS]));
  await intimai.servicos.atualizar(new AutenticadorOabAtualizacao(5, { numero: "123", uf: "RJ" }));

  assert.equal(requisicoes[0].caminho, "/api/v3/autenticador/5/ativar-captura-intimacao");
  assert.deepEqual(requisicoes[0].corpo, [
    ["abas[0]", "aba"],
    ["dias_de_captura[0]", String(Dia.SEGUNDA_FEIRA)],
    ["dias_de_captura[1]", String(Dia.SEXTA_FEIRA)],
    ["horarios_de_captura[0]", "10:00"],
    ["capturar_procuradorias", "1"],
  ]);
  assert.deepEqual(requisicoes[1].corpo, [
    ["dias_de_captura[0]", String(Dia.SEGUNDA_FEIRA)],
    ["horarios_de_captura[0]", "10:00"],
    ["horarios_de_captura[1]", "18:00"],
  ]);
  assert.deepEqual(requisicoes[2].corpo, [
    ["oab_numero", "123"],
    ["oab_letra", ""],
    ["oab_uf", "RJ"],
  ]);
});

test("código 2FA vai no header e nunca na query", async () => {
  const { intimai, requisicoes } = criar([], { codigo_2fa: "482913" });

  await intimai.servicos.buscar(new AcaoBusca());

  assert.equal(requisicoes[0].headers["x-codigo-2fa"], "482913");
  assert.equal(requisicoes[0].query["codigo_2fa"], undefined);
});

test("código 2FA por função é gerado a cada request, inclusive assíncrona", async () => {
  const codigos = ["111111", "222222"];
  const { intimai, requisicoes } = criar([{}, {}], { codigo_2fa: async () => codigos.shift() });

  await intimai.servicos.buscar(new AcaoBusca());
  await intimai.servicos.buscar(new AcaoBusca());

  assert.equal(requisicoes[0].headers["x-codigo-2fa"], "111111");
  assert.equal(requisicoes[1].headers["x-codigo-2fa"], "222222");
});

test("definirCodigo2fa troca ou remove o código", async () => {
  const { intimai, requisicoes } = criar([{}, {}]);

  intimai.definirCodigo2fa("654321");
  await intimai.servicos.buscar(new AcaoBusca());
  intimai.definirCodigo2fa(null);
  await intimai.servicos.buscar(new AcaoBusca());

  assert.equal(requisicoes[0].headers["x-codigo-2fa"], "654321");
  assert.equal(requisicoes[1].headers["x-codigo-2fa"], undefined);
});

test("código 2FA vazio não envia header", async () => {
  const { intimai, requisicoes } = criar([], { codigo_2fa: "" });

  await intimai.servicos.buscar(new AcaoBusca());

  assert.equal(requisicoes[0].headers["x-codigo-2fa"], undefined);
});

test("headers e params das opções somam aos padrão", async () => {
  const { intimai, requisicoes } = criar([], { headers: { "X-Rastreio": "abc" }, params: { extra: "1" } });

  await intimai.servicos.buscar(new AcaoBusca());

  assert.equal(requisicoes[0].headers["x-rastreio"], "abc");
  assert.equal(requisicoes[0].headers["accept"], "application/json");
  assert.deepEqual(requisicoes[0].query, { api_token: "token-teste", page: "1", extra: "1" });
});

test("filtros vão na query, direto ou dentro de filtros", async () => {
  const { intimai, requisicoes } = criar([{}, {}]);

  await intimai.servicos.buscar(new AcaoBusca(), 3, { filtros: { status: "13,14", per_page: 50 } });
  await intimai.servicos.buscar(new AcaoBusca(), 1, { status: "1,2" });

  assert.deepEqual(requisicoes[0].query, { api_token: "token-teste", page: "3", status: "13,14", per_page: "50" });
  assert.deepEqual(requisicoes[1].query, { api_token: "token-teste", page: "1", status: "1,2" });
});

test("multipart envia o arquivo e não usa content-type de formulário", async () => {
  const { intimai, requisicoes } = criar();

  await intimai.servicos.solicitarCadastro(new CertificadoSolicitacaoCadastro(new Certificado(arquivoTemporario("pfx"), "senha")));

  const [requisicao] = requisicoes;
  assert.equal(requisicao.caminho, "/api/v3/certificado/solicitar-cadastro");
  assert.equal(requisicao.headers["content-type"], "multipart/form-data");
  assert.equal(requisicao.headers["accept"], "application/json");
  assert.deepEqual(requisicao.query, { api_token: "token-teste", page: "1" });
  assert.deepEqual(requisicao.campos, { arquivo: "pfx", senha: "senha", senha_confirmation: "senha" });
});

test("arquivo inexistente falha antes de chamar a API", async () => {
  const { intimai, requisicoes } = criar();

  await assert.rejects(
    intimai.servicos.solicitarCadastro(new CertificadoSolicitacaoCadastro(new Certificado("/nao/existe.pfx", "senha"))),
    { message: "O caminho do arquivo informado é inválido!" }
  );
  assert.equal(requisicoes.length, 0);
});

test("resposta sem corpo devolve objeto vazio", async () => {
  const { intimai } = criar([{ status: 204, data: "" }]);

  assert.deepEqual(await intimai.servicos.buscar(new AcaoBusca()), {});
});
