# Recurso: **Usuários**

> Através deste recurso você pode consultar todas as informações do usuário.

Todas as URIs são relativas a *https://app.intima.ai/api/v3*

## Exemplos

Para solicitar serviços referentes ao usuário, você deve instanciar o tipo de serviço antes e inserir nas funções padrões dos serviços. Veja os serviços disponíveis para o usuário nos exemplos abaixo.

### **Busca**

Exemplo para realizar a busca do usuário em JavaScript (Node.js) usando async/await:

```javascript
import { Intimai } from "intimai";
import { UsuarioBusca } from "intimai/servicos/buscar/Usuario/UsuarioBusca";
import { APIRequestException } from "intimai/exceptions";

try {
  const intimai = new Intimai("api_token");

  const usuario = new UsuarioBusca();

  const resultado = await intimai.servicos.buscar(usuario);

  console.log(resultado);
} catch (error) {
  if (error instanceof APIRequestException) {
    console.error(error.toJson());
  } else {
    console.error(error.message);
  }
}
```

[Voltar ao topo](#recurso-usuários)  
[Voltar a lista da API](../../README.md#documentação-para-os-endpoints-da-api)  
[Voltar para o README](../../README.md#intimaai---sdk-v3-javascripttypescript)
