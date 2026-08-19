import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchTerm,
  setSortBy,
  setSortOrder,
  selectSearchTerm,
  selectSortBy,
  selectSortOrder,
} from '../../store/slices/shoppingSlice';

function ShoppingListFilters() {
  const dispatch = useDispatch();
  
  // Read current filter options from our central Redux state selectors
  const searchTerm = useSelector(selectSearchTerm);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);

  // Simple handler function to monitor search input box changes
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSearchTerm(e.target.value));
  }

  // Simple handler function to monitor sorting drop-down selection shifts
  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setSortBy(e.target.value));
  }

  // Simple handler function to monitor order selection dropdown changes
  function handleOrderChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setSortOrder(e.target.value));
  }

  return (
    <div className="filters-bar">
      
      {/* Dynamic Text Input Box for Filtering Items */}
      <div className="search-box">
        <span>🔍</span>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      {/* Category Sorter Parameter Setup Elements */}
      <div className="filter-group">
        <label>Sort by:</label>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="createdAt">Date added</option>
        </select>
      </div>
      
      {/* Sequential Direction Arrangement Selection Dropdown Elements */}
      <div className="filter-group">
        <label>Order:</label>
        <select value={sortOrder} onChange={handleOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      
    </div>
  );
}

export default ShoppingListFilters;