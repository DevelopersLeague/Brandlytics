export interface IUserCreateDTO {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}

export interface IUserUpdateDTO {
  firstname?: string;
  lastname?: string;
  username?: string;
  password?: string;
}
