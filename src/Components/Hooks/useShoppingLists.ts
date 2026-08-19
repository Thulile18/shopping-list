import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import {
  fetchUserLists,
  addShoppingList,
  editShoppingList,
  removeShoppingList,
  setSearchTerm,
  setSortBy,
  setSortOrder,
  selectItems,
  selectLoading,
  selectError,
  selectSearchTerm,
  selectSortBy,
  selectSortOrder,
  selectFilteredItems,
} from '../store/slices/shoppingSlice';

export function useShoppingLists(userId?: string) {
  const dispatch = useDispatch<AppDispatch>();
  
  // Read our shopping metrics from selectors
  const items = useSelector(selectItems);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const searchTerm = useSelector(selectSearchTerm);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);
  const filteredItems = useSelector(selectFilteredItems);

  // Automatically pull inventory values down from server when user ID loads
  useEffect(function () {
    if (userId) {
      dispatch(fetchUserLists(userId));
    }
  }, [userId, dispatch]);

  // Handler function to dispatch item creations
  async function addItem(data: {
    name: string;
    quantity: number;
    notes: string;
    category: string;
    image: string;
  }) {
    if (!userId) {
      return { success: false, error: 'No user ID' };
    }

    const resultAction = await dispatch(addShoppingList({ userId: userId, data: data }));
    
    if (addShoppingList.fulfilled.match(resultAction)) {
      return { success: true };
    } else {
      return { success: false, error: error };
    }
  }

  // Handler function to dispatch item variations
  async function editItem(id: string, data: Partial<{
    name: string;
    quantity: number;
    notes: string;
    category: string;
    image: string;
  }>) {
    const resultAction = await dispatch(editShoppingList({ id: id, data: data }));
    
    if (editShoppingList.fulfilled.match(resultAction)) {
      return { success: true };
    } else {
      return { success: false, error: error };
    }
  }

  // Handler function to dispatch deletions
  async function deleteItem(id: string) {
    const resultAction = await dispatch(removeShoppingList(id));
    
    if (removeShoppingList.fulfilled.match(resultAction)) {
      return { success: true };
    } else {
      return { success: false, error: error };
    }
  }

  // Helper trigger to pipe query tracking values to store
  function search(term: string) {
    dispatch(setSearchTerm(term));
  }

  // Helper trigger to pipe category sorting values to store
  function sort(by: string) {
    dispatch(setSortBy(by));
  }

  // Helper trigger to pipe directional arrangement choices to store
  function setOrder(order: string) {
    dispatch(setSortOrder(order));
  }

  // Return state maps and transactional parameters cleanly inside an object structure
  return {
    items: items,
    filteredItems: filteredItems,
    loading: loading,
    error: error,
    searchTerm: searchTerm,
    sortBy: sortBy,
    sortOrder: sortOrder,
    addItem: addItem,
    editItem: editItem,
    deleteItem: deleteItem,
    search: search,
    sort: sort,
    setOrder: setOrder,
  };
}