# Recurso: **Autenticacões**

> Os Autenticadores do `Intima.ai` são utilizados para ter acesso aos tribunais.
> Você pode criar diversas autenticações para diversos tribunais sendo uma autenticação para cada tribunal.

Todas as URIs são relativas a *https://app.intima.ai/api/v3*

## Exemplos

Para solicitar serviços referentes ao autenticador, você deve instanciar o tipo de serviço antes e inserir nas funções padrões dos serviços. Veja os serviços disponíveis para o autenticador nos exemplos abaixo.

### **Busca**

> Obs: Lembre-se que é possível paginar ou aplicar filtros as buscas dos serviços.

#### Geral

Exemplo para realizar uma busca geral de todas as autenticações do usuário.

```typescript
// ES Modules ou TypeScript:
import { Intimai, AutenticadorBusca, APIRequestException } from '@brainydigital/intima.ai-sdk-typescript';

// CommonJS (Node.js tradicional):
// const { Intimai, AutenticadorBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai('api_token');

  // Se não for inserido nenhum id no serviço busca, ele irá retornar todos os registros daquele serviço
  const autenticadores = new AutenticadorBusca();

  const resultado = await intimai.servicos.buscar(autenticadores);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).getMessage?.?.() ?? (exception as Error).message);
  }
}
```

#### Específica

Exemplo para realizar uma busca específica de uma autenticação do usuário.

```typescript
// ES Modules ou TypeScript:
import { Intimai, AutenticadorBusca, APIRequestException } from '@brainydigital/intima.ai-sdk-typescript';

// CommonJS (Node.js tradicional):
// const { Intimai, AutenticadorBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai('api_token');

  const idAutenticador = 1; // ID do autenticador no Intima.ai
  const autenticador = new AutenticadorBusca(idAutenticador);

  const resultado = await intimai.servicos.buscar(autenticador);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).getMessage?.?.() ?? (exception as Error).message);
  }
}
```

### **Dados**

Exemplos dos serviços disponíveis para atualização dos dados.

#### Atualizar Dados OAB

Exemplo para realizar a atualização dos dados referentes a OAB do autenticador específico do usuário.

```typescript
// ES Modules ou TypeScript:
import { Intimai, AutenticadorOabAtualizacao, APIRequestException } from '@brainydigital/intima.ai-sdk-typescript';

// CommonJS (Node.js tradicional):
// const { Intimai, AutenticadorOabAtualizacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai('api_token');

  const idAutenticador = 1; // ID do autenticador no Intima.ai
  const oab = {
    numero: 'numero_valor', // Número da OAB
    letra: 'letra_valor',   // Opcional
    uf: 'uf_valor'          // Ex: RJ, PE, PB...
  };

  const autenticador = new AutenticadorOabAtualizacao(idAutenticador, oab);

  const resultado = await intimai.servicos.atualizar(autenticador);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).getMessage?.?.() ?? (exception as Error).message);
  }
}
```

#### Atualizar Dados Usuário/Senha

Exemplo para realizar a atualização dos dados referentes ao usuário/senha (obrigatório ser do tipo regular) do autenticador específico do usuário.

```typescript
// ES Modules ou TypeScript:
import { Intimai, AutenticadorRegularAtualizacao, APIRequestException } from '@brainydigital/intima.ai-sdk-typescript';

// CommonJS (Node.js tradicional):
// const { Intimai, AutenticadorRegularAtualizacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai('api_token');

  const idAutenticador = 1; // ID do autenticador no Intima.ai
  const usuario = 'usuario-novo-valor'; // Opcional se estiver alterando apenas a senha
  const senha = 'senha-nova-valor';     // Opcional se estiver alterando apenas o úsuario

  const autenticador = new AutenticadorRegularAtualizacao(idAutenticador, usuario, senha);

  const resultado = await intimai.servicos.atualizar(autenticador);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).getMessage?.?.() ?? (exception as Error).message);
  }
}
```

### **Tipo**

Exemplos dos serviços disponíveis para criar autenticadores ou alterar o autenticador de Certificado para Regular e vice-versa.

#### Alterar para Usuário/Senha

Exemplo para realizar a alteração do tipo do autenticador para usuário/senha (obrigatório o autenticador ser previamente do tipo Certificado A1).

```typescript
// ES Modules ou TypeScript:
import { Intimai, AutenticadorAlterarParaRegularAtualizacao, APIRequestException } from '@brainydigital/intima.ai-sdk-typescript';

// CommonJS (Node.js tradicional):
// const { Intimai, AutenticadorAlterarParaRegularAtualizacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai('api_token');

  const idAutenticador = 1; // ID do autenticador no Intima.ai
  const usuario = 'usuario-valor'; // Usuário que será utilizado para acesso ao tribunal
  const senha = 'senha-valor';     // Senha que será utilizada para acesso ao tribunal

  const autenticador = new AutenticadorAlterarParaRegularAtualizacao(idAutenticador, usuario, senha);

  const resultado = await intimai.servicos.atualizar(autenticador);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).getMessage?.?.() ?? (exception as Error).message);
  }
}
```

#### Alterar para Certificado

Exemplo para realizar a alteração do tipo do autenticador para certificado A1 (obrigatório o autenticador ser previamente do tipo usuário/senha).

```typescript
// ES Modules ou TypeScript:
import { Intimai, AutenticadorAlterarParaCertificadoAtualizacao, APIRequestException } from '@brainydigital/intima.ai-sdk-typescript';

// CommonJS (Node.js tradicional):
// const { Intimai, AutenticadorAlterarParaCertificadoAtualizacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai('api_token');

  const idAutenticador = 1; // ID do autenticador no Intima.ai
  const idCertificado = 1; // ID do certificado no Intima.ai

  const autenticador = new AutenticadorAlterarParaCertificadoAtualizacao(idAutenticador, idCertificado);

  const resultado = await intimai.servicos.atualizar(autenticador);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).getMessage?.?.() ?? (exception as Error).message);
  }
}
```

#### Criar com Certificado

Exemplo para realizar o cadastro de um autenticador do tipo certificado A1.

```typescript
// ES Modules ou TypeScript:
import { Intimai, AutenticadorCertificadoCadastro, APIRequestException } from '@brainydigital/intima.ai-sdk-typescript';

// CommonJS (Node.js tradicional):
// const { Intimai, AutenticadorCertificadoCadastro, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai('api_token');

  const idTribunal = 1; // ID do tribunal no Intima.ai
  const oab = {
    numero: 'numero_valor', // Número da OAB
    letra: 'letra_valor',   // Opcional
    uf: 'uf_valor'          // Ex: RJ, PE, PB...
  };
  const idCertificado = 1;

  const autenticador = new AutenticadorCertificadoCadastro(idTribunal, oab, idCertificado);

  const resultado = await intimai.servicos.cadastrar(autenticador);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).getMessage?.?.() ?? (exception as Error).message);
  }
}
```

#### Criar com Usuário/Senha

Exemplo para realizar o cadastro de um autenticador do tipo regular (usuário/senha).

```typescript
// ES Modules ou TypeScript:
import { Intimai, AutenticadorRegularCadastro, APIRequestException } from '@brainydigital/intima.ai-sdk-typescript';

// CommonJS (Node.js tradicional):
// const { Intimai, AutenticadorRegularCadastro, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai('api_token');

  const idTribunal = 1; // ID do tribunal no Intima.ai
  const oab = {
    numero: 'numero_valor', // Número da OAB
    letra: 'letra_valor',   // Opcional
    uf: 'uf_valor'          // Ex: RJ, PE, PB...
  };
  const usuario = 'usuario-valor'; // Usuário que será utilizado para acesso ao tribunal
  const senha = 'senha-valor';     // Senha que será utilizada para acesso ao tribunal

  const autenticador = new AutenticadorRegularCadastro(
    idTribunal,
    oab,
    usuario,
    senha
  );

  const resultado = await intimai.servicos.cadastrar(autenticador);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).getMessage?.?.() ?? (exception as Error).message);
  }
}
```

### **Intimação**

Exemplos dos serviços disponíveis ativar/desativar captura de intimações do autenticador.

#### Ativar Captura

Exemplo para ativar a captura de intimações de um autenticador.

```typescript
// ES Modules ou TypeScript:
import { Intimai, Dia, Horario, AutenticadorAtivarCapturaIntimacaoAtualizacao, APIRequestException } from '@brainydigital/intima.ai-sdk-typescript';

// CommonJS (Node.js tradicional):
// const { Intimai, Dia, Horario, AutenticadorAtivarCapturaIntimacaoAtualizacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai('api_token');

  // ID do autenticador no Intima.ai
  const idAutenticador = 1;

  // Abas disponíveis no tribunal para o qual você está ativando a captura.
  const abas = [
    'aba_1',
    'aba_2'
  ];

  // Dias no qual a captura será realizada
  const diasDeCaptura = [
    Dia.SEGUNDA,
    Dia.SEXTA
  ];

  // Horários no qual a captura será realizada
  const horariosDeCaptura = [
    Horario.DEZ_HORAS,
    Horario.DEZOITO_HORAS
  ];

  // Por padrão, este valor é 0 (false), se quiser ativar, basta definir como 1 (true)
  const capturarProcuradorias = 1;

  const autenticador = new AutenticadorAtivarCapturaIntimacaoAtualizacao(
    idAutenticador,
    abas,
    diasDeCaptura,
    horariosDeCaptura,
    capturarProcuradorias
  );

  const resultado = await intimai.servicos.atualizar(autenticador);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).getMessage?.?.() ?? (exception as Error).message);
  }
}
```

#### Desativar Captura

Exemplo para desativar a captura de intimações de um autenticador.

```typescript
// ES Modules ou TypeScript:
import { Intimai, AutenticadorDesativarCapturaIntimacaoAtualizacao, APIRequestException } from '@brainydigital/intima.ai-sdk-typescript';

// CommonJS (Node.js tradicional):
// const { Intimai, AutenticadorDesativarCapturaIntimacaoAtualizacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai('api_token');

  // ID do autenticador no Intima.ai
  const idAutenticador = 1;

  const autenticador = new AutenticadorDesativarCapturaIntimacaoAtualizacao(idAutenticador);

  const resultado = await intimai.servicos.atualizar(autenticador);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson?.());
  } else {
    console.log((exception as Error).getMessage?.?.() ?? (exception as Error).message);
  }
}
```

[Voltar ao topo](#recurso-autenticacões)  
[Voltar a lista da API](../../README.md#documentação-para-os-endpoints-da-api)  
[Voltar para o README](../../README.md#intimaai---sdk-v3-javascripttypescript)
