# Recurso: **Protocolos**

> Você pode realizar protocolos em quase todos os tribunais diponíveis no Brasil. De
> forma rápida e segura, sem se preocupar com tamanho dos arquivos em PDF (nos ajustamos e
> recortamos automaticamente, de acordo com tribunal selecionado).
>
> Para os `protocolos no PJE ou PROJUDI`, tudo é realizado em apenas uma `única etapa`, já para os `protocolos no 
ESAJ, EPROC e TJRJ`, são necessárias `duas etapas` para conclusão do mesmo.

Todas as URIs são relativas a *https://app.intima.ai/api/v3*

## Exemplos

Para solicitar serviços referentes aos protocolos de habilitação, você deve instanciar o tipo de serviço antes e inserir nas funções padrões dos serviços. Veja os serviços disponíveis para os protocolos de habilitação nos exemplos abaixo.

## **Busca**

> Obs: Lembre-se que é possível paginar ou aplicar filtros as buscas dos serviços.

### Geral

Exemplo para realizar uma busca geral de todas os protocolos do usuário.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  ProtocoloBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, ProtocoloBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  // Se não for inserido nenhum id no serviço busca, ele irá retornar todos os registros daquele serviço
  const protocolos = new ProtocoloBusca();

  const resultado = await intimai.servicos.buscar(protocolos);

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

Exemplo para realizar uma busca específica de um protocolo.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  ProtocoloBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, ProtocoloBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idProtocolo = 1; // ID do protocolo no Intima.ai

  const protocolo = new ProtocoloBusca(idProtocolo);

  const resultado = await intimai.servicos.buscar(protocolo);

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

### PJE

Protocolos no sistema PJE são realizados em uma única etapa.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  Peticao,
  Documento,
  ProtocoloPjeSolicitacao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, Peticao, Documento, ProtocoloPjeSolicitacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idAutenticador = 1; // ID do autenticador no Intima.ai
  const numeroDoProcesso = "00000000000000000000"; // Número do processo no tribunal

  // Estes tipos estão disponíveis no tribunal em questão, você pode buscar o tribunal e verificar os valores disponíveis.
  const tipoDocumentoMensagemGeral = 1;

  // A petição é necessária para alguns tribunais (TRT por exemplo). Obs: você pode buscar os tipos disponóveis da petição ao buscar o tribunal em que se está protocolando
  const peticao = new Peticao("caminho/da/peticao", 12, "descricao-peticao");

  const documentos = [
    new Documento("caminho/do/documento", 1, 21, "descricao-doc"),
  ];

  // Obs: se o tribunal não precisar da petição basta não enviar
  const protocolo = new ProtocoloPjeSolicitacao(
    idAutenticador,
    numeroDoProcesso,
    tipoDocumentoMensagemGeral,
    peticao,
    documentos
  );

  const resultado = await intimai.servicos.solicitar(protocolo);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

### PROJUDI

Protocolos no sistema PROJUDI são realizados em uma única etapa.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  Documento,
  ProtocoloProjudiSolicitacao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, Documento, ProtocoloProjudiSolicitacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idAutenticador = 1; // ID do autenticador no Intima.ai
  const numeroDoProcesso = "00000000000000000000"; // Número do processo no tribunal

  // Estes tipos estão disponíveis no tribunal em questão, você pode buscar o tribunal e verificar os valores disponíveis.
  const tipoDocumentoMensagemGeral = 1;

  const documentos = [
    new Documento("caminho/do/documento", 1, 21, "descricao-doc"),
  ];

  const protocolo = new ProtocoloProjudiSolicitacao(
    idAutenticador,
    numeroDoProcesso,
    tipoDocumentoMensagemGeral,
    documentos
  );

  const resultado = await intimai.servicos.solicitar(protocolo);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

### ESAJ

Protocolos no sistema ESAJ são realizados em duas etapas.

#### Primeira Etapa

Para realizar a primeira etapa do protocolo no sistema ESAJ, basta informar o número do processo e
o id do autenticador autenticador (contendo o tribunal referente ao número do processo).

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  ProtocoloEsajPrimeiroPassoSolicitacao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, ProtocoloEsajPrimeiroPassoSolicitacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idAutenticador = 1; // ID do autenticador no Intima.ai
  const numeroDoProcesso = "00000000000000000000"; // Número do processo no tribunal

  const primeiraEtapa = new ProtocoloEsajPrimeiroPassoSolicitacao(
    idAutenticador,
    numeroDoProcesso
  );

  const resultado = await intimai.servicos.solicitar(primeiraEtapa);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

#### Segunda Etapa

Após a finalização da primeira etapa, você terá que informar todas as informações principais do
protocolo:

Após a finalização da segunda etapa, a ação do protocolo estará finalizada e
você poderá ver a certidão do protocolo que contem todas as informações do protocolo e serve como
comprovante de protocolo.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  TipoSolicitacao,
  TipoDeclaracao,
  Polo,
  ParteVinculada,
  Peticao,
  Documento,
  ProtocoloEsajSegundoPassoSolicitacao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, TipoSolicitacao, TipoDeclaracao, Polo, ParteVinculada, Peticao, Documento, ProtocoloEsajSegundoPassoSolicitacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idProtocolo = 1; // ID do protocolo no Intima.ai

  // O id da classe pode ser obtido verificando as classes disponiveis ao buscar todas as classes
  const idClasse = 1;

  // O id da categoria pode ser obtido verificando as classes e categorias disponiveis ao buscar todas as classes
  const idCategoria = 1;

  // Array com as partes. Obs: a parte pode ter participação, verifique no tribunal
  const partesVinculadas = [new ParteVinculada("nome-parte")];

  const peticao = new Peticao("caminho/da/peticao", 12, "descricao-peticao");

  const documentos = [
    new Documento("caminho/do/documento", 1, 21, "descricao-doc"),
  ];

  const segundaEtapa = new ProtocoloEsajSegundoPassoSolicitacao(
    idProtocolo,
    idClasse,
    idCategoria,
    partesVinculadas,
    peticao,
    documentos
  );

  const resultado = await intimai.servicos.solicitar(segundaEtapa);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

### EPROC

Protocolos no sistema EPROC são realizados em duas etapas.

#### Primeira Etapa

Para realizar a primeira etapa do protocolo no sistema EPROC, basta informar o número do processo e
o id do autenticador autenticador (contendo o tribunal referente ao número do processo).

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  ProtocoloEprocPrimeiroPassoSolicitacao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, ProtocoloEprocPrimeiroPassoSolicitacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idAutenticador = 1; // ID do autenticador no Intima.ai
  const numeroDoProcesso = "00000000000000000000"; // Número do processo no tribunal

  const primeiraEtapa = new ProtocoloEprocPrimeiroPassoSolicitacao(
    idAutenticador,
    numeroDoProcesso
  );

  const resultado = await intimai.servicos.solicitar(primeiraEtapa);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

#### Segunda Etapa

Após a finalização da primeira etapa, você terá que informar todas as informações principais do
protocolo:

Após a finalização da segunda etapa, a ação do protocolo estará finalizada e
você poderá ver a certidão do protocolo que contem todas as informações do protocolo e serve como
comprovante de protocolo.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  ParteVinculada,
  Documento,
  ProtocoloEprocSegundoPassoSolicitacao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, ParteVinculada, Documento, ProtocoloEprocSegundoPassoSolicitacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idProtocolo = 1; // ID do protocolo no Intima.ai

  // Estes tipos estão disponíveis no protocolo, você pode buscar o protocolo e verificar os valores disponíveis.
  const tipoDocumentoMensagemGeral = 1;

  // Array com as partes. Obs: a parte pode ter participação, verifique no tribunal
  const partesVinculadas = [new ParteVinculada("nome-parte")];

  const documentos = [
    new Documento("caminho/do/documento", 1, 21, "descricao-doc"),
  ];

  const segundaEtapa = new ProtocoloEprocSegundoPassoSolicitacao(
    idProtocolo,
    tipoDocumentoMensagemGeral,
    partesVinculadas,
    documentos
  );

  const resultado = await intimai.servicos.solicitar(segundaEtapa);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

### TJRJ

Protocolos no sistema TJRJ são realizados em duas etapas.

#### Primeira Etapa

Para realizar a primeira etapa do protocolo no sistema TJRJ, basta informar o número do processo e
o id do autenticador autenticador (contendo o tribunal referente ao número do processo).

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  ProtocoloTjrjPrimeiroPassoSolicitacao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, ProtocoloTjrjPrimeiroPassoSolicitacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idAutenticador = 1; // ID do autenticador no Intima.ai
  const numeroDoProcesso = "00000000000000000000"; // Número do processo no tribunal

  const primeiraEtapa = new ProtocoloTjrjPrimeiroPassoSolicitacao(
    idAutenticador,
    numeroDoProcesso
  );

  const resultado = await intimai.servicos.solicitar(primeiraEtapa);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

#### Segunda Etapa

Após a finalização da primeira etapa, você terá que informar todas as informações principais do
protocolo:

Após a finalização da segunda etapa, a ação do protocolo estará finalizada e
você poderá ver a certidão do protocolo que contem todas as informações do protocolo e serve como
comprovante de protocolo.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  ParteVinculada,
  Peticao,
  Documento,
  ProtocoloTjrjSegundoPassoSolicitacao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, ParteVinculada, Peticao, Documento, ProtocoloTjrjSegundoPassoSolicitacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idProtocolo = 1; // ID do protocolo no Intima.ai

  // O id da classe pode ser obtido verificando as classes disponiveis ao buscar todas as classes
  const idClasse = 1;

  // Array com as partes. Obs: a parte pode ter participação, verifique no tribunal
  const partesVinculadas = [new ParteVinculada("nome-parte")];

  const peticao = new Peticao("caminho/da/peticao", 12, "descricao-peticao");

  const documentos = [
    new Documento("caminho/do/documento", 1, 21, "descricao-doc"),
  ];

  const segundaEtapa = new ProtocoloTjrjSegundoPassoSolicitacao(
    idProtocolo,
    idClasse,
    partesVinculadas,
    peticao,
    documentos
  );

  const resultado = await intimai.servicos.solicitar(segundaEtapa);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

[Voltar ao topo](#recurso-protocolos)  
[Voltar a lista da API](../../README.md#documentação-para-os-endpoints-da-api)  
[Voltar para o README](../../README.md#intimaai---sdk-v3-javascripttypescript)
