export const TipoDeclaracao = {
  DECLARACAO_SOB_PENA_DE_LEI: 0,
  DECLARACAO_PELA_APRESENTACAO_OPORTUNA_DO_INSTRUMENTO_DE_MANDATO: 1,
} as const;

export type TipoDeclaracaoTipo =
  (typeof TipoDeclaracao)[keyof typeof TipoDeclaracao];
