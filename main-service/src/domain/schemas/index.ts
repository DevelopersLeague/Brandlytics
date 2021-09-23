import * as yup from 'yup';

console.log(yup);

export const usernameSchema = yup
  .string()
  .max(20, 'usename cannot be more than 20 characters long');
export const passwordSchema = yup
  .string()
  .min(8, 'password must be atleast 8 characters long')
  .max(20, 'password can not be longer than 20 characters');
export const idSchema = yup.string().matches(/^[0-9]+$/, 'id must be a number');
