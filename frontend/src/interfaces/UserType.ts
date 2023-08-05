export interface User {
  _id?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  password?: string;
  address?: string
  token?: string
  isBlocked?: boolean
  favorites?: [] | null;
  role?: number
  success?: boolean
  error?: string
  message?: string
  user?: any
  updatedUser?: any
}