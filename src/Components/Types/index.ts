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
  quantity: number;
  notes: string;
  category: string;
  image: string;
  createdAt: string;
  sharedWith: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface ShoppingState {
  items: ShoppingList[];
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

export interface ShoppingListInput {
  name: string;
  quantity: number;
  notes: string;
  category: string;
  image: string;
  sharedWith: string[];
}
