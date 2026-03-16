# Recurso: **Créditos**

Todas as URIs são relativas a *https://app.intima.ai/api/v3*

## **Busca**

> Obs: Lembre-se que é possível paginar ou aplicar filtros as buscas dos serviços.

### Cotação

Exemplo para realizar a busca da cotação de créditos por ação.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  CreditoCotacaoBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, CreditoCotacaoBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const cotacao = new CreditoCotacaoBusca();

  const resultado = await intimai.servicos.buscar(cotacao);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

### Histórico

Exemplo para realizar a busca do histórico de créditos do usuário.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  CreditoHistoricoBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, CreditoHistoricoBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const historico = new CreditoHistoricoBusca();

  const resultado = await intimai.servicos.buscar(historico);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

### Saldo

Exemplo para realizar a busca do saldo de créditos do usuário.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  CreditoSaldoBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, CreditoSaldoBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const saldo = new CreditoSaldoBusca();

  const resultado = await intimai.servicos.buscar(saldo);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

[Voltar ao topo](#recurso-créditos)  
[Voltar a lista da API](../../README.md#documentação-para-os-endpoints-da-api)  
[Voltar para o README](../../README.md#intimaai---sdk-v3-javascripttypescript)
