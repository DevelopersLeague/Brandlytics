import { IAPIError } from '../interfaces';

export class APIError extends Error implements IAPIError {
  public statusCode: number;

  constructor(msg: string, statusCode: number) {
    super(msg);
    this.statusCode = statusCode;
  }

  public static unauthorized(msg: string): APIError {
    return new APIError(msg, 401);
  }

  public static invalidRequest(msg: string): APIError {
    return new APIError(msg, 400);
  }

  public static forbidden(msg: string): APIError {
    return new APIError(msg, 403);
  }
}