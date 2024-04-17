import * as bcrypt from 'bcryptjs';

export const isEmailAddress = (input: string) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegex.test(input.toLowerCase());
};

export const isPhoneNumber = (input: string) => {
  const phoneRegex = /[0-9 -()+]+$/;

  return phoneRegex.test(input);
};

export const isRsaId = (input: string) => {
  const rsaIdRegex =
    /^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))$/;

  return rsaIdRegex.test(input);
};

export const hashPassword = (plainText: string) => {
  return bcrypt.hashSync(plainText, 10);
};

export const validatePassword = (plainText: string, hash: string) => {
  return bcrypt.compareSync(plainText, hash);
};
