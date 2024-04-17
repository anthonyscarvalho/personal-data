// region ###### API ######

export const HTTP_RESPONSE_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAGE_NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const SUCCESSFUL_HTTP_CODES = [
  HTTP_RESPONSE_CODES.OK,
  HTTP_RESPONSE_CODES.CREATED,
  HTTP_RESPONSE_CODES.NO_CONTENT
]

// endregion

// region ###### USER ######

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'ADMIN',
  SUBADMIN: 'SUBADMIN',
};

export const MARITAL_STATUSES = {
  SINGLE: 'S',
  MARRIED: 'M',
  DIVORCED: 'D',
  WIDOWED: 'W',
};

export const GENDERS = {
  MALE: 'M',
  FEMALE: 'F',
  OTHER: 'O',
};
