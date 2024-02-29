export class SystemError extends Error {
  code: number;

  constructor(message: string, code?: number) {
    super(message);
    this.name = "SystemError";
    this.code = code || 500;
  }
}
