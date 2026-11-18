import { test } from "node:test";
import assert from "node:assert/strict";
import { arquivoTemporario, criar } from "./apoio";
import {
  AutenticadorAlterarParaRegularAtualizacao,
  AutenticadorCertificadoCadastro,
  AutenticadorRegularAtualizacao,
  AutenticadorRegularCadastro,
  ConsultaPreAnaliseSolicitacao,
  ConsultaSolicitacao,
  Documento,
  ParteVinculada,
  Peticao,
  Polo,
  ProtocoloHabilitacaoPjeSegundoPassoSolicitacao,
  ProtocoloPjeSolicitacao,
  ProtocoloTjrjSegundoPassoSolicitacao,
  TipoDeclaracao,
  TipoSolicitacao,
} from "../src";

const OAB = { numero: "12345", letra: "A", uf: "RJ" };

test("consulta e pré-consulta não enviam token e mandam a OAB como objeto", async () => {
  const { intimai, requisicoes } = criar([{}, {}, {}]);
  const esperado = [
    ["autenticacao_id", "5"],
    ["numero_processo", "0000001-00.2026.8.19.0001"],
    ["nome_parte", ""],
    ["nome_representante", ""],
    ["oab[numero]", "12345"],
    ["oab[letra]", "A"],
    ["oab[uf]", "RJ"],
    ["numero_documento_parte", ""],
  ];

  await intimai.servicos.solicitar(new ConsultaSolicitacao(5, "0000001-00.2026.8.19.0001", "", "", OAB));
  await intimai.servicos.solicitar(new ConsultaPreAnaliseSolicitacao(5, "0000001-00.2026.8.19.0001", "", "", [OAB]));
  await intimai.servicos.solicitar(new ConsultaSolicitacao(5, "0000001-00.2026.8.19.0001"));

  assert.equal(requisicoes[0].caminho, "/api/v3/consulta-processual/solicitar");
  assert.deepEqual(requisicoes[0].corpo, esperado);
  assert.equal(requisicoes[1].caminho, "/api/v3/pre-consulta-processual/solicitar");
  assert.deepEqual(requisicoes[1].corpo, esperado);
  assert.deepEqual(requisicoes[2].corpo.map(([chave]) => chave), ["autenticacao_id", "numero_processo", "nome_parte", "nome_representante", "numero_documento_parte"]);
});

test("cadastro regular continua igual sem os campos novos", async () => {
  const { intimai, requisicoes } = criar();

  await intimai.servicos.cadastrar(new AutenticadorRegularCadastro(3, OAB, "usuario", "senha"));

  assert.deepEqual(requisicoes[0].corpo, [
    ["tribunal_id", "3"],
    ["usuario", "usuario"],
    ["senha", "senha"],
    ["oab_numero", "12345"],
    ["oab_letra", "A"],
    ["oab_uf", "RJ"],
  ]);
});

test("cadastro regular com vários tribunais, certificado, perfil e secret", async () => {
  const { intimai, requisicoes } = criar();

  await intimai.servicos.cadastrar(new AutenticadorRegularCadastro([3, 4], OAB, "usuario", "senha", 8, "ADV", "Escritório", "JBSWY3DPEHPK3PXP"));

  assert.equal(requisicoes[0].caminho, "/api/v3/autenticador/regular/cadastrar");
  assert.deepEqual(requisicoes[0].corpo, [
    ["tribunal_id[0]", "3"],
    ["tribunal_id[1]", "4"],
    ["usuario", "usuario"],
    ["senha", "senha"],
    ["certificado_id", "8"],
    ["oab_numero", "12345"],
    ["oab_letra", "A"],
    ["oab_uf", "RJ"],
    ["usuario_sigla", "ADV"],
    ["usuario_descricao", "Escritório"],
    ["secret", "JBSWY3DPEHPK3PXP"],
  ]);
});

test("cadastro por certificado com vários tribunais e secret", async () => {
  const { intimai, requisicoes } = criar();

  await intimai.servicos.cadastrar(new AutenticadorCertificadoCadastro("3,4", OAB, 8, null, null, "JBSWY3DPEHPK3PXP"));

  assert.equal(requisicoes[0].caminho, "/api/v3/autenticador/certificado/cadastrar");
  assert.deepEqual(requisicoes[0].corpo, [
    ["tribunal_id", "3,4"],
    ["certificado_id", "8"],
    ["oab_numero", "12345"],
    ["oab_letra", "A"],
    ["oab_uf", "RJ"],
    ["secret", "JBSWY3DPEHPK3PXP"],
  ]);
});

test("login regular envia os campos e aceita certificado", async () => {
  const { intimai, requisicoes } = criar([{}, {}, {}, {}]);

  await intimai.servicos.atualizar(new AutenticadorRegularAtualizacao(5, "usuario", "senha", 8));
  await intimai.servicos.atualizar(new AutenticadorRegularAtualizacao(5, null, "nova"));
  await intimai.servicos.atualizar(new AutenticadorAlterarParaRegularAtualizacao(5, "usuario", "senha", 8));
  await intimai.servicos.atualizar(new AutenticadorAlterarParaRegularAtualizacao(5, "usuario", "senha"));

  assert.equal(requisicoes[0].caminho, "/api/v3/autenticador/regular/5/atualizar");
  assert.deepEqual(requisicoes[0].corpo, [["usuario", "usuario"], ["senha", "senha"], ["certificado_id", "8"]]);
  assert.deepEqual(requisicoes[1].corpo, [["senha", "nova"]]);
  assert.equal(requisicoes[2].caminho, "/api/v3/autenticador/regular/5/alterar-para-regular");
  assert.deepEqual(requisicoes[2].corpo, [["usuario", "usuario"], ["senha", "senha"], ["certificado_id", "8"]]);
  assert.deepEqual(requisicoes[3].corpo, [["usuario", "usuario"], ["senha", "senha"]]);
});

test("protocolo PJe sem petição não envia petição", async () => {
  const { intimai, requisicoes } = criar();
  const documento = new Documento(arquivoTemporario("doc"), 1, 21, "Documento");

  await intimai.servicos.solicitar(new ProtocoloPjeSolicitacao(5, "0000001-00.2026.8.19.0001", 2, null, [documento]));

  assert.equal(requisicoes[0].caminho, "/api/v3/pje/protocolo-processual/solicitar");
  assert.deepEqual(requisicoes[0].campos, {
    numero_processo: "0000001-00.2026.8.19.0001",
    autenticacao_id: "5",
    tipo_documento_mensagem_geral: "2",
    "documentos[0][arquivo]": "doc",
    "documentos[0][tipo_documento]": "21",
    "documentos[0][descricao_documento]": "Documento",
    "documentos[0][ordem]": "1",
  });
});

test("protocolo PJe trabalhista envia petição", async () => {
  const { intimai, requisicoes } = criar();

  await intimai.servicos.solicitar(new ProtocoloPjeSolicitacao(5, "0000001-00.2026.5.01.0001", 2, new Peticao(arquivoTemporario("peticao"), 7, "Petição")));

  assert.equal(requisicoes[0].campos["peticao[arquivo]"], "peticao");
  assert.equal(requisicoes[0].campos["peticao[tipo_documento]"], "7");
  assert.equal(requisicoes[0].campos["peticao[descricao_documento]"], "Petição");
});

test("segunda etapa TJRJ envia categoria quando informada", async () => {
  const { intimai, requisicoes } = criar([{}, {}]);
  const peticao = new Peticao(arquivoTemporario("peticao"), "", "Petição");
  const partes = [new ParteVinculada("Fulano", "Autor")];

  await intimai.servicos.solicitar(new ProtocoloTjrjSegundoPassoSolicitacao(9, 100, partes, peticao, [], 200));
  await intimai.servicos.solicitar(new ProtocoloTjrjSegundoPassoSolicitacao(9, 100, partes, peticao));

  assert.equal(requisicoes[0].caminho, "/api/v3/tjrj/protocolo-processual/9/segunda-etapa");
  assert.equal(requisicoes[0].campos["classe_id"], "100");
  assert.equal(requisicoes[0].campos["categoria_id"], "200");
  assert.equal(requisicoes[0].campos["partes_vinculadas[0][nome]"], "Fulano");
  assert.equal(requisicoes[0].campos["partes_vinculadas[0][participacao]"], "Autor");
  assert.equal(requisicoes[1].campos["categoria_id"], undefined);
});

test("segunda etapa da habilitação envia como a collection", async () => {
  const { intimai, requisicoes } = criar([{}, {}]);
  const documento = new Documento(arquivoTemporario("procuracao"), 1, 21, "Procuração");

  await intimai.servicos.solicitar(new ProtocoloHabilitacaoPjeSegundoPassoSolicitacao(
    9,
    TipoSolicitacao.HABILITACAO_SIMPLES,
    TipoDeclaracao.DECLARACAO_SOB_PENA_DE_LEI,
    Polo.PASSIVO,
    [new ParteVinculada("node-1"), "node-2"],
    3,
    "Descrição",
    "Mensagem",
    [documento]
  ));
  await intimai.servicos.solicitar(new ProtocoloHabilitacaoPjeSegundoPassoSolicitacao(
    9,
    TipoSolicitacao.HABILITACAO_SIMPLES,
    TipoDeclaracao.TRT_NA_FORMA_DE_EXCECAO,
    Polo.ATIVO,
    ["node-1"],
    3
  ));

  assert.equal(requisicoes[0].caminho, "/api/v3/pje/protocolo-habilitacao/9/segunda-etapa");
  assert.deepEqual(requisicoes[0].campos, {
    tipo_solicitacao: "0",
    tipo_declaracao: "0",
    polo: "1",
    tipo_documento_mensagem_geral: "3",
    descricao: "Descrição",
    mensagem_geral: "Mensagem",
    "partes_vinculadas[0]": "node-1",
    "partes_vinculadas[1]": "node-2",
    "documentos[0][arquivo]": "procuracao",
    "documentos[0][tipo_documento]": "21",
    "documentos[0][descricao_documento]": "Procuração",
    "documentos[0][ordem]": "1",
  });
  assert.equal(requisicoes[1].campos["descricao"], undefined);
  assert.equal(requisicoes[1].campos["mensagem_geral"], undefined);
  assert.equal(requisicoes[1].campos["tipo_declaracao"], "1");
});
