import { test } from "node:test";
import assert from "node:assert/strict";
import { criar, Requisicao } from "./apoio";
import {
  AcaoBusca,
  AcaoCancelarConsultaSolicitacao,
  AcaoConfirmarConsultaSolicitacao,
  APIRequestException,
  AutenticadorCapturarIntimacoesSolicitacao,
  AutenticadorDesabilitarAtualizacao,
  AutenticadorDoisFatoresCadastro,
  AutenticadorHabilitarAtualizacao,
  AutenticadorPerfilAtualizacao,
  CapturaAgendadaBusca,
  CodigoAjudaBusca,
  CreditoConsumoMensalBusca,
  SituacaoCapturaAgendada,
  SituacaoNovaTentativa,
  StatusAcao,
  TipoCapturaAgendada,
  TipoDocumentoMensagemGeralProjudiBusca,
} from "../src";

function confere(requisicao: Requisicao, metodo: string, caminho: string, corpo: Array<[string, string]> = []): void {
  assert.equal(requisicao.metodo, metodo);
  assert.equal(requisicao.caminho, `/api/v3${caminho}`);
  assert.equal(requisicao.query.api_token, "token-teste");
  assert.deepEqual(requisicao.corpo, corpo);
}

test("confirmar consulta", async () => {
  const resposta = { message: "Consulta Processual confirmada!", data: { id: 9, status: StatusAcao.NA_FILA } };
  const { intimai, requisicoes } = criar([{ data: resposta }]);

  const resultado = await intimai.servicos.solicitar(new AcaoConfirmarConsultaSolicitacao(9));

  confere(requisicoes[0], "POST", "/acao/9/confirmar-consulta");
  assert.deepEqual(resultado, resposta);
});

test("cancelar consulta", async () => {
  const { intimai, requisicoes } = criar([{ data: { data: { id: 9, status: 14 } } }]);

  const resultado = await intimai.servicos.solicitar(new AcaoCancelarConsultaSolicitacao(9));

  confere(requisicoes[0], "POST", "/acao/9/cancelar-consulta");
  assert.equal(resultado.data.status, StatusAcao.CANCELADA);
});

test("confirmar consulta de outro usuário dá 404", async () => {
  const { intimai } = criar([{ status: 404, data: { message: "Ação não encontrada." } }]);

  await assert.rejects(intimai.servicos.solicitar(new AcaoConfirmarConsultaSolicitacao(1)), (erro: APIRequestException) => {
    assert.equal(erro.getStatus(), 404);
    assert.equal(erro.getMensagem(), "Ação não encontrada.");
    return true;
  });
});

test("atualizar perfil do autenticador", async () => {
  const { intimai, requisicoes } = criar([{}, {}]);

  await intimai.servicos.atualizar(new AutenticadorPerfilAtualizacao(5, "ADV", "Escritório"));
  await intimai.servicos.atualizar(new AutenticadorPerfilAtualizacao(5, null, "Escritório"));

  confere(requisicoes[0], "PUT", "/autenticador/5/atualizar-perfil", [["usuario_sigla", "ADV"], ["usuario_descricao", "Escritório"]]);
  confere(requisicoes[1], "PUT", "/autenticador/5/atualizar-perfil", [["usuario_descricao", "Escritório"]]);
});

test("capturar intimações agora", async () => {
  const { intimai, requisicoes } = criar();

  await intimai.servicos.solicitar(new AutenticadorCapturarIntimacoesSolicitacao(5));

  confere(requisicoes[0], "POST", "/autenticador/5/capturar-intimacoes");
});

test("capturar intimações com captura desligada dá 422", async () => {
  const mensagem = "Ative a captura de intimações deste autenticador para capturar agora.";
  const { intimai } = criar([{ status: 422, data: { message: mensagem } }]);

  await assert.rejects(intimai.servicos.solicitar(new AutenticadorCapturarIntimacoesSolicitacao(5)), (erro: APIRequestException) => {
    assert.equal(erro.getStatus(), 422);
    assert.equal(erro.getMensagem(), mensagem);
    return true;
  });
});

test("habilitar e desabilitar autenticador", async () => {
  const { intimai, requisicoes } = criar([{}, {}]);

  await intimai.servicos.atualizar(new AutenticadorHabilitarAtualizacao(5));
  await intimai.servicos.atualizar(new AutenticadorDesabilitarAtualizacao(5));

  confere(requisicoes[0], "PUT", "/autenticador/5/habilitar");
  confere(requisicoes[1], "PUT", "/autenticador/5/desabilitar");
});

test("armazenar 2FA em um ou vários autenticadores", async () => {
  const { intimai, requisicoes } = criar([{}, {}]);

  await intimai.servicos.cadastrar(new AutenticadorDoisFatoresCadastro(5, "JBSWY3DPEHPK3PXP"));
  await intimai.servicos.cadastrar(new AutenticadorDoisFatoresCadastro([5, 6, 7], "JBSWY3DPEHPK3PXP"));

  confere(requisicoes[0], "POST", "/autenticador/5/2fa/armazenar", [["secret", "JBSWY3DPEHPK3PXP"]]);
  confere(requisicoes[1], "POST", "/autenticador/5,6,7/2fa/armazenar", [["secret", "JBSWY3DPEHPK3PXP"]]);
});

test("consumo mensal com e sem data", async () => {
  const { intimai, requisicoes } = criar([{}, {}]);

  await intimai.servicos.buscar(new CreditoConsumoMensalBusca(), 1, { date: "2026-10" });
  await intimai.servicos.buscar(new CreditoConsumoMensalBusca());

  confere(requisicoes[0], "GET", "/credito/consumo-mensal");
  assert.equal(requisicoes[0].query.date, "2026-10");
  assert.equal(requisicoes[1].query.date, undefined);
});

test("buscar capturas agendadas com filtros", async () => {
  const { intimai, requisicoes } = criar();

  await intimai.servicos.buscar(new CapturaAgendadaBusca(), 2, {
    data_inicial: "01/11/2026",
    data_final: "13/11/2026",
    autenticadores_ids: "5,6",
    tipos: TipoCapturaAgendada.INTIMACAO,
    situacoes: `${SituacaoCapturaAgendada.NAO_EXECUTADA},${SituacaoCapturaAgendada.ERRO}`,
  });

  confere(requisicoes[0], "GET", "/captura-agendada/buscar");
  assert.deepEqual(requisicoes[0].query, {
    api_token: "token-teste",
    page: "2",
    data_inicial: "01/11/2026",
    data_final: "13/11/2026",
    autenticadores_ids: "5,6",
    tipos: "intimacao",
    situacoes: "nao_executada,erro",
  });
});

test("buscar uma captura agendada", async () => {
  const { intimai, requisicoes } = criar();

  await intimai.servicos.buscar(new CapturaAgendadaBusca(31));

  confere(requisicoes[0], "GET", "/captura-agendada/31/buscar");
});

test("buscar tipos de documento mensagem geral do PROJUDI", async () => {
  const resposta = { message: "Tipos documentos mensagem geral encontrados para o tribunal do autenticador selecionado!", data: [{ id: 1, nome: "Petição" }] };
  const { intimai, requisicoes } = criar([{ data: resposta }]);

  const resultado = await intimai.servicos.buscar(new TipoDocumentoMensagemGeralProjudiBusca(5));

  confere(requisicoes[0], "GET", "/projudi/protocolo-processual/5/tipos-documento-mensagem-geral");
  assert.deepEqual(resultado, resposta);
});

test("tipos de documento mensagem geral com autenticador fora do PROJUDI dá 422", async () => {
  const mensagem = "Este autenticador não pertence ao sistema Projudi";
  const { intimai } = criar([{ status: 422, data: { message: mensagem } }]);

  await assert.rejects(intimai.servicos.buscar(new TipoDocumentoMensagemGeralProjudiBusca(5)), (erro: APIRequestException) => {
    assert.equal(erro.getStatus(), 422);
    assert.equal(erro.getMensagem(), mensagem);
    return true;
  });
});

test("buscar o catálogo de códigos de ajuda", async () => {
  const resposta = {
    message: "Códigos encontrados!",
    data: {
      faixas: [{ value: "isenta", titulo: "Sem cobrança", total: 47 }],
      nova_tentativa_aviso: "A nova tentativa automática só acontece nos códigos marcados, em ações criadas no mesmo dia.",
      grupos: [{ nome: "Erros Gerais", slug: "erros-gerais", codigos: [{ codigo: 606, faixa: "isenta", nova_tentativa: "Nova tentativa automática: até 3×, a cada 30 min." }] }],
    },
  };
  const { intimai, requisicoes } = criar([{ data: resposta }]);

  const resultado = await intimai.servicos.buscar(new CodigoAjudaBusca());

  confere(requisicoes[0], "GET", "/codigo-ajuda/buscar");
  assert.equal(requisicoes[0].query.codigo, undefined);
  assert.deepEqual(resultado, resposta);
});

test("buscar código de ajuda pelo código", async () => {
  const { intimai, requisicoes } = criar();

  await intimai.servicos.buscar(new CodigoAjudaBusca(), 1, { codigo: 606 });

  confere(requisicoes[0], "GET", "/codigo-ajuda/buscar");
  assert.equal(requisicoes[0].query.codigo, "606");
});

test("código de ajuda fora do catálogo dá 404", async () => {
  const mensagem = "Nenhum código encontrado no catálogo.";
  const { intimai } = criar([{ status: 404, data: { message: mensagem } }]);

  await assert.rejects(intimai.servicos.buscar(new CodigoAjudaBusca(), 1, { codigo: 99999 }), (erro: APIRequestException) => {
    assert.equal(erro.getStatus(), 404);
    assert.equal(erro.getMensagem(), mensagem);
    return true;
  });
});

test("ação com erro traz a nova tentativa automática", async () => {
  const novaTentativa = {
    automatica: true,
    situacao: SituacaoNovaTentativa.AGENDADA,
    tentativa: 1,
    max_tentativas: 3,
    prevista_para: "2026-11-18 10:30:00",
    mensagem: "Nova tentativa automática 1 de 3 a partir de 10:30. Não é preciso criar outra ação.",
  };
  const { intimai, requisicoes } = criar([{ data: { data: { id: 9, status: StatusAcao.ERRO, nova_tentativa: novaTentativa } } }]);

  const resultado = await intimai.servicos.buscar(new AcaoBusca(9));

  confere(requisicoes[0], "GET", "/acao/9/buscar");
  assert.deepEqual(resultado.data.nova_tentativa, novaTentativa);
});

test("situações da nova tentativa batem com a API", () => {
  assert.deepEqual(Object.values(SituacaoNovaTentativa), ["agendada", "aguardando_condicao", "encerrada", "sem_nova_tentativa"]);
});
