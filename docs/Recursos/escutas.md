# Recurso: **Escutas**

> Com a escuta você pode saber todas as movimentações que ocorreram em um processo,
> e baixar todos os novos documentos anexados ao processo. Para realiza-lá
> é bastante simples, bastando somente informar o numero do processo, tribunal e os dias/horários que
> deseja realizar.

Todas as URIs são relativas a *https://app.intima.ai/api/v3*

## **Busca**

> Obs: Lembre-se que é possível paginar ou aplicar filtros as buscas dos serviços.

### Geral

Exemplo para realizar uma busca geral de todas as escutas cadastradas do usuário.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  EscutaBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, EscutaBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  // Se não for inserido nenhum id no serviço busca, ele irá retornar todos os registros daquele serviço
  const escutas = new EscutaBusca();

  const resultado = await intimai.servicos.buscar(escutas);

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

Exemplo para realizar uma busca específica de uma escuta.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  EscutaBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, EscutaBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idEscuta = 1; // ID da escuta no Intima.ai

  const escuta = new EscutaBusca(idEscuta);

  const resultado = await intimai.servicos.buscar(escuta);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

## **Cadastrar**

Exemplo para realizar o cadastro de uma escuta.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  Dia,
  Horario,
  EscutaCadastro,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, Dia, Horario, EscutaCadastro, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  // ID do autenticador no Intima.ai
  const idAutenticador = 1;

  // Número do processo no tribunal
  const numeroDoProcesso = "00000000000000000000";

  // Dias no qual a captura será realizada
  const diasDeCaptura = [Dia.SEGUNDA, Dia.SEXTA];

  // Horários no qual a captura será realizada
  const horariosDeCaptura = [Horario.DEZ_HORAS, Horario.DEZOITO_HORAS];

  const escuta = new EscutaCadastro(
    idAutenticador,
    numeroDoProcesso,
    diasDeCaptura,
    horariosDeCaptura
  );

  const resultado = await intimai.servicos.cadastrar(escuta);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

## **Atualizar**

Exemplo para realizar a atualização de uma escuta.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  Dia,
  Horario,
  EscutaAtualizacao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, Dia, Horario, EscutaAtualizacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idEscuta = 1; // ID da escuta no Intima.ai

  // Dias no qual a captura será realizada
  const diasDeCaptura = [Dia.SEGUNDA, Dia.SEXTA];

  // Horários no qual a captura será realizada
  const horariosDeCaptura = [Horario.DEZ_HORAS, Horario.DEZOITO_HORAS];

  const escuta = new EscutaAtualizacao(
    idEscuta,
    diasDeCaptura,
    horariosDeCaptura
  );

  const resultado = await intimai.servicos.atualizar(escuta);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

## **Excluir**

Exemplo para realizar a exclusão de uma escuta.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  EscutaExclusao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, EscutaExclusao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idEscuta = 1; // ID da escuta no Intima.ai

  const escuta = new EscutaExclusao(idEscuta);

  const resultado = await intimai.servicos.excluir(escuta);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

[Voltar ao topo](#recurso-escutas)  
[Voltar a lista da API](../../README.md#documentação-para-os-endpoints-da-api)  
[Voltar para o README](../../README.md#intimaai---sdk-v3-javascripttypescript)
