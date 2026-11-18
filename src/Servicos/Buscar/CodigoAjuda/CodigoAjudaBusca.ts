import { ServicoBusca } from "../ServicoBusca";
import { Endpoint } from "../../Endpoint";

export class CodigoAjudaBusca implements ServicoBusca {
  getEndpoint(): string {
    return `${Endpoint.CODIGO_AJUDA}${Endpoint.BUSCAR}`;
  }
}
