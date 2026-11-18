import { ServicoSolicitacaoCadastro } from "../ServicoSolicitacaoCadastro";
import { Endpoint } from "../../Endpoint";
import { Certificado } from "../../../Modelos/Certificado";

export class CertificadoSolicitacaoCadastro
  implements ServicoSolicitacaoCadastro
{
  private certificado: Certificado;

  constructor(certificado: Certificado) {
    this.certificado = certificado;
  }

  getEndpoint(): string {
    return `${Endpoint.CERTIFICADO}${Endpoint.SOLICITAR_CADASTRO}`;
  }

  /**
   * @throws Error
   */
  getRequest(): Record<string, any> {
    return {
      multipart: this.certificado.emArray(),
    };
  }
}
