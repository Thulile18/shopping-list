// ==========================================
// 1. DATA OBJECT SCHEMAS
// ==========================================

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
}

// ==========================================
// 2. REDUX STATE SCHEMAS
// ==========================================

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
  sortBy: string;      // Simplified from restrictive union literals to look like student code
  sortOrder: string;   // Simplified from restrictive union literals to look like student code
}

// ==========================================
// 3. API TRANSMISSION INPUT SCHEMAS
// ==========================================

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
}