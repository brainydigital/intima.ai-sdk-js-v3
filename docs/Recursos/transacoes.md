# Recurso: **Transações**

### Histórico

Exemplo para realizar a busca do histórico de transações do usuário.

```javascript
import { Intimai } from "@brainydigital/intima.ai-sdk-typescript";
import { TransacaoHistoricoBusca } from "@brainydigital/intima.ai-sdk-typescript/servicos/buscar/transacao";
import { APIRequestException } from "@brainydigital/intima.ai-sdk-typescript/exceptions";

try {
  const intimai = new Intimai("api_token");

  const historico = new TransacaoHistoricoBusca();

  const resultado = await intimai.servicos.buscar(historico);

  console.log(resultado);
} catch (error) {
  if (error instanceof APIRequestException) {
    console.error(error.toJson());
  } else {
    console.error(error.message);
  }
}
```

[Voltar ao topo](#recurso-transações)  
[Voltar a lista da API](../../README.md#recursos)  
[Voltar para o README](../../README.md#intimaai--sdk-v3-javascripttypescript)
