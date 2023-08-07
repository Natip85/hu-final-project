import { getToken } from "../auth/TokenManager";
import { Category } from "../interfaces/CategoryType";
import { Item } from "../interfaces/ItemType";
import { User } from "../interfaces/UserType";

const serverUrl = "http://localhost:3000/";
const usersUrl = `${serverUrl}users/`;
const categoriesUrl = `${serverUrl}categories/`;
const itemsUrl = `${serverUrl}items/`;

export async function getAllUsers(): Promise<Array<User>> {
  const res = await fetch(`${usersUrl}`);
  return res.json();
}

export async function signup(user: User): Promise<User> {
  const res = await fetch(`${usersUrl}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function login(user: User): Promise<User> {
  const res = await fetch(`${usersUrl}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function getUserAuth(): Promise<Array<User>> {
  const res = await fetch(`${usersUrl}user-auth`, {
    headers: {
      'x-auth-token': getToken()
    }
  });
  return res.json();
}

export async function getAdminAuth(): Promise<User> {
  const res = await fetch(`${usersUrl}admin-auth`, {
    headers: {
      'x-auth-token': getToken()
    }
  });
  return res.json();
}

export async function updateUser(user: User): Promise<User> {
  const res = await fetch(`${usersUrl}profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'x-auth-token': getToken()
    },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function getCategories(): Promise<Array<Category>> {
  const res = await fetch(`${categoriesUrl}get-categories`);
  return res.json();
}

export async function createCategory(category: Category): Promise<Category> {
  const res = await fetch(`${categoriesUrl}create-category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'x-auth-token': getToken()
    },
    body: JSON.stringify(category),
  });
  return res.json();
}

export async function updateCategory(_id: string, category: Category): Promise<Category> {
  const res = await fetch(`${categoriesUrl}update-category/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'x-auth-token': getToken()
    },
    body: JSON.stringify(category),
  });
  return res.json();
}

export async function getSingleCategory(slug: string): Promise<Category> {
  const res = await fetch(`${categoriesUrl}${slug}`, {
    headers: {
      'x-auth-token': getToken()
    }
  });
  return res.json();
}

export async function deleteCategory(_id: string): Promise<Category> {
  const res = await fetch(`${categoriesUrl}delete-category/${_id}`, {
    method: "DELETE",
    headers: {
      'x-auth-token': getToken()
    },
  });
  return res.json();
}

export async function getItems(): Promise<Array<Item>> {
  const res = await fetch(`${itemsUrl}get-product`);
  return res.json();
}

export async function addItem(item: Item): Promise<Item> {
  const res = await fetch(`${itemsUrl}create-product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'x-auth-token': getToken()
    },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function deleteItem(_id: string): Promise<Item> {
  const res = await fetch(`${itemsUrl}delete-product/${_id}`, {
    method: "DELETE",
    headers: {
      'x-auth-token': getToken()
    },
  });
  return res.json();
}

export async function updateItem(_id: any, item: Item): Promise<Item> {
  const res = await fetch(`${itemsUrl}update-product/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'x-auth-token': getToken()
    },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function getItemCategory(slug: string): Promise<Array<Item>> {
  const res = await fetch(`${itemsUrl}product-category/${slug}`, {
    headers: {
      'x-auth-token': getToken()
    }
  });
  return res.json();
}

export async function filterItem(item: any): Promise<any> {
  const res = await fetch(`${itemsUrl}product-filter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'x-auth-token': getToken()
    },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function getItemsCount(): Promise<any> {
  const res = await fetch(`${itemsUrl}product-count`);
  return res.json();
}

export async function getProductList(page: any): Promise<Array<Item>> {
  const res = await fetch(`${itemsUrl}product-list/${page}`, {
     method: "GET",
    headers: {
      'x-auth-token': getToken()
    }
  });
  return res.json();
}

export async function getSingleItem(slug: any): Promise<Item> {
  const res = await fetch(`${itemsUrl}single-product/${slug}`, {
     method: "GET",
    headers: {
      'x-auth-token': getToken()
    }
  });
  return res.json();
}

export async function getSimiliarItem(pid: string, cid:string): Promise<Array<Item>> {
  const res = await fetch(`${itemsUrl}related-product/${pid}/${cid}`, {
     method: "GET",
    headers: {
      'x-auth-token': getToken()
    }
  });
  return res.json();
}

export async function getFavorites(): Promise<Array<Item>> {
  const res = await fetch(`${itemsUrl}favorites`, {
    method:"GET",
    headers: {
      "Content-Type": "application/json",
      'x-auth-token': getToken()
    }
  });
  return res.json();
}

export async function setFavorites(id: string): Promise<Item> {
  const res = await fetch(`${itemsUrl}set-favorites/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'x-auth-token': getToken()
    },
    // body: JSON.stringify(id),
  });
  return res.json();
}

export async function getSizeFilter(size: string): Promise<Array<Item>> {
  const res = await fetch(`${itemsUrl}sizes/${size}`, {
     method: "GET",
    headers: {
      'x-auth-token': getToken()
    }
  });
  return res.json();
}