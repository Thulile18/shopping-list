import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ShoppingState, ShoppingList, ShoppingListInput, ShoppingItem, ShoppingItemInput } from '../Types';
import {
  getShoppingListsByUser,
  getShoppingList,
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
  getShoppingItemsByList,
  createShoppingItem,
  updateShoppingItem,
  deleteShoppingItem,
} from '../../API/jsonServer';
import { RootState } from './index';

const initialState: ShoppingState = {
  lists: [],
  items: [],
  loading: false,
  error: null,
  searchTerm: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

// ===== LIST (CATEGORY) THUNKS =====

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
  'shopping/addList',
  async function ({ userId, data }: { userId: string; data: ShoppingListInput }, { rejectWithValue }) {
    try {
      const newList = {
        userId: userId,
        name: data.name,
        category: data.category,
        notes: data.notes,
        image: data.image,
        createdAt: new Date().toISOString(),
        sharedWith: data.sharedWith,
      };
      const response = await createShoppingList(newList);
      return response.data as ShoppingList;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add list');
    }
  }
);

export const editShoppingList = createAsyncThunk(
  'shopping/editList',
  async function ({ id, data, currentUserId }: { id: string; data: Partial<ShoppingListInput>; currentUserId: string }, { rejectWithValue }) {
    try {
      const existingList = await getShoppingList(id);
      if (existingList.data.userId !== currentUserId) {
        return rejectWithValue('You are not allowed to edit this list');
      }
      const response = await updateShoppingList(id, data);
      return response.data as ShoppingList;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update list');
    }
  }
);

export const removeShoppingList = createAsyncThunk(
  'shopping/removeList',
  async function ({ id, currentUserId }: { id: string; currentUserId: string }, { rejectWithValue }) {
    try {
      const existingList = await getShoppingList(id);
      if (existingList.data.userId !== currentUserId) {
        return rejectWithValue('You are not allowed to delete this list');
      }
      await deleteShoppingList(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete list');
    }
  }
);

export const shareShoppingList = createAsyncThunk(
  'shopping/share',
  async function ({ id, email, currentSharedWith }: { id: string; email: string; currentSharedWith: string[] }, { rejectWithValue }) {
    try {
      if (currentSharedWith.includes(email)) {
        return rejectWithValue('Already shared with this email');
      }
      const updatedSharedWith = [...currentSharedWith, email];
      const response = await updateShoppingList(id, { sharedWith: updatedSharedWith });
      return response.data as ShoppingList;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to share list');
    }
  }
);

// ===== ITEM THUNKS =====

export const fetchListItems = createAsyncThunk(
  'shopping/fetchListItems',
  async function (listId: string, { rejectWithValue }) {
    try {
      const response = await getShoppingItemsByList(listId);
      return response.data as ShoppingItem[];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch items');
    }
  }
);

export const addShoppingItem = createAsyncThunk(
  'shopping/addItem',
  async function (data: ShoppingItemInput, { rejectWithValue }) {
    try {
      const newItem = {
        listId: data.listId,
        name: data.name,
        quantity: data.quantity,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      const response = await createShoppingItem(newItem);
      return response.data as ShoppingItem;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add item');
    }
  }
);

export const editShoppingItem = createAsyncThunk(
  'shopping/editItem',
  async function ({ id, data }: { id: string; data: Partial<ShoppingItemInput> }, { rejectWithValue }) {
    try {
      const response = await updateShoppingItem(id, data);
      return response.data as ShoppingItem;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update item');
    }
  }
);

export const toggleItemCompleted = createAsyncThunk(
  'shopping/toggleItem',
  async function ({ id, completed }: { id: string; completed: boolean }, { rejectWithValue }) {
    try {
      const response = await updateShoppingItem(id, { completed: completed });
      return response.data as ShoppingItem;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update item');
    }
  }
);

export const removeShoppingItem = createAsyncThunk(
  'shopping/removeItem',
  async function (id: string, { rejectWithValue }) {
    try {
      await deleteShoppingItem(id);
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
    setSearchTerm: function (state, action) {
      state.searchTerm = action.payload;
    },
    setSortBy: function (state, action) {
      state.sortBy = action.payload;
    },
    setSortOrder: function (state, action) {
      state.sortOrder = action.payload;
    },
    clearError: function (state) {
      state.error = null;
    },
    clearShoppingState: function (state) {
      state.lists = [];
      state.items = [];
      state.searchTerm = '';
      state.error = null;
    },
  },
  extraReducers: function (builder) {
    builder
      // Lists
      .addCase(fetchUserLists.pending, function (state) {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserLists.fulfilled, function (state, action) {
        state.loading = false;
        state.lists = action.payload;
      })
      .addCase(fetchUserLists.rejected, function (state, action) {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addShoppingList.fulfilled, function (state, action) {
        state.lists.push(action.payload);
      })

      .addCase(editShoppingList.fulfilled, function (state, action) {
        for (let i = 0; i < state.lists.length; i = i + 1) {
          if (state.lists[i].id === action.payload.id) {
            state.lists[i] = action.payload;
          }
        }
      })
      .addCase(editShoppingList.rejected, function (state, action) {
        state.error = action.payload as string;
      })

      .addCase(removeShoppingList.fulfilled, function (state, action) {
        state.lists = state.lists.filter(function (list) {
          return list.id !== action.payload;
        });
      })
      .addCase(removeShoppingList.rejected, function (state, action) {
        state.error = action.payload as string;
      })

      .addCase(shareShoppingList.fulfilled, function (state, action) {
        for (let i = 0; i < state.lists.length; i = i + 1) {
          if (state.lists[i].id === action.payload.id) {
            state.lists[i] = action.payload;
          }
        }
      })
      .addCase(shareShoppingList.rejected, function (state, action) {
        state.error = action.payload as string;
      })

      // Items
      .addCase(fetchListItems.pending, function (state) {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListItems.fulfilled, function (state, action) {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchListItems.rejected, function (state, action) {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addShoppingItem.fulfilled, function (state, action) {
        state.items.push(action.payload);
      })

      .addCase(editShoppingItem.fulfilled, function (state, action) {
        for (let i = 0; i < state.items.length; i = i + 1) {
          if (state.items[i].id === action.payload.id) {
            state.items[i] = action.payload;
          }
        }
      })

      .addCase(toggleItemCompleted.fulfilled, function (state, action) {
        for (let i = 0; i < state.items.length; i = i + 1) {
          if (state.items[i].id === action.payload.id) {
            state.items[i] = action.payload;
          }
        }
      })

      .addCase(removeShoppingItem.fulfilled, function (state, action) {
        state.items = state.items.filter(function (item) {
          return item.id !== action.payload;
        });
      });
  },
});

export const { setSearchTerm, setSortBy, setSortOrder, clearError, clearShoppingState } = shoppingSlice.actions;

export function selectLists(state: RootState) {
  return state.shopping.lists;
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

export function selectFilteredLists(state: RootState) {
  let result = state.shopping.lists.filter(function (list) {
    return list.name.toLowerCase().includes(state.shopping.searchTerm.toLowerCase());
  });

  result = result.slice().sort(function (a: any, b: any) {
    const sortBy = state.shopping.sortBy;
    let valueA = a[sortBy];
    let valueB = b[sortBy];
    if (typeof valueA === 'string') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }
    if (valueA < valueB) {
      return state.shopping.sortOrder === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return state.shopping.sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return result;
}

export function selectFilteredItems(state: RootState) {
  let result = state.shopping.items.filter(function (item) {
    return item.name.toLowerCase().includes(state.shopping.searchTerm.toLowerCase());
  });

  result = result.slice().sort(function (a: any, b: any) {
    const sortBy = state.shopping.sortBy;
    let valueA = a[sortBy];
    let valueB = b[sortBy];
    if (typeof valueA === 'string') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }
    if (valueA < valueB) {
      return state.shopping.sortOrder === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return state.shopping.sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return result;
}

export default shoppingSlice.reducer;