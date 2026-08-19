import axios from 'axios';

const API_BASE = 'http://localhost:5000';

// Set up our primary configuration instance for our API communications
export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==========================================
// 1. USER BACKEND REQUESTS
// ==========================================

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

// ==========================================
// 2. SHOPPING LIST BACKEND REQUESTS
// ==========================================

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

// Export our main connection engine instance at the absolute bottom
export default api;