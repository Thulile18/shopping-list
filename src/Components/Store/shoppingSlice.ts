import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ShoppingState, ShoppingList, ShoppingListInput } from '../Types';
import {
  getShoppingListsByUser,
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
} from '../../API/jsonServer';
import { RootState } from './index';

const initialState: ShoppingState = {
  items: [],
  loading: false,
  error: null,
  searchTerm: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

export const fetchUserLists = createAsyncThunk(
  'shopping/fetchUserLists',
  async function (userId: string, { rejectWithValue }) {
    try {
      const response = await getShoppingListsByUser(userId);
      return response.data as ShoppingList[];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch lists');
    }
  }
);

export const addShoppingList = createAsyncThunk(
  'shopping/add',
  async function ({ userId, data }: { userId: string; data: ShoppingListInput }, { rejectWithValue }) {
    try {
    
      const newItem = {
        userId: userId,
        name: data.name,
        quantity: data.quantity,
        notes: data.notes,
        category: data.category,
        image: data.image,
        createdAt: new Date().toISOString(),
      };
      const response = await createShoppingList(newItem);
      return response.data as ShoppingList;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add item');
    }
  }
);

export const editShoppingList = createAsyncThunk(
  'shopping/edit',
  async function ({ id, data }: { id: string; data: Partial<ShoppingListInput> }, { rejectWithValue }) {
    try {
      const response = await updateShoppingList(id, data);
      return response.data as ShoppingList;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update item');
    }
  }
);

export const removeShoppingList = createAsyncThunk(
  'shopping/remove',
  async function (id: string, { rejectWithValue }) {
    try {
      await deleteShoppingList(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete item');
    }
  }
);

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState: initialState,
  reducers: {
    setSearchTerm: function (state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setSortBy: function (state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
    setSortOrder: function (state, action: PayloadAction<string>) {
      state.sortOrder = action.payload;
    },
    clearError: function (state) {
      state.error = null;
    },
  },
  extraReducers: function (builder) {
    builder
      
      .addCase(fetchUserLists.pending, function (state) {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserLists.fulfilled, function (state, action) {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserLists.rejected, function (state, action) {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(addShoppingList.pending, function (state) {
        state.loading = true;
        state.error = null;
      })
      .addCase(addShoppingList.fulfilled, function (state, action) {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addShoppingList.rejected, function (state, action) {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(editShoppingList.pending, function (state) {
        state.loading = true;
        state.error = null;
      })
      .addCase(editShoppingList.fulfilled, function (state, action) {
        state.loading = false;
        
        for (let i = 0; i < state.items.length; i = i + 1) {
          if (state.items[i].id === action.payload.id) {
            state.items[i] = action.payload;
          }
        }
      })
      .addCase(editShoppingList.rejected, function (state, action) {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(removeShoppingList.pending, function (state) {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeShoppingList.fulfilled, function (state, action) {
        state.loading = false;
        
        const freshItemsList: ShoppingList[] = [];
        for (let j = 0; j < state.items.length; j = j + 1) {
          if (state.items[j].id !== action.payload) {
            freshItemsList.push(state.items[j]);
          }
        }
        state.items = freshItemsList;
      })
      .addCase(removeShoppingList.rejected, function (state, action) {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchTerm, setSortBy, setSortOrder, clearError } = shoppingSlice.actions;

export function selectShopping(state: RootState) {
  return state.shopping;
}

export function selectItems(state: RootState) {
  return state.shopping.items;
}

export function selectLoading(state: RootState) {
  return state.shopping.loading;
}

export function selectError(state: RootState) {
  return state.shopping.error;
}

export function selectSearchTerm(state: RootState) {
  return state.shopping.searchTerm;
}

export function selectSortBy(state: RootState) {
  return state.shopping.sortBy;
}

export function selectSortOrder(state: RootState) {
  return state.shopping.sortOrder;
}

export function selectFilteredItems(state: RootState) {
  const items = state.shopping.items;
  const searchTerm = state.shopping.searchTerm;
  const sortBy = state.shopping.sortBy;
  const sortOrder = state.shopping.sortOrder;
  
  const filtered = items.filter(function (item) {
    const regularName = item.name.toLowerCase();
    const lookForName = searchTerm.toLowerCase();
    return regularName.includes(lookForName);
  });
  
  filtered.sort(function (a, b) {
    let comparison = 0;
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'category') {
      comparison = a.category.localeCompare(b.category);
    } else {
      comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    
    if (sortOrder === 'asc') {
      return comparison;
    } else {
      return -comparison;
    }
  });
  
  return filtered;
}

export default shoppingSlice.reducer;
