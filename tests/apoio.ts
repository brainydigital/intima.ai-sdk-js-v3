import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { Intimai, OpcoesAPI } from "../src";

type Resposta = { status?: number; data?: any; headers?: Record<string, string> };

export type Requisicao = {
  metodo: string;
  caminho: string;
  query: Record<string, string>;
  headers: Record<string, string>;
  corpo: Array<[string, string]>;
  campos: Record<string, string>;
};

export function criar(respostas: Resposta[] = [], opcoes: OpcoesAPI = {}) {
  const requisicoes: Requisicao[] = [];

  const intimai = new Intimai("token-teste", {
    ...opcoes,
    adapter: async (config: InternalAxiosRequestConfig) => {
      requisicoes.push(await capturar(config));

      const { status = 200, data = { data: [] }, headers = {} } = respostas.shift() ?? {};
      const response = { data, status, statusText: "", headers, config, request: {} };

      if (status >= 400) {
        throw new AxiosError(`Request failed with status code ${status}`, AxiosError.ERR_BAD_REQUEST, config, {}, response as any);
      }

      return response as any;
    },
  });

  return { intimai, requisicoes };
}

async function capturar(config: InternalAxiosRequestConfig): Promise<Requisicao> {
  const url = new URL(axios.getUri(config));
  const headers: Record<string, string> = {};

  for (const [chave, valor] of Object.entries(config.headers.toJSON())) {
    headers[chave.toLowerCase()] = String(valor);
  }

  const corpo: Array<[string, string]> = [];
  const campos: Record<string, string> = {};

  if (typeof config.data === "string") {
    for (const [chave, valor] of new URLSearchParams(config.data)) {
      corpo.push([chave, valor]);
    }
  }

  if (config.data instanceof FormData) {
    for (const [chave, valor] of config.data.entries()) {
      campos[chave] = typeof valor === "string" ? valor : await valor.text();
    }
  }

  return {
    metodo: String(config.method).toUpperCase(),
    caminho: url.pathname,
    query: Object.fromEntries(url.searchParams),
    headers,
    corpo,
    campos,
  };
}

export function arquivoTemporario(conteudo: string): string {
  const caminho = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "sdk-")), "arquivo.pdf");
  fs.writeFileSync(caminho, conteudo);

  return caminho;
}
