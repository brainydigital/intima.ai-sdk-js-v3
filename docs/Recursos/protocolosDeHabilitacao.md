# Recurso: **Protocolos De Habilitação**

> Assim como os protocolos, você pode realizar protocolos de habilitação em quase todos os tribunais
> disponíveis no Brasil. Sem se preocupar com o tamanho dos arquivos em PDF (nos ajustamos e
> recortamos automaticamente, de acordo com o tribunal selecionado).
>
> O protocolo de habilitação é realizado em duas etapas:
>
> - Primeira etapa: Coleta de informações do processo no qual se deseja solicitar habilitação.
> - Segunda etapa: Realização do protocolo, a partir das informações coletadas na etapa anterior.

Todas as URIs são relativas a *https://app.intima.ai/api/v3*

---

## Exemplos

Para solicitar serviços referentes aos protocolos de habilitação, você deve instanciar o tipo de serviço antes e inserir nas funções padrões dos serviços. Veja os serviços disponíveis para os protocolos de habilitação nos exemplos abaixo.

---

## **Busca**

> Obs: Lembre-se que é possível paginar ou aplicar filtros às buscas dos serviços.

### Geral

Exemplo para realizar uma busca geral de todos os protocolos de habilitação do usuário.

```typescript
// ES Modules ou TypeScript:
import {
  Intimai,
  ProtocoloHabilitacaoBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
// const { Intimai, ProtocoloHabilitacaoBusca, APIRequestException } = require('@brainydigital/intima.ai-sdk-typescript');

try {
  const intimai = new Intimai("api_token");

  // Se não for inserido nenhum id no serviço de busca, ele retornará todos os registros daquele serviço
  const protocolosHabilitacao = new ProtocoloHabilitacaoBusca();

  const resultado = await intimai.servicos.buscar(protocolosHabilitacao);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson());
  } else {
    console.log((exception as Error).message);
  }
}
```

---

### Específica

Exemplo para realizar uma busca específica de um protocolo de habilitação.

```typescript
import {
  Intimai,
  ProtocoloHabilitacaoBusca,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

try {
  const intimai = new Intimai("api_token");

  const idProtocoloHabilitacao = 1; // ID do protocolo de habilitação no Intima.ai

  const protocoloHabilitacao = new ProtocoloHabilitacaoBusca(
    idProtocoloHabilitacao
  );

  const resultado = await intimai.servicos.buscar(protocoloHabilitacao);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson());
  } else {
    console.log((exception as Error).message);
  }
}
```

---

## **Solicitação**

### Primeira etapa

Para realizar a primeira etapa do protocolo de habilitação, basta informar o número do processo e
o id do autenticador (contendo o tribunal referente ao número do processo).

```typescript
import {
  Intimai,
  ProtocoloHabilitacaoPjePrimeiroPassoSolicitacao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

try {
  const intimai = new Intimai("api_token");

  const idAutenticador = 1; // ID do autenticador no Intima.ai
  const numeroDoProcesso = "00000000000000000000"; // Número do processo no tribunal

  const primeiraEtapa = new ProtocoloHabilitacaoPjePrimeiroPassoSolicitacao(
    idAutenticador,
    numeroDoProcesso
  );

  const resultado = await intimai.servicos.solicitar(primeiraEtapa);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson());
  } else {
    console.log((exception as Error).message);
  }
}
```

---

### Segunda etapa

Após a finalização da primeira etapa, você terá que informar todas as informações principais do
protocolo de habilitação.

Após a finalização da segunda etapa, a ação do protocolo de habilitação estará finalizada e
você poderá ver a certidão do protocolo que contém todas as informações e serve como
comprovante de protocolo.

```typescript
import {
  Intimai,
  TipoSolicitacao,
  TipoDeclaracao,
  Polo,
  ParteVinculada,
  Documento,
  ProtocoloHabilitacaoPjeSegundoPassoSolicitacao,
  APIRequestException,
} from "@brainydigital/intima.ai-sdk-typescript";

try {
  const intimai = new Intimai("api_token");

  const idProtocoloHabilitacao = 1; // ID do protocolo de habilitação no Intima.ai

  // Estes tipos estão disponíveis no enum TipoSolicitacao
  const tipoSolicitacao = TipoSolicitacao.HABILITACAO_SIMPLES;

  // Estes tipos estão disponíveis no enum TipoDeclaracao (constantes TRT_* para a Justiça do Trabalho)
  const tipoDeclaracao = TipoDeclaracao.DECLARACAO_SOB_PENA_DE_LEI;

  // Estes polos estão disponíveis no enum Polo
  const polo = Polo.ATIVO;

  // Partes do polo escolhido: use o "nome" de cada parte em extra.processo_polos (polo_ativo ou polo_passivo)
  // do protocolo de habilitação. Aceita ParteVinculada ou o nome direto.
  const partesVinculadas = [new ParteVinculada("nome-parte"), "outra-parte"];

  // Estes tipos estão disponíveis no protocolo; você pode buscar o protocolo e verificar os valores disponíveis.
  const tipoDocumentoMensagemGeral = 1;

  const descricao = "Descrição da solicitação"; // Opcional
  const mensagemGeral = "Mensagem geral do protocolo"; // Opcional

  const documentos = [
    new Documento("caminho/do/documento", 1, 21, "descricao-doc"),
  ];

  const segundaEtapa = new ProtocoloHabilitacaoPjeSegundoPassoSolicitacao(
    idProtocoloHabilitacao,
    tipoSolicitacao,
    tipoDeclaracao,
    polo,
    partesVinculadas,
    tipoDocumentoMensagemGeral,
    descricao,
    mensagemGeral,
    documentos
  );

  const resultado = await intimai.servicos.solicitar(segundaEtapa);

  console.log(resultado);
} catch (exception) {
  if (exception instanceof APIRequestException) {
    console.log(exception.toJson());
  } else {
    console.log((exception as Error).message);
  }
}
```

---

[Voltar ao topo](#recurso-protocolos-de-habilitação)  
[Voltar à lista da API](../../README.md#recursos)  
[Voltar para o README](../../README.md#intimaai--sdk-v3-javascripttypescript)
