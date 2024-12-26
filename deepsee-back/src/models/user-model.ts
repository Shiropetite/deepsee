// #region --- Models
export type User = {
  __id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  type: string;
};
// #endregion

// #region --- Database models
export type UserDB = {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  password: string;
  type: string;
};
// #endregion
