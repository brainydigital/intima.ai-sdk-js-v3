import { API } from "./API/API";
import { Servicos } from "./Servicos/Servicos";

export class Intimai {
  private api: API;
  public servicos: Servicos;

  constructor(apiToken: string, opcoes: object = {}) {
    this.api = new API(apiToken, opcoes);
    this.servicos = new Servicos(this.api);
  }
}
