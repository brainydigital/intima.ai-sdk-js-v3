export const Polo = {
  ATIVO: 0,
  PASSIVO: 1,
} as const;

export type PoloTipo = (typeof Polo)[keyof typeof Polo];
