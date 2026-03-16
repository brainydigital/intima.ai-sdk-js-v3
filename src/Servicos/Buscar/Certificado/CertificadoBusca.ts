import { ServicoBusca } from "../ServicoBusca";
import { Endpoint } from "../../Endpoint";

export class CertificadoBusca implements ServicoBusca {
  private id: string | number | null;

  constructor(id: string | number | null = null) {
    this.id = id;
  }

  getEndpoint(): string {
    if (!this.id) {
      return `${Endpoint.CERTIFICADO}${Endpoint.BUSCAR}`;
    }

    return `${Endpoint.CERTIFICADO}/${this.id}${Endpoint.BUSCAR}`;
  }
}
