# Recurso: **Notificações**

> Atravez deste recurso você poderá ter o controle de todos os outros emails em que se deseja
> receber notificações, além do seu email principal.

Todas as URIs são relativas a *https://app.intima.ai/api/v3*

## Exemplos

Para solicitar serviços referentes as notificações, você deve instanciar o tipo de serviço antes e inserir nas funções padrões dos serviços. Veja os serviços disponíveis para as notificações nos exemplos abaixo.

## Notificação por Email

### **Busca**

> Obs: Lembre-se que é possível paginar ou aplicar filtros as buscas dos serviços.

#### Geral

Exemplo para realizar uma busca geral de todas as notificações por email do usuário.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  NotificacaoEmailBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, NotificacaoEmailBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  // Se não for inserido nenhum id no serviço busca, ele irá retornar todos os
  // registros daquele serviço
  const notificacoesEmail = new NotificacaoEmailBusca();

  const resultado = await intimai.servicos.buscar(notificacoesEmail);

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

Exemplo para realizar uma busca específica de uma noticação por email.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  NotificacaoEmailBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, NotificacaoEmailBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idNotificacaoEmail = 1; // ID da notificação por email no Intima.ai

  const notificacaoEmail = new NotificacaoEmailBusca(idNotificacaoEmail);

  const resultado = await intimai.servicos.buscar(notificacaoEmail);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

### **Cadastro**

Exemplo para realizar o cadastro de uma notificação por email.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  NotificacaoEmailCadastro,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, NotificacaoEmailCadastro, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const email = "email@exemplo.com";

  const notificacaoEmail = new NotificacaoEmailCadastro(email);

  const resultado = await intimai.servicos.cadastrar(notificacaoEmail);

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

Exemplo para realizar a atualização de uma notificação por email.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  NotificacaoEmailAtualizacao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, NotificacaoEmailAtualizacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idNotificacaoEmail = 1; // ID da notificação por email no Intima.ai
  const novoEmail = "email-novo@exemplo.com";

  const notificacaoEmail = new NotificacaoEmailAtualizacao(
    idNotificacaoEmail,
    novoEmail
  );

  const resultado = await intimai.servicos.atualizar(notificacaoEmail);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

### **Exclusão**

Exemplo para realizar a exclusão de uma notificação por email.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  NotificacaoEmailExclusao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, NotificacaoEmailExclusao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idNotificacaoEmail = 1; // ID da notificação por email no Intima.ai

  const notificacaoEmail = new NotificacaoEmailExclusao(idNotificacaoEmail);

  const resultado = await intimai.servicos.excluir(notificacaoEmail);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

## Notificação por Webhook

### **Busca**

> Obs: Lembre-se que é possível paginar ou aplicar filtros as buscas dos serviços.

#### Geral

Exemplo para realizar uma busca geral de todas as notificações por webhook do usuário.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  NotificacaoWebhookBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, NotificacaoWebhookBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  // Se não for inserido nenhum id no serviço busca, ele irá retornar todos os
  // registros daquele serviço
  const notificacoesWebhook = new NotificacaoWebhookBusca();

  const resultado = await intimai.servicos.buscar(notificacoesWebhook);

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

Exemplo para realizar uma busca específica de uma noticação por webhook.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  NotificacaoWebhookBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, NotificacaoWebhookBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idNotificacaoWebhook = 1; // ID da notificação por webhook no Intima.ai

  const notificacaoWebhook = new NotificacaoWebhookBusca(idNotificacaoWebhook);

  const resultado = await intimai.servicos.buscar(notificacaoWebhook);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

### **Cadastro**

Exemplo para realizar o cadastro de uma notificação por webhook.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  NotificacaoWebhookCadastro,
  Acao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, NotificacaoWebhookCadastro, Acao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const tipoAcao = Acao.TIPO_COPIA;
  const verboHttp = "GET";
  const url = "url-exemplo.com";

  const notificacaoWebhook = new NotificacaoWebhookCadastro(
    tipoAcao,
    verboHttp,
    url
  );

  const resultado = await intimai.servicos.cadastrar(notificacaoWebhook);

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

Exemplo para realizar a atualização de uma notificação por webhook.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  Acao,
  NotificacaoWebhookAtualizacao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, Acao, NotificacaoWebhookAtualizacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idNotificacaoWebhook = 1; // ID da notificação por webhook no Intima.ai
  const novoTipoacao = Acao.TIPO_INFORMACAO;
  const novoVerboHttp = "POST";
  const novaUrl = "nova-url-exemplo.com";

  const notificacaoEmail = new NotificacaoWebhookAtualizacao(
    idNotificacaoWebhook,
    novoTipoacao,
    novoVerboHttp,
    novaUrl
  );

  const resultado = await intimai.servicos.atualizar(notificacaoEmail);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

### **Exclusão**

Exemplo para realizar a exclusão de uma notificação por webhook.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  NotificacaoWebhookExclusao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, NotificacaoWebhookExclusao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idNotificacaoWebhook = 1; // ID da notificação por webhook no Intima.ai

  const notificacaoWebhook = new NotificacaoWebhookExclusao(
    idNotificacaoWebhook
  );

  const resultado = await intimai.servicos.excluir(notificacaoWebhook);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).message);
  }
}
```

[Voltar ao topo](#recurso-notificações)  
[Voltar a lista da API](../../README.md#documentação-para-os-endpoints-da-api)  
[Voltar para o README](../../README.md#intimaai---sdk-v3-javascripttypescript)
