import { ServicoSolicitacaoExclusao } from "../ServicoSolicitacaoExclusao";
import { Endpoint } from "../../Endpoint";

export class CertificadoSolicitacaoExclusao
  implements ServicoSolicitacaoExclusao
{
  private id: string | number;

  constructor(id: string | number) {
    this.id = id;
  }

  getEndpoint(): string {
    return `${Endpoint.CERTIFICADO}/${this.id}${Endpoint.SOLICITAR_EXCLUSAO}`;
  }
}
