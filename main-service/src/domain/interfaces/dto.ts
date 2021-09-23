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
  firstname: string;
  lastname: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}
