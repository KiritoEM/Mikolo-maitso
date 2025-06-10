export type User = {
  id?: string;
  username: string;
  email: string;
  profilePhoto?: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  username: string;
  email: string;
  password: string;
};

export type AppRoute = {
  path: string;
  element: JSX.Element;
};