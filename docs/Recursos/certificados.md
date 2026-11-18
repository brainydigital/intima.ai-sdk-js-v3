# Recurso: **Certificados**

> Certas ações como protocolar, por exemplo, exigem que possua um `Tribunal` com o tipo de autenticação
> `Certificado A1`.
>
> Após associar um `Certificado A1` a sua conta, você deverá esperar até que o mesmo seja aprovado e
> liberado por nossa equipe.

Todas as URIs são relativas a *https://app.intima.ai/api/v3*

## Exemplos

Para solicitar serviços referentes ao certificado, você deve instanciar o tipo de serviço antes e inserir nas funções padrões dos serviços. Veja os serviços disponíveis para o certificado nos exemplos abaixo.

### **Busca**

> Obs: Lembre-se que é possível paginar ou aplicar filtros as buscas dos serviços.

#### Geral

Exemplo para realizar uma busca geral de todos os certificados do usuário.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  CertificadoBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, CertificadoBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  // Se não for inserido nenhum id no serviço busca, ele irá retornar todos os registros daquele serviço
  const certificados = new CertificadoBusca();

  const resultado = await intimai.servicos.buscar(certificados);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson());
  } else {
    console.log((exception as Error).message);
  }
}
```

#### Específica

Exemplo para realizar uma busca específica de um certificado do usuário.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  CertificadoBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, CertificadoBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idCertificado = 1; // ID do certificado no Intima.ai
  const certificado = new CertificadoBusca(idCertificado);

  const resultado = await intimai.servicos.buscar(certificado);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson());
  } else {
    console.log((exception as Error).message);
  }
}
```

### **Solicitações**

Exemplos dos serviços disponíveis para solicitacão do cadastro, atualização ou exclusão do certificado.

#### Cadastro

Exemplo para solicitar o cadastro de um certificado.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  Certificado,
  CertificadoSolicitacaoCadastro,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, Certificado, CertificadoSolicitacaoCadastro, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const modelCertificado = new Certificado("/caminho/certificado", "senha");

  const certificado = new CertificadoSolicitacaoCadastro(modelCertificado);

  const resultado = await intimai.servicos.solicitarCadastro(certificado);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson());
  } else {
    console.log((exception as Error).message);
  }
}
```

#### Atualização

Exemplo para solicitar a atualização de um certificado.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  Certificado,
  CertificadoSolicitaAtualizacao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, Certificado, CertificadoSolicitaAtualizacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idCertificado = 1; // ID do certificado no Intima.ai
  const modelCertificado = new Certificado("/caminho/certificado", "senha");

  const certificado = new CertificadoSolicitaAtualizacao(
    idCertificado,
    modelCertificado
  );

  const resultado = await intimai.servicos.solicitarAtualizacao(certificado);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson());
  } else {
    console.log((exception as Error).message);
  }
}
```

#### Exclusão

Exemplo para solicitar a exclusão de um certificado.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  CertificadoSolicitacaoExclusao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, CertificadoSolicitacaoExclusao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idCertificado = 1; // ID do certificado no Intima.ai

  const certificado = new CertificadoSolicitacaoExclusao(idCertificado);

  const resultado = await intimai.servicos.solicitarExclusao(certificado);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson());
  } else {
    console.log((exception as Error).message);
  }
}
```

[Voltar ao topo](#recurso-certificados)  
[Voltar a lista da API](../../README.md#recursos)  
[Voltar para o README](../../README.md#intimaai--sdk-v3-javascripttypescript)
