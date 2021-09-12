export interface IApiError extends Error {
  statusCode: number;
}

export interface IConfigService {
  get: (key: string)=> string;
}