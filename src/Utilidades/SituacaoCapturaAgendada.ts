export const SituacaoCapturaAgendada = {
  EM_ANDAMENTO: "em_andamento",
  FINALIZADA: "finalizada",
  NAO_EXECUTADA: "nao_executada",
  ERRO: "erro",
} as const;

export type SituacaoCapturaAgendadaTipo =
  (typeof SituacaoCapturaAgendada)[keyof typeof SituacaoCapturaAgendada];
