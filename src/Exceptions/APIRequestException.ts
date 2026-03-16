export class APIRequestException extends Error {
  public status?: number;
  public originalError?: any;

  constructor(message: string, status?: number, originalError?: any) {
    super(message);
    this.name = "APIRequestException";
    this.status = status;
    this.originalError = originalError;
  }

  toJson(): Record<string, any> {
    return {
      code: this.status,
      error: (() => {
        try {
          return JSON.parse(this.message);
        } catch {
          return this.message;
        }
      })(),
    };
  }
}
