import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { APIRequestException } from "../Exceptions/APIRequestException";

export class API {
  public static readonly URL_BASE = "https://app.intima.ai/api/v3";
  private apiToken: string;
  private opcoesAPI: Record<string, any>;
  private cliente: AxiosInstance;

  constructor(apiToken: string, opcoes: Record<string, any> = {}) {
    this.apiToken = apiToken;
    this.opcoesAPI = opcoes;

    this.cliente = axios.create({
      baseURL: API.URL_BASE,
      headers: {
        Accept: "application/json",
        "User-Agent": "Intimai_SDK/3.0.0",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      ...opcoes,
    });
  }

  private getOpcoes(
    pagina: number = 1,
    filtros: Record<string, any> = {},
    request: Record<string, any> = {}
  ): AxiosRequestConfig {
    const query: Record<string, any> = {
      api_token: this.apiToken,
      page: pagina,
      ...(filtros?.filtros || {}),
    };

    return {
      ...this.opcoesAPI,
      headers: {
        ...this.cliente.defaults.headers.common,
        ...(request.headers || {}),
      },
      params: query,
    };
  }

  private buildBody(request: Record<string, any>): {
    data: any;
    headers: Record<string, string>;
  } {
    if (request.multipart) {
      const formData = new FormData();
      for (const field of request.multipart as Array<{
        name: string;
        contents: any;
        filename?: string;
      }>) {
        formData.append(field.name, field.contents, field.filename);
      }
      return { data: formData, headers: {} };
    }

    const body: Record<string, string> = {};
    for (const [key, value] of Object.entries(request)) {
      if (key !== "headers") body[key] = String(value);
    }
    return {
      data: new URLSearchParams(body).toString(),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
  }

  async get(
    endpoint: string,
    pagina: number = 1,
    filtros: Record<string, any> = {},
    request: Record<string, any> = {}
  ) {
    try {
      const config = this.getOpcoes(pagina, filtros, request);
      const response = await this.cliente.get(endpoint, config);
      return response.data;
    } catch (error: any) {
      throw new APIRequestException(
        error.message,
        error.response?.status,
        error
      );
    }
  }

  async post(endpoint: string, request: Record<string, any> = {}) {
    try {
      const config = this.getOpcoes(1, {}, request);
      const url = `${API.URL_BASE}${endpoint}`;
      const { data, headers } = this.buildBody(request);
      Object.assign(config.headers as Record<string, string>, headers);
      const response = await this.cliente.post(url, data, config);
      return response.data;
    } catch (error: any) {
      throw new APIRequestException(
        error.message,
        error.response?.status,
        error
      );
    }
  }

  async put(endpoint: string, request: Record<string, any> = {}) {
    try {
      const config = this.getOpcoes(1, {}, request);
      const url = `${API.URL_BASE}${endpoint}`;
      const { data, headers } = this.buildBody(request);
      Object.assign(config.headers as Record<string, string>, headers);
      const response = await this.cliente.put(url, data, config);
      return response.data;
    } catch (error: any) {
      throw new APIRequestException(
        error.message,
        error.response?.status,
        error
      );
    }
  }

  async delete(endpoint: string) {
    try {
      const config = this.getOpcoes();
      const url = `${API.URL_BASE}${endpoint}`;
      const response = await this.cliente.delete(url, config);
      return response.data;
    } catch (error: any) {
      throw new APIRequestException(
        error.message,
        error.response?.status,
        error
      );
    }
  }
}
