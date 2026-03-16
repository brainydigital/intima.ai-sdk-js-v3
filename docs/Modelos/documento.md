# Modelo: **Documento**

Você pode instanciar um documento, utilizado em métodos em que o mesmo é necessário:

```typescript
// ES Modules ou TypeScript:
import { Documento } from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
const { Documento } = require("@brainydigital/intima.ai-sdk-typescript");

const documento = new Documento(
  "caminho/do/documento",
  1, // Ordem (primeiro, segundo, terceiro...) de processamento/envio
  32, // Tipo do documento. Opcional (depende do tribunal)
  "descricao" // Opcional
);
```

[Voltar para o README](../../README.md#intimaai---sdk-v3-javascripttypescript)
