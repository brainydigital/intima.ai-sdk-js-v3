import { API, Codigo2fa, OpcoesAPI } from "./API/API";
import { Servicos } from "./Servicos/Servicos";

export class Intimai {
  private api: API;
  public servicos: Servicos;

  constructor(apiToken: string, opcoes: OpcoesAPI = {}) {
    this.api = new API(apiToken, opcoes);
    this.servicos = new Servicos(this.api);
  }

  definirCodigo2fa(codigo: Codigo2fa): void {
    this.api.definirCodigo2fa(codigo);
  }
}
