declare namespace Express {
  interface Request {
    user: {
      id: number;
      username: string;
      firstname: string;
      lastname: string;
    };
  }
}
