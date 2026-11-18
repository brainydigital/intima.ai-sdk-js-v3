# Recurso: **Ações**

> Todas as ações realizadas dentro do `Intima.ai`, ficam registradas neste recurso. Você pode
> buscar (todas ou uma ação específica), buscar o resultado ou tentar novamente.

Todas as URIs são relativas a *https://app.intima.ai/api/v3*

## **Busca**

> Obs: Lembre-se que é possível paginar ou aplicar filtros as buscas dos serviços.

### Geral

Exemplo para realizar uma busca geral de todas as ações do usuário.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  AcaoBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, AcaoBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  // Se não for inserido nenhum id, serão retornadas todas as ações do usuário
  const acoes = new AcaoBusca();

  const resultado = await intimai.servicos.buscar(acoes);

  console.log(resultado);
} catch (error) {
  if (error instanceof APIRequestException) {
    console.error(error.toJson());
  } else {
    console.error(error.message);
  }
}
```

#### Específica

Exemplo para realizar uma busca específica de uma ação do usuário.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  AcaoBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, AcaoBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idAcao = 1; // ID da ação no Intima.ai

  const acoes = new AcaoBusca(idAcao);

  const resultado = await intimai.servicos.buscar(acoes);

  console.log(resultado);
} catch (error) {
  if (error instanceof APIRequestException) {
    console.error(error.toJson());
  } else {
    console.error(error.message);
  }
}
```

## **Resultado**

Exemplo para realizar a busca do resultado de uma ação.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  AcaoResultado,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, AcaoResultado, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idAcao = 1; // ID da ação no Intima.ai

  const acao = new AcaoResultado(idAcao);

  const resultado = await intimai.servicos.resultado(acao);

  console.log(resultado);
} catch (error) {
  if (error instanceof APIRequestException) {
    console.error(error.toJson());
  } else {
    console.error(error.message);
  }
}
```

## **Tentar Novamente**

Exemplo para tentar novamente uma ação que tenha falhado.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  AcaoTentaNovamente,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, AcaoTentaNovamente, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idAcao = 1; // ID da ação no Intima.ai

  const acao = new AcaoTentaNovamente(idAcao);

  const resultado = await intimai.servicos.tentarNovamente(acao);

  console.log(resultado);
} catch (error) {
  if (error instanceof APIRequestException) {
    console.error(error.toJson());
  } else {
    console.error(error.message);
  }
}
```

## **Nova tentativa automática**

A ação com erro (`StatusAcao.ERRO`) traz o bloco `nova_tentativa`; nos outros status ele vem `null`. Use-o antes de criar outra ação: se `automatica` for `true`, a plataforma repete a ação sozinha e não é preciso criar outra. As regras de cada código estão no recurso [Códigos de Ajuda](codigosAjuda.md#recurso-códigos-de-ajuda).

| Campo            | Descrição                                                                                     |
| ---------------- | --------------------------------------------------------------------------------------------- |
| `automatica`     | `true` quando a plataforma ainda vai repetir a ação                                            |
| `situacao`       | `SituacaoNovaTentativa.AGENDADA`, `AGUARDANDO_CONDICAO`, `ENCERRADA` ou `SEM_NOVA_TENTATIVA` |
| `tentativa`      | Número da próxima tentativa (quando agendada)                                                  |
| `max_tentativas` | Total de tentativas da regra                                                                   |
| `prevista_para`  | Data e hora previstas da próxima tentativa                                                     |
| `mensagem`       | Texto pronto para mostrar ao usuário                                                           |

```typescript
import { Intimai, AcaoBusca, SituacaoNovaTentativa, APIRequestException } from "@brainydigital/intima.ai-sdk-typescript";

try {
  const intimai = new Intimai("api_token");

  const resultado = await intimai.servicos.buscar(new AcaoBusca(1));
  const novaTentativa = resultado.data.nova_tentativa;

  if (novaTentativa === null) {
    // A ação não está com erro
  } else if (novaTentativa.automatica) {
    // A plataforma vai repetir sozinha: não crie outra ação
    console.log(novaTentativa.mensagem);
  } else if (novaTentativa.situacao === SituacaoNovaTentativa.SEM_NOVA_TENTATIVA) {
    // Corrija a causa do erro antes de criar outra ação
  }
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.getStatus(), exception.getMensagem());
  }
}
```

## **Confirmar ou cancelar consulta**

Toda consulta processual por perfil passa por uma pré-análise. Quando ela encontra processos, a consulta para em `StatusAcao.AGUARDANDO_CONFIRMACAO` (13) e a resposta da ação traz o bloco `confirmacao` (total de processos, custo estimado e `expira_em`). A confirmação vale por 1 hora. Cancelar leva a consulta a `StatusAcao.CANCELADA` (14).

| Método | Rota                                  |
| ------ | ------------------------------------- |
| POST   | `/acao/{acao_id}/confirmar-consulta`  |
| POST   | `/acao/{acao_id}/cancelar-consulta`   |

```typescript
import { Intimai, AcaoBusca, AcaoConfirmarConsultaSolicitacao, AcaoCancelarConsultaSolicitacao, StatusAcao, APIRequestException } from "@brainydigital/intima.ai-sdk-typescript";

try {
  const intimai = new Intimai("api_token");

  const idAcao = 1; // ID da consulta (ação) no Intima.ai

  const consulta = await intimai.servicos.buscar(new AcaoBusca(idAcao));

  if (consulta.data.status === StatusAcao.AGUARDANDO_CONFIRMACAO) {
    const confirmacao = consulta.data.confirmacao; // total, custo_estimado, expira_em...

    await intimai.servicos.solicitar(new AcaoConfirmarConsultaSolicitacao(idAcao));
    // ou: await intimai.servicos.solicitar(new AcaoCancelarConsultaSolicitacao(idAcao));
  }
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.getStatus(), exception.getMensagem());
  }
}
```

[Voltar ao topo](#recurso-ações)  
[Voltar a lista da API](../../README.md#recursos)  
[Voltar para o README](../../README.md#intimaai--sdk-v3-javascripttypescript)
