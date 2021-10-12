export interface IUserSignupDTO {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}

export interface IUserLoginDTO {
  username: string;
  password: string;
}

export interface IUserUpdateDTO {
  firstname?: string;
  lastname?: string;
  username?: string;
  password?: string;
}

export interface IUserRespDTO {
  id: number
  firstname: string;
  lastname: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface IQueryRespDTO {
  id: number,
  content: string,
  userId: number,
  createdAt: string,
  updatedAt: string
}

export interface IQueryCreateDTO {
  userId: number
  content: string,
}

export interface IQueryUpdateDTO {
  id: number
  content?: string
}
