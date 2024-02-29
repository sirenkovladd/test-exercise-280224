export class UserError extends Error {
  systemMessage?: string;
  code: number;

  constructor(message: string, code: number, systemMessage?: string) {
    super(message);
    this.name = "UserError";
    this.systemMessage = systemMessage;
    this.code = code;
  }
}
