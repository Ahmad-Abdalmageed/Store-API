export class apiError extends Error {
  statusCode: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.statusCode = status;
    this.message = message;
  }
}
