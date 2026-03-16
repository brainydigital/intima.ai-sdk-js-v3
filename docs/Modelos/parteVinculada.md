# Modelo: **Parte Vinculada**

Você pode instanciar uma parte vinculada, utilizada em métodos em que a mesma é necessária.

```typescript
// ES Modules ou TypeScript:
import { ParteVinculada } from "@brainydigital/intima.ai-sdk-typescript";

// CommonJS (Node.js tradicional):
const { ParteVinculada } = require("@brainydigital/intima.ai-sdk-typescript");

const parteVinculada = new ParteVinculada(
  "nome-parte-vinculada",
  "participacao" // Opcional (depende do tribunal)
);
```

[Voltar para o README](../../README.md#intimaai---sdk-v3-javascripttypescript)
