import { ServicoBusca } from "../ServicoBusca";
import { Endpoint } from "../../Endpoint";

export class CreditoHistoricoBusca implements ServicoBusca {
  getEndpoint(): string {
    return `${Endpoint.CREDITO}${Endpoint.HISTORICO}`;
  }
}
