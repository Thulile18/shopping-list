export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  cellNumber: string;
}
export interface ShoppingList {
  id: string;
  userId: string;
  name: string;
  category: string;
  notes: string;
  image: string;
  createdAt: string;
  sharedWith: string[];
}
export interface ShoppingListInput {
  name: string;
  category: string;
  notes: string;
  image: string;
  sharedWith: string[];
}
export interface ShoppingItem {
  id: string;
  listId: string;
  name: string;
  quantity: number;
  image: string;
  completed: boolean;
  createdAt: string;
}
export interface ShoppingItemInput {
  listId: string;
  name: string;
  quantity: number;
  image: string;
  completed: boolean;
}
export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
export interface ShoppingState {
  lists: ShoppingList[];
  items: ShoppingItem[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  sortBy: string;
  sortOrder: string;
}
export interface LoginCredentials {
  email: string;
  password: string;
}
export interface RegisterData {
  email: string;
  password: string;
  name: string;
  surname: string;
  cellNumber: string;
}