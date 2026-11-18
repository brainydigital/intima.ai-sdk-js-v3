# Recurso: **Consultas**

> Com este recurso você poderá realizar consultas de todos os processos disponíveis em qualquer
> tribunal do Brasil. Bastando apenas informar o `numero do proceso` ou o `nome da parte` ou o `nome do 
representante`.
>
> O `Intima.ai` recomenda que antes de realizar qualquer consulta processual, primeiro solicite
> a `pré-analise da consulta`, pois dependendo dos termos utilizados na consulta,
> poderá haver um numero muito alto de registros encontrados, consumindo assim seus créditos.
>
> A `pré-analise de uma consulta` retorna a quantidade de registros encontrados com os
> termos de busca informados.
>
> Ao solicitar uma consulta por perfil, a API faz a pré-análise sozinha. Se houver processos, a
> consulta para em `StatusAcao.AGUARDANDO_CONFIRMACAO` (13) e só segue depois de confirmada
> (veja [Confirmar ou cancelar consulta](acoes.md#confirmar-ou-cancelar-consulta)). Sem
> confirmação em 1 hora, a consulta expira.
>
> A OAB vai como objeto: `{ numero: "123", letra: "A", uf: "RJ" }`.
>
> No EPROC, informe só um parâmetro de busca: número do processo **ou** documento da parte
> **ou** OAB. Nome da parte e nome do representante ainda não são aceitos nesse sistema.

Todas as URIs são relativas a *https://app.intima.ai/api/v3*

## **Busca**

> Obs: Lembre-se que é possível paginar ou aplicar filtros as buscas dos serviços.

### Geral

Exemplo para realizar uma busca geral de todas as consultas do usuário.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  ConsultaBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, ConsultaBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  // Se não for inserido nenhum id no serviço busca, ele irá retornar todos os registros daquele serviço
  const consultas = new ConsultaBusca();

  const resultado = await intimai.servicos.buscar(consultas);

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

Exemplo para realizar uma busca específica de uma consulta do usuário.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  ConsultaBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, ConsultaBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idConsulta = 1; // ID da consulta no Intima.ai

  const consulta = new ConsultaBusca(idConsulta);

  const resultado = await intimai.servicos.buscar(consulta);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson());
  } else {
    console.log((exception as Error).message);
  }
}
```

## **Solicitar**

Exemplo para realizar a solicitação de uma consulta.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  ConsultaSolicitacao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, ConsultaSolicitacao, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idAutenticador = 1; // ID do autenticador no Intima.ai
  const numeroDoProcesso = "00000000000000000000"; // Número do processo no tribunal
  // OU nome do representante >> const nomeRepresentante = 'nome-representante';

  const consulta = new ConsultaSolicitacao(idAutenticador, numeroDoProcesso);

  const resultado = await intimai.servicos.solicitar(consulta);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson());
  } else {
    console.log((exception as Error).message);
  }
}
```

## **Resultado**

Exemplo para realizar a busca do resultado de uma consulta.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  ConsultaResultado,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, ConsultaResultado, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  const idConsulta = 1; // ID da consulta no Intima.ai

  const consulta = new ConsultaResultado(idConsulta);

  const resultado = await intimai.servicos.resultado(consulta);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson());
  } else {
    console.log((exception as Error).message);
  }
}
```

[Voltar ao topo](#recurso-consultas)  
[Voltar a lista da API](../../README.md#recursos)  
[Voltar para o README](../../README.md#intimaai--sdk-v3-javascripttypescript)
