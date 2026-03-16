// src/Servicos/Helpers.ts
import { Peticao } from "../Modelos/Peticao";
import { ParteVinculada } from "../Modelos/ParteVinculada";
import { Documento } from "../Modelos/Documento";
import { DadosMultipart } from "../DadosTipo/DadosMultipart";

export const Helpers = {
  definirPartes(
    partes: ParteVinculada[],
    parametrosParaMultiForm: Record<string, any>
  ): void {
    partes.forEach((parte, index) => {
      parametrosParaMultiForm[`partes_vinculadas[${index}][nome]`] =
        parte.getNome();
      parte.getParticipacao?.() &&
        (parametrosParaMultiForm[`partes_vinculadas[${index}][participacao]`] =
          parte.getParticipacao());
    });
  },

  definirPeticao(
    peticao: Peticao | null,
    parametrosParaMultiForm: Record<string, any>
  ): void {
    peticao && Object.assign(parametrosParaMultiForm, peticao.emArray());
  },

  definirDocumentos(
    documentos: Documento[] | null,
    parametrosParaMultiForm: Record<string, any>
  ): void {
    documentos?.forEach((doc) =>
      Object.assign(parametrosParaMultiForm, doc.emArray())
    );
  },

  definirMultiPart(parametros: Record<string, any>): DadosMultipart[] {
    return Object.entries(parametros).map(([name, contents]) => ({
      name,
      contents,
    }));
  },
};
