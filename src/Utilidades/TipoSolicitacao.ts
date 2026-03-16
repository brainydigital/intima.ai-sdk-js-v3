export const TipoSolicitacao = {
  HABILITACAO_SIMPLES: 0,
} as const;

export type TipoSolicitacaoTipo =
  (typeof TipoSolicitacao)[keyof typeof TipoSolicitacao];
