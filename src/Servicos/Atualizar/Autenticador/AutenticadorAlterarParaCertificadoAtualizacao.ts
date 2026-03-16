import { Endpoint } from "../../Endpoint";
import { ServicoAtualizacao } from "../ServicoAtualizacao";

export class AutenticadorAlterarParaCertificadoAtualizacao
  implements ServicoAtualizacao
{
  private readonly id: string | number;
  private readonly idCertificado: string | number;

  constructor(id: string | number, idCertificado: string | number) {
    this.id = id;
    this.idCertificado = idCertificado;
  }

  public getEndpoint(): string {
    return `${Endpoint.AUTENTICADOR}${Endpoint.CERTIFICADO}/${this.id}${Endpoint.ALTERAR_PARA_CERTIFICADO}`;
  }

  public getRequest(): { form_params: { certificado_id: string | number } } {
    return {
      form_params: {
        certificado_id: this.idCertificado,
      },
    };
  }
}
