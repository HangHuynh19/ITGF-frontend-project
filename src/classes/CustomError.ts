import axios, { AxiosError } from 'axios';

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export default class CustomError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'CustomError';
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  static fromError(error: Error | AxiosError): CustomError {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      const message = error.response?.data.message || error.message;
      const status = error.status;
      return new CustomError(message, status);
    } else {
      return new CustomError(error.message);
    }
  }
}
