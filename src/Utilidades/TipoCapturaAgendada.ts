export const TipoCapturaAgendada = {
  INTIMACAO: "intimacao",
  ESCUTA: "escuta",
} as const;

export type TipoCapturaAgendadaTipo =
  (typeof TipoCapturaAgendada)[keyof typeof TipoCapturaAgendada];
