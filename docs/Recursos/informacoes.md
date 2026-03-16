# Recurso: **Informações**

> Com as informações, você poderá obter todas as informações do processo, tais como:
> valor da causa, classe judicial, assuntos, polos e etc.

Todas as URIs são relativas a *https://app.intima.ai/api/v3*

## Exemplos

Para solicitar serviços referentes as informações, você deve instanciar o tipo de serviço antes e inserir nas funções padrões dos serviços. Veja os serviços disponíveis para as informações nos exemplos abaixo.

## **Busca**

> Obs: Lembre-se que é possível paginar ou aplicar filtros as buscas dos serviços.

### Geral

Exemplo para realizar uma busca geral de todas as informações processuais do usuário.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  InformacaoBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, InformacaoBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  // Se não for inserido nenhum id no serviço busca, ele irá retornar todos os registros daquele serviço
  const informacoes = new InformacaoBusca();

  const resultado = await intimai.servicos.buscar(informacoes);

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

Exemplo para realizar uma busca específica de uma informação processual.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  InformacaoBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, InformacaoBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idInformacao = 1; // ID da informação no Intima.ai

  const informacao = new InformacaoBusca(idInformacao);

  const resultado = await intimai.servicos.buscar(informacao);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

## **Solicitação**

Exemplo para realizar a solicitação de uma informação processual.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  InformacaoSolicitacao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, InformacaoSolicitacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idAutenticador = 1; // ID do autenticador no Intima.ai
  const numeroDoProcesso = "00000000000000000000"; // Número do processo no tribunal

  const informacao = new InformacaoSolicitacao(
    idAutenticador,
    numeroDoProcesso
  );

  const resultado = await intimai.servicos.solicitar(informacao);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

[Voltar ao topo](#recurso-informações)  
[Voltar a lista da API](../../README.md#documentação-para-os-endpoints-da-api)  
[Voltar para o README](../../README.md#intimaai---sdk-v3-javascripttypescript)
