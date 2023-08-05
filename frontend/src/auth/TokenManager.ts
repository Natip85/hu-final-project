import { User } from "../interfaces/UserType";

const userKey = "user";
const tokenKey = "token";
// const shoppingKey = "shopping-cart";

export function setUser(user: User) {
  if (!user) return;
  const stringfyUser = JSON.stringify(user);
  localStorage.setItem(userKey, stringfyUser);
}

export function getUser(): User | undefined {
  const user = localStorage.getItem(userKey);
  if (!user) return;
  const parsedUser = JSON.parse(user);
  return parsedUser;
}

export function removeUser() {
  localStorage.removeItem(userKey);
  localStorage.removeItem(tokenKey);
  // localStorage.removeItem(shoppingKey)
  window.location.reload();
}

export function setToken(tokenValue?: string) {
  if (!tokenValue) return;
  localStorage.setItem(tokenKey, tokenValue);
}

export function getToken(): string {
  return localStorage.getItem(tokenKey) || "";
}

export function removeToken() {
  localStorage.removeItem(tokenKey);
  window.location.reload();
}

export function verifyToken(): boolean {
  return getToken().length > 0;
}
