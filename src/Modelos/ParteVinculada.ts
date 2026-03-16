export class ParteVinculada {
  private nome: string;
  private participacao: string | null;

  constructor(nome: string, participacao: string | null = null) {
    this.nome = nome;
    this.participacao = participacao;
  }

  getNome(): string {
    return this.nome;
  }

  getParticipacao(): string | null {
    return this.participacao;
  }
}
