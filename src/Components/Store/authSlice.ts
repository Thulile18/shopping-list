import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, User, LoginCredentials, RegisterData } from '../Types';
import { encrypt, decrypt } from '../Utils/encryption';
import { getUsers, createUser, updateUser } from '../../API/jsonServer';
import { RootState } from './index';

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('shopping_token') || null,
  loading: false,
  error: null,
};

async function findUserByEmail(email: string): Promise<User | null> {
  const response = await getUsers();
  const users = response.data as User[];
  
  for (let i = 0; i < users.length; i = i + 1) {
    if (users[i].email === email) {
      return users[i];
    }
  }
  return null;
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async function (credentials: LoginCredentials, { rejectWithValue }) {
    try {
      const user = await findUserByEmail(credentials.email);
      if (user === null) {
        return rejectWithValue('User not found');
      }

      const decryptedPassword = decrypt(user.password);
      if (decryptedPassword !== credentials.password) {
        return rejectWithValue('Invalid password');
      }

      const token = btoa(user.id + ':' + Date.now());
      localStorage.setItem('shopping_token', token);
      
      return { user: user, token: token };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async function (data: RegisterData, { rejectWithValue }) {
    try {
      const existing = await findUserByEmail(data.email);
      if (existing !== null) {
        return rejectWithValue('Email already registered');
      }

      const encryptedPassword = encrypt(data.password);
      
      const newUser = {
        email: data.email,
        password: encryptedPassword,
        name: data.name,
        surname: data.surname,
        cellNumber: data.cellNumber,
      };

      const response = await createUser(newUser);
      const user = response.data as User;
      
      const token = btoa(user.id + ':' + Date.now());
      localStorage.setItem('shopping_token', token);
      
      return { user: user, token: token };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async function ({ id, data, currentUserId }: { id: string; data: Partial<User>; currentUserId: string }, { rejectWithValue }) {
    try {
      if (id !== currentUserId) {
        return rejectWithValue('You are not allowed to update this profile');
      }
      const response = await updateUser(id, data);
      return response.data as User;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Update failed');
    }
  }
);

export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async function ({ id, newPassword, currentUserId }: { id: string; newPassword: string; currentUserId: string }, { rejectWithValue }) {
    try {
      if (id !== currentUserId) {
        return rejectWithValue('You are not allowed to update this password');
      }
      const encrypted = encrypt(newPassword);
      const response = await updateUser(id, { password: encrypted });
      return response.data as User;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Password update failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logout: function (state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('shopping_token');
    },
    clearError: function (state) {
      state.error = null;
    },
  },
  extraReducers: function (builder) {
    builder
    
      .addCase(loginUser.pending, function (state) {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, function (state, action) {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, function (state, action) {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(registerUser.pending, function (state) {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, function (state, action) {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, function (state, action) {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(updateProfile.pending, function (state) {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, function (state, action) {
        state.loading = false;
        if (state.user !== null) {
          state.user = { ...state.user, ...action.payload };
        }
      })
      .addCase(updateProfile.rejected, function (state, action) {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(updatePassword.pending, function (state) {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, function (state, action) {
        state.loading = false;
        if (state.user !== null) {
          state.user.password = action.payload.password;
        }
      })
      .addCase(updatePassword.rejected, function (state, action) {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export function selectAuth(state: RootState) {
  return state.auth;
}

export function selectUser(state: RootState) {
  return state.auth.user;
}

export function selectToken(state: RootState) {
  return state.auth.token;
}

export function selectAuthLoading(state: RootState) {
  return state.auth.loading;
}

export function selectAuthError(state: RootState) {
  return state.auth.error;
}

export function selectIsAuthenticated(state: RootState) {
  if (state.auth.token) {
    return true;
  } else {
    return false;
  }
}

export default authSlice.reducer;
