# Recurso: **Andamentos**

> Com os Andamentos, você poderá visualizar todas as movimentações e documentos
> (PDF e HTML) do polo interno de um processo.

Todas as URIs são relativas a *https://app.intima.ai/api/v3*

## **Busca**

> Obs: Lembre-se que é possível paginar ou aplicar filtros as buscas dos serviços.

### Geral

Exemplo para realizar uma busca geral de todos os andamentos cadastrados do usuário.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  AndamentoBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, AndamentoBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  // Se não for inserido nenhum id, serão retornadas todas os andamentos do usuário
  const andamentos = new AndamentoBusca();

  const resultado = await intimai.servicos.buscar(andamentos);

  console.log(resultado);
} catch (error) {
  if (error instanceof APIRequestException) {
    console.log(error.toJson());
  } else {
    console.log(error.message);
  }
}
```

### Específica

Exemplo para realizar uma busca específica de um andamento cadastrado do usuário.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  AndamentoBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, AndamentoBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idAndamento = 1; // ID do andamento no Intima.ai

  const andamento = new AndamentoBusca(idAndamento);

  const resultado = await intimai.servicos.buscar(andamento);

  console.log(resultado);
} catch (error) {
  if (error instanceof APIRequestException) {
    console.log(error.toJson());
  } else {
    console.log(error.message);
  }
}
```

## **Cadastrar**

Exemplo para realizar o cadastro de um andamento.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  AndamentoCadastro,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, AndamentoCadastro, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idAutenticador = 1;
  const numeroProcesso = "00000000000000000000";

  const andamento = new AndamentoCadastro(idAutenticador, numeroProcesso);
  
  const resultado = await intimai.servicos.cadastrar(andamento);

  console.log(resultado);
} catch (error) {
  if (error instanceof APIRequestException) {
    console.log(error.toJson());
  } else {
    console.log(error.message);
  }
}
```

## **Solicitar**

Exemplo para realizar a captura de um andamento.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  AndamentoSolicitacao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, AndamentoSolicitacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idAndamento = 1;

  const andamento = new AndamentoSolicitacao(idAndamento);

  const resultado = await intimai.servicos.solicitar(andamento);

  console.log(resultado);
} catch (error) {
  if (error instanceof APIRequestException) {
    console.log(error.toJson());
  } else {
    console.log(error.message);
  }
}
```

## **Excluir**

Exemplo para realizar a exclusão de um andamento.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  AndamentoExclusao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, AndamentoExclusao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");
  const id = 1;

  const andamento = new AndamentoExclusao(id);
  const resultado = await intimai.servicos.excluir(andamento);

  console.log(resultado);
} catch (error) {
  if (error instanceof APIRequestException) {
    console.log(error.toJson());
  } else {
    console.log(error.message);
  }
}
```

[Voltar ao topo](#recurso-andamentos)  
[Voltar a lista da API](../../README.md#recursos)  
[Voltar para o README](../../README.md#intimaai--sdk-v3-javascripttypescript)
