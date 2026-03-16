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
  AcaoBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, AcaoBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

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
  AcaoBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, AcaoBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

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

[Voltar ao topo](#recurso-ações)  
[Voltar a lista da API](../../README.md#documentação-para-os-endpoints-da-api)  
[Voltar para o README](../../README.md#intimaai---sdk-v3-php)
