# Recurso: **Intimações**

> A captura das intimações ocorrem em determinados horários e dias escolhidos por você, ao se adicionar um tribunal em `Tribunais ativos`.
>
> Para cada "Tribunal ativo" na sua lista de Tribunais ativos, você pode ou não habilitar a
> captura de intimações. Caso a captura de intimações esteja habilitada para o tribunal selecionado,
> será necessario informar os dias da semana em que ocorrerão as capturas, bem como ao menos um
> horário para captura e também quais as abas que deseja que o `INTIMA.AI` realize a captura das
> intimações.
>
> Após finalizada a ação de captura de intimações, será possível verificar todos os documentos
> atrelados as intimações (em texto ou em PDF), bem como realizar a revisão das intimações.

Todas as URIs são relativas a *https://app.intima.ai/api/v3*

## Exemplos

Para solicitar serviços referentes as intimações, você deve instanciar o tipo de serviço antes e inserir nas funções padrões dos serviços. Veja os serviços disponíveis para as intimações nos exemplos abaixo.

### **Busca**

> Obs: Lembre-se que é possível paginar ou aplicar filtros as buscas dos serviços.

#### Geral

Exemplo para realizar uma busca geral de todas as intimações do usuário.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  IntimacaoBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, IntimacaoBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  // Se não for inserido nenhum id no serviço busca, ele irá retornar todos os registros daquele serviço
  const intimacoes = new IntimacaoBusca();

  const resultado = await intimai.servicos.buscar(intimacoes);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

#### Específica

Exemplo para realizar uma busca específica de uma intimação.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  IntimacaoBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, IntimacaoBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idIntimacao = 1; // ID da intimação no Intima.ai

  const intimacao = new IntimacaoBusca(idIntimacao);

  const resultado = await intimai.servicos.buscar(intimacao);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

### **Atualização**

#### **Marcar como revisada**

> Você pode marcar a intimação como revisada para melhor organização.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  IntimacaoMarcarComoRevisadaAtualizacao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, IntimacaoMarcarComoRevisadaAtualizacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idIntimacao = 1; // ID da intimação no Intima.ai

  const intimacao = new IntimacaoMarcarComoRevisadaAtualizacao(idIntimacao);

  const resultado = await intimai.servicos.atualizar(intimacao);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

[Voltar ao topo](#recurso-intimações)  
[Voltar a lista da API](../../README.md#documentação-para-os-endpoints-da-api)  
[Voltar para o README](../../README.md#intimaai---sdk-v3-javascripttypescript)
