const API_BASE = import.meta.env.VITE_API_BASE_URL;

const defaultHeaders = {
  'Content-Type': 'application/json'
};

export async function getUsers() {
  const response = await fetch(API_BASE + '/users');
  const data = await response.json();
  return { data: data };
}

export async function getUser(id: string) {
  const response = await fetch(API_BASE + '/users/' + id);
  const data = await response.json();
  return { data: data };
}

export async function createUser(data: any) {
  const response = await fetch(API_BASE + '/users', {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(data)
  });
  const result = await response.json();
  return { data: result };
}

export async function updateUser(id: string, data: any) {
  const response = await fetch(API_BASE + '/users/' + id, {
    method: 'PATCH',
    headers: defaultHeaders,
    body: JSON.stringify(data)
  });
  const result = await response.json();
  return { data: result };
}

export async function deleteUser(id: string) {
  const response = await fetch(API_BASE + '/users/' + id, {
    method: 'DELETE'
  });
  const result = await response.json();
  return { data: result };
}

export async function getShoppingLists() {
  const response = await fetch(API_BASE + '/shoppingLists');
  const data = await response.json();
  return { data: data };
}

export async function getShoppingList(id: string) {
  const response = await fetch(API_BASE + '/shoppingLists/' + id);
  const data = await response.json();
  return { data: data };
}

export async function createShoppingList(data: any) {
  const response = await fetch(API_BASE + '/shoppingLists', {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(data)
  });
  const result = await response.json();
  return { data: result };
}

export async function updateShoppingList(id: string, data: any) {
  const response = await fetch(API_BASE + '/shoppingLists/' + id, {
    method: 'PATCH',
    headers: defaultHeaders,
    body: JSON.stringify(data)
  });
  const result = await response.json();
  return { data: result };
}

export async function deleteShoppingList(id: string) {
  const response = await fetch(API_BASE + '/shoppingLists/' + id, {
    method: 'DELETE'
  });
  const result = await response.json();
  return { data: result };
}

export async function getShoppingListsByUser(userId: string) {
  const response = await fetch(API_BASE + '/shoppingLists?userId=' + userId);
  const data = await response.json();
  return { data: data };
}

export async function getShoppingItems() {
  const response = await fetch(API_BASE + '/shoppingItems');
  const data = await response.json();
  return { data: data };
}

export async function getShoppingItem(id: string) {
  const response = await fetch(API_BASE + '/shoppingItems/' + id);
  const data = await response.json();
  return { data: data };
}

export async function createShoppingItem(data: any) {
  const response = await fetch(API_BASE + '/shoppingItems', {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(data)
  });
  const result = await response.json();
  return { data: result };
}

export async function updateShoppingItem(id: string, data: any) {
  const response = await fetch(API_BASE + '/shoppingItems/' + id, {
    method: 'PATCH',
    headers: defaultHeaders,
    body: JSON.stringify(data)
  });
  const result = await response.json();
  return { data: result };
}

export async function deleteShoppingItem(id: string) {
  const response = await fetch(API_BASE + '/shoppingItems/' + id, {
    method: 'DELETE'
  });
  const result = await response.json();
  return { data: result };
}

export async function getShoppingItemsByList(listId: string) {
  const response = await fetch(API_BASE + '/shoppingItems?listId=' + listId);
  const data = await response.json();
  return { data: data };
}

export const api = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getShoppingLists,
  getShoppingList,
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
  getShoppingListsByUser,
  getShoppingItems,
  getShoppingItem,
  createShoppingItem,
  updateShoppingItem,
  deleteShoppingItem,
  getShoppingItemsByList
};

export default api;