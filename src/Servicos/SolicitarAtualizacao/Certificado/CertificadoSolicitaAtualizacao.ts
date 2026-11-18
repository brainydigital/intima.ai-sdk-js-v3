import { ServicoSolicitaAtualizacao } from "../ServicoSolicitaAtualizacao";
import { Endpoint } from "../../Endpoint";
import { Certificado } from "../../../Modelos/Certificado";

export class CertificadoSolicitaAtualizacao
  implements ServicoSolicitaAtualizacao
{
  private id: string | number;
  private certificado: Certificado;

  constructor(id: string | number, certificado: Certificado) {
    this.id = id;
    this.certificado = certificado;
  }

  getEndpoint(): string {
    return `${Endpoint.CERTIFICADO}/${this.id}${Endpoint.SOLICITAR_ATUALIZACAO}`;
  }

  getRequest(): Record<string, any> {
    return {
      multipart: this.certificado.emArray(),
    };
  }
}
