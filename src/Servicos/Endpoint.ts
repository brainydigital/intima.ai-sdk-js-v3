export const Endpoint = {
  // SERVIÇOS
  BUSCAR: "/buscar",
  CADASTRAR: "/cadastrar",
  EXCLUIR: "/excluir",
  ATUALIZAR: "/atualizar",
  SOLICITAR: "/solicitar",
  PRIMEIRA_ETAPA: "/primeira-etapa",
  SEGUNDA_ETAPA: "/segunda-etapa",
  MARCAR_COMO_REVISADA: "/marcar-como-revisada",
  SOLICITAR_ATUALIZACAO: "/solicitar-atualizacao",
  SOLICITAR_CADASTRO: "/solicitar-cadastro",
  SOLICITAR_EXCLUSAO: "/solicitar-exclusao",

  // PROCESSOS
  ANDAMENTO: "/andamento-processual",
  CONSULTA: "/consulta-processual",
  CONSULTA_PRE_ANALISE: "/pre-consulta-processual",
  COPIA: "/copia-processual",
  ESCUTA: "/escuta-processual",
  INFORMACAO: "/informacao-processual",
  INTIMACAO: "/intimacao",
  PROTOCOLO: "/protocolo-processual",
  PROTOCOLO_HABILITACAO: "/protocolo-habilitacao",

  // SISTEMAS
  ESAJ: "/esaj",
  EPROC: "/eproc",
  TJRJ: "/tjrj",
  PJE: "/pje",
  PROJUDI: "/projudi",

  // AUTENTICADOR
  AUTENTICADOR: "/autenticador",
  REGULAR: "/regular",
  CERTIFICADO: "/certificado",

  // NOTIFICAÇÃO
  NOTIFICACAO: "/notificacao",
  EMAIL: "/email",
  WEBHOOK: "/webhook",

  // UTILS
  CREDITO: "/credito",
  COTACAO_ACOES: "/cotacao-acoes",
  HISTORICO: "/historico",
  SALDO: "/saldo",
  TRANSACAO: "/transacao",
  TRIBUNAL: "/tribunal",
  USUARIO: "/usuario",
  ACAO: "/acao",
  TENTAR_NOVAMENTE: "/tentar-novamente",
  RESULTADO: "/resultado",
  ALTERAR_PARA_REGULAR: "/alterar-para-regular",
  ALTERAR_PARA_CERTIFICADO: "/alterar-para-certificado",
  TIPOS_DOCUMENTO: "/tipos-documento",
  CLASSES: "/classes",
  EVENTOS: "/eventos",
  TIPOS_DOCUMENTO_MENSAGEM_GERAL: "/tipos-documento-mensagem-geral",
  CONFIRMAR_CONSULTA: "/confirmar-consulta",
  CANCELAR_CONSULTA: "/cancelar-consulta",
  ATUALIZAR_PERFIL: "/atualizar-perfil",
  CAPTURAR_INTIMACOES: "/capturar-intimacoes",
  HABILITAR: "/habilitar",
  DESABILITAR: "/desabilitar",
  DOIS_FATORES: "/2fa/armazenar",
  CONSUMO_MENSAL: "/consumo-mensal",
  CAPTURA_AGENDADA: "/captura-agendada",
  CODIGO_AJUDA: "/codigo-ajuda",
} as const;

export type Endpoint = typeof Endpoint;
