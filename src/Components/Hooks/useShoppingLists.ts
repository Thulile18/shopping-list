import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../Store';
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
} from '../Store/shoppingSlice';

export function useShoppingLists(userId?: string) {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector(selectItems);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const searchTerm = useSelector(selectSearchTerm);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);
  const filteredItems = useSelector(selectFilteredItems);

  useEffect(function () {
    if (userId) {
      dispatch(fetchUserLists(userId));
    }
  }, [userId, dispatch]);

    async function addItem(data: {
            name: string;
        quantity: number;
           notes: string;
        category: string;
           image: string;
      sharedWith: string[];
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

  async function deleteItem(id: string) {
    const resultAction = await dispatch(removeShoppingList(id));
    
    if (removeShoppingList.fulfilled.match(resultAction)) {
      return { success: true };
    } else {
      return { success: false, error: error };
    }
  }
  function search(term: string) {
    dispatch(setSearchTerm(term));
  }

  function sort(by: string) {
    dispatch(setSortBy(by));
  }
  
  function setOrder(order: string) {
    dispatch(setSortOrder(order));
  }

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
