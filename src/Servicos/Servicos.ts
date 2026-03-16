import { API } from '../API/API';

import { ServicoAtualizacao } from './Atualizar/ServicoAtualizacao';
import { ServicoBusca } from './Buscar/ServicoBusca';
import { ServicoCadastro } from './Cadastrar/ServicoCadastro';
import { ServicoExclusao } from './Excluir/ServicoExclusao';
import { ServicoResultado } from './Resultado/ServicoResultado';
import { ServicoSolicitacao } from './Solicitar/ServicoSolicitacao';
import { ServicoSolicitaAtualizacao } from './SolicitarAtualizacao/ServicoSolicitaAtualizacao';
import { ServicoSolicitacaoCadastro } from './SolicitarCadastro/ServicoSolicitacaoCadastro';
import { ServicoSolicitacaoExclusao } from './SolicitarExclusao/ServicoSolicitacaoExclusao';
import { ServicoTentaNovamente } from './TentarNovamente/ServicoTentaNovamente';

export class Servicos {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  async solicitar(servico: ServicoSolicitacao): Promise<any> {
    const endpoint = servico.getEndpoint();
    const request = servico.getRequest();

    return await this.api.post(endpoint, request);
  }

  async buscar(servico: ServicoBusca, pagina: number = 1, filtros: Record<string, any> = {}): Promise<any> {
    const endpoint = servico.getEndpoint();

    return await this.api.get(endpoint, pagina, filtros);
  }

  async cadastrar(servico: ServicoCadastro): Promise<any> {
    const endpoint = servico.getEndpoint();
    const request = servico.getRequest();

    return await this.api.post(endpoint, request);
  }

  async atualizar(servico: ServicoAtualizacao): Promise<any> {
    const endpoint = servico.getEndpoint();
    const request = servico.getRequest();

    return await this.api.put(endpoint, request);
  }

  async excluir(servico: ServicoExclusao): Promise<any> {
    const endpoint = servico.getEndpoint();

    return await this.api.delete(endpoint);
  }

  async solicitarCadastro(servico: ServicoSolicitacaoCadastro): Promise<any> {
    const endpoint = servico.getEndpoint();
    const request = servico.getRequest();

    return await this.api.post(endpoint, request);
  }

  async solicitarAtualizacao(servico: ServicoSolicitaAtualizacao): Promise<any> {
    const endpoint = servico.getEndpoint();
    const request = servico.getRequest();

    return await this.api.post(endpoint, request);
  }

  async solicitarExclusao(servico: ServicoSolicitacaoExclusao): Promise<any> {
    const endpoint = servico.getEndpoint();

    return await this.api.delete(endpoint);
  }

  async resultado(servico: ServicoResultado): Promise<any> {
    const endpoint = servico.getEndpoint();

    return await this.api.get(endpoint);
  }

  async tentarNovamente(servico: ServicoTentaNovamente): Promise<any> {
    const endpoint = servico.getEndpoint();

    return await this.api.get(endpoint);
  }
}
