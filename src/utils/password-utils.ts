import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltOrRounds);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(password, hashedPassword);
};
