import { ServicoBusca } from "../ServicoBusca";
import { Endpoint } from "../../Endpoint";

export class CreditoConsumoMensalBusca implements ServicoBusca {
  getEndpoint(): string {
    return `${Endpoint.CREDITO}${Endpoint.CONSUMO_MENSAL}`;
  }
}
