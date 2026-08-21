import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  setSearchTerm,
  setSortBy,
  setSortOrder,
  selectSearchTerm,
  selectSortBy,
  selectSortOrder,
} from '../Store/shoppingSlice';

function ShoppingListFilters() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);
  const [, setSearchParams] = useSearchParams();

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    dispatch(setSearchTerm(newValue));

    setSearchParams({
      search: newValue,
      sort: sortBy,
      order: sortOrder,
    });
  }

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = e.target.value;
    dispatch(setSortBy(newValue));

    setSearchParams({
      search: searchTerm,
      sort: newValue,
      order: sortOrder,
    });
  }

  function handleOrderChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = e.target.value;
    dispatch(setSortOrder(newValue));

    setSearchParams({
      search: searchTerm,
      sort: sortBy,
      order: newValue,
    });
  }

  return (
    <div className="filters-bar">
      
      <div className="search-box">
        <span> 🔍 </span>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="filter-group">
        <label> Sort by:</label>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="name"> Name </option>
          <option value="category"> Category </option>
          <option value="createdAt"> Date added </option>
        </select>
      </div>
      
      <div className="filter-group">
        <label> Order:</label>
        <select value={sortOrder} onChange={handleOrderChange}>
          <option value="asc"> Ascending </option>
          <option value="desc"> Descending </option>
        </select>
      </div>
      
    </div>
  );
}

export default ShoppingListFilters;
