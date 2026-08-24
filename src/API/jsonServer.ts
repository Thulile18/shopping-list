import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function getUsers() {
  return api.get('/users');
}

export function getUser(id: string) {
  return api.get('/users/' + id);
}

export function createUser(data: any) {
  return api.post('/users', data);
}

export function updateUser(id: string, data: any) {
  return api.patch('/users/' + id, data);
}

export function deleteUser(id: string) {
  return api.delete('/users/' + id);
}

export function getShoppingLists() {
  return api.get('/shoppingLists');
}

export function getShoppingList(id: string) {
  return api.get('/shoppingLists/' + id);
}

export function createShoppingList(data: any) {
  return api.post('/shoppingLists', data);
}

export function updateShoppingList(id: string, data: any) {
  return api.patch('/shoppingLists/' + id, data);
}

export function deleteShoppingList(id: string) {
  return api.delete('/shoppingLists/' + id);
}

export function getShoppingListsByUser(userId: string) {
  return api.get('/shoppingLists?userId=' + userId);
}

export function getShoppingItems() {
  return api.get('/shoppingItems');
}

export function getShoppingItem(id: string) {
  return api.get('/shoppingItems/' + id);
}

export function createShoppingItem(data: any) {
  return api.post('/shoppingItems', data);
}

export function updateShoppingItem(id: string, data: any) {
  return api.patch('/shoppingItems/' + id, data);
}

export function deleteShoppingItem(id: string) {
  return api.delete('/shoppingItems/' + id);
}

export function getShoppingItemsByList(listId: string) {
  return api.get('/shoppingItems?listId=' + listId);
}

export default api;