# Recurso: **Cópias**

> Neste recurso você poderá visualizar e manter todas as suas cópias processuais.
> Bastando somente informar o tribunal e numero do processo.

Todas as URIs são relativas a *https://app.intima.ai/api/v3*

## Exemplos

Para solicitar serviços referentes as cópias, você deve instanciar o tipo de serviço antes e inserir nas funções padrões dos serviços. Veja os serviços disponíveis para as cópias nos exemplos abaixo.

## **Busca**

> Obs: Lembre-se que é possível paginar ou aplicar filtros as buscas dos serviços.

### Geral

Exemplo para realizar uma busca geral de todas as cópias do usuário.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  CopiaBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, CopiaBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  // Se não for inserido nenhum id no serviço busca, ele irá retornar todos os registros daquele serviço
  const copias = new CopiaBusca();

  const resultado = await intimai.servicos.buscar(copias);

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

Exemplo para realizar uma busca específica de uma cópia do usuário.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  CopiaBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, CopiaBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idCopia = 1; // ID da cópia no Intima.ai

  const copia = new CopiaBusca(idCopia);

  const resultado = await intimai.servicos.buscar(copia);

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

Exemplo para realizar a solicitação de uma cópia.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  CopiaSolicitacao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, CopiaSolicitacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idAutenticador = 1; // ID do autenticador no Intima.ai
  const numeroDoProcesso = "00000000000000000000"; // Número do processo no tribunal

  const copia = new CopiaSolicitacao(idAutenticador, numeroDoProcesso);

  const resultado = await intimai.servicos.solicitar(copia);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

[Voltar ao topo](#recurso-cópias)  
[Voltar a lista da API](../../README.md#documentação-para-os-endpoints-da-api)  
[Voltar para o README](../../README.md#intimaai---sdk-v3-javascripttypescript)
