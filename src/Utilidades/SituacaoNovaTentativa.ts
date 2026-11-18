export const SituacaoNovaTentativa = {
  AGENDADA: "agendada",
  AGUARDANDO_CONDICAO: "aguardando_condicao",
  ENCERRADA: "encerrada",
  SEM_NOVA_TENTATIVA: "sem_nova_tentativa",
} as const;

export type SituacaoNovaTentativaTipo =
  (typeof SituacaoNovaTentativa)[keyof typeof SituacaoNovaTentativa];
