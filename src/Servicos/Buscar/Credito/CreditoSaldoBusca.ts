import { ServicoBusca } from "../ServicoBusca";
import { Endpoint } from "../../Endpoint";

export class CreditoSaldoBusca implements ServicoBusca {
  getEndpoint(): string {
    return `${Endpoint.CREDITO}${Endpoint.SALDO}`;
  }
}
