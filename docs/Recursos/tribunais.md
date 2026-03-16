# Recurso: **Tribunais**

> Os tribunais correspondem a todos os sistemas jurídicos disponíveis no `Intima.ai`
> (PJE, ESAJ, PROJUDI, EPROC e etc).
>
> Para cada tribunal, você pode definir se deseja realizar as captura de intimações
> (definir dias e horários do seu agrado) e associar uma `Autenticação`.
>
> A `Autenticação` pode ser um certificado A1 ou usuário/senha, mas sempre deve-se
> ficar atento às funcionalidades suportadas por cada tribunal.

Todas as URIs são relativas a *https://app.intima.ai/api/v3*

## Exemplos

Para solicitar serviços referentes aos tribunais, você deve instanciar o tipo de serviço antes e inserir nas funções padrões dos serviços. Veja os serviços disponíveis para o tribunal nos exemplos abaixo.

### **Busca**

> Obs: Lembre-se que é possível paginar ou aplicar filtros às buscas dos serviços.

#### Geral

Exemplo para realizar a busca geral de todos os tribunais disponíveis no `Intima.ai`.

```javascript
import { Intimai } from "@brainydigital/intima.ai-sdk-typescript";
import { TribunalBusca } from "@brainydigital/intima.ai-sdk-typescript/servicos/buscar/tribunal";
import { APIRequestException } from "@brainydigital/intima.ai-sdk-typescript/exceptions";

try {
  const intimai = new Intimai("api_token");

  // Se não for inserido nenhum id no serviço de busca, ele irá retornar todos os registros daquele serviço
  const tribunais = new TribunalBusca();

  const resultado = await intimai.servicos.buscar(tribunais);

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

Exemplo para realizar a busca específica de um tribunal.

```javascript
import { Intimai } from "@brainydigital/intima.ai-sdk-typescript";
import { TribunalBusca } from "@brainydigital/intima.ai-sdk-typescript/servicos/buscar/tribunal";
import { APIRequestException } from "@brainydigital/intima.ai-sdk-typescript/exceptions";

try {
  const intimai = new Intimai("api_token");

  const idTribunal = 1; // ID do tribunal no Intima.ai
  const tribunal = new TribunalBusca(idTribunal);

  const resultado = await intimai.servicos.buscar(tribunal);

  console.log(resultado);
} catch (error) {
  if (error instanceof APIRequestException) {
    console.error(error.toJson());
  } else {
    console.error(error.message);
  }
}
```

[Voltar ao topo](#recurso-tribunais)  
[Voltar à lista da API](../../README.md#documentação-para-os-endpoints-da-api)  
[Voltar para o README](../../README.md#intimaai---sdk-v3-javascripttypescript)
