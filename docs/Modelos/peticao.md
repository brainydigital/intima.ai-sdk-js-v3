# Modelo: **Petição**

Você pode instanciar uma petição, utilizada em métodos em que a mesma é necessária:

```typescript
// ES Modules ou TypeScript:
import { Peticao } from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
const { Peticao } = require("@brainydigital/intima.ai-sdk-typescript");

const peticao = new Peticao(
  "caminho/da/peticao",
  32, // Tipo do documento. Opcional (depende do tribunal)
  "descricao" // Opcional
);
```

[Voltar para o README](../../README.md#intimaai---sdk-v3-javascripttypescript)
