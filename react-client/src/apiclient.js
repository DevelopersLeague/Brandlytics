import {APIClient} from './lib/api'

export const client = new APIClient({
    tokenKey: "token",
    serverBaseUrl: process.env.REACT_APP_API_SERVER,
  });

