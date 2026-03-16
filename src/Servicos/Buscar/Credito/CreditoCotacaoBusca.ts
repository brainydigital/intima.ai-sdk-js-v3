import { ServicoBusca } from "../ServicoBusca";
import { Endpoint } from "../../Endpoint";

export class CreditoCotacaoBusca implements ServicoBusca {
  getEndpoint(): string {
    return `${Endpoint.CREDITO}${Endpoint.COTACAO_ACOES}`;
  }
}
