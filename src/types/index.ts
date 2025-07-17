export type User = {
  id?: string;
  username: string;
  email: string;
  profilePhoto?: string;
  role?: string;
  password?: string
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

export interface IResponseType<T> {
  status: "error" | "success";
  message: string;
  data?: T | null
}