import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../Store';
import {
  fetchListItems,
  addShoppingItem,
  editShoppingItem,
  removeShoppingItem,
  toggleItemCompleted,
  shareShoppingList,
  setSearchTerm,
  setSortBy,
  setSortOrder,
  selectFilteredItems,
  selectLoading,
  selectSearchTerm,
  selectSortBy,
  selectSortOrder,
} from '../Store/shoppingSlice';
import { getShoppingList } from '../../API/jsonServer';
import { ShoppingList } from '../Types';
import PageLayout from '../PageLayout';
import Button from '../Button';
import Input from '../Input';
import ShareModal from '../ShareModal';

function ListDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();

  const items = useSelector(selectFilteredItems);
  const loading = useSelector(selectLoading);
  const searchTerm = useSelector(selectSearchTerm);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);

  const [list, setList] = useState<ShoppingList | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('1');
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(function () {
    async function loadList() {
      if (!id) {
        return;
      }
      const response = await getShoppingList(id);
      setList(response.data as ShoppingList);
    }
    loadList();
    if (id) {
      dispatch(fetchListItems(id));
    }
  }, [id, dispatch]);

    useEffect(function () {
    const urlSearch = searchParams.get('search') || '';
    const urlSort = searchParams.get('sort') || 'createdAt';
    const urlOrder = searchParams.get('order') || 'desc';
    dispatch(setSearchTerm(urlSearch));
    dispatch(setSortBy(urlSort));
    dispatch(setSortOrder(urlOrder));
  }, [searchParams]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    dispatch(setSearchTerm(newValue));
    setSearchParams({ search: newValue, sort: sortBy, order: sortOrder });
  }

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = e.target.value;
    dispatch(setSortBy(newValue));
    setSearchParams({ search: searchTerm, sort: newValue, order: sortOrder });
  }

  function handleOrderChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = e.target.value;
    dispatch(setSortOrder(newValue));
    setSearchParams({ search: searchTerm, sort: sortBy, order: newValue });
  }

  function openAddForm() {
    setEditingItem(null);
    setItemName('');
    setItemQuantity('1');
    setIsFormOpen(true);
  }

  function openEditForm(item: any) {
    setEditingItem(item);
    setItemName(item.name);
    setItemQuantity(String(item.quantity));
    setIsFormOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) {
      return;
    }

    if (editingItem) {
      await dispatch(editShoppingItem({
        id: editingItem.id,
        data: { name: itemName.trim(), quantity: Number(itemQuantity) || 1 },
      }));
    } else {
      await dispatch(addShoppingItem({
        listId: id,
        name: itemName.trim(),
        quantity: Number(itemQuantity) || 1,
        completed: false,
      }));
    }
    setIsFormOpen(false);
  }

  async function handleDelete(itemId: string) {
    const confirmation = window.confirm('Delete this item?');
    if (confirmation === true) {
      await dispatch(removeShoppingItem(itemId));
    }
  }

  function handleToggle(item: any) {
    dispatch(toggleItemCompleted({ id: item.id, completed: !item.completed }));
  }

  function handleShareEmail(email: string) {
    if (list) {
      dispatch(shareShoppingList({ id: list.id, email: email, currentSharedWith: list.sharedWith }));
    }
  }

  if (!list) {
    return (
      <PageLayout>
        <div className="loading">Loading list...</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="page-header">
        <div>
          <Button variant="outline" size="sm" onClick={function () { navigate('/'); }}>← Back to Dashboard</Button>
          <h1>{list.name}</h1>
          <span className="tag">{list.category}</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="outline" onClick={function () { setIsShareOpen(true); }}>Share</Button>
          <Button variant="primary" onClick={openAddForm}>+ Add Item</Button>
        </div>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <span> 🔍 </span>
          <input
            type="text"
            placeholder="Search items by name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="filter-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={handleSortChange}>
            <option value="name">Name</option>
            <option value="createdAt">Date added</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Order:</label>
          <select value={sortOrder} onChange={handleOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {loading ? <div className="loading">Loading items...</div> : null}

      <div className="list-grid">
        {items.map(function (item) {
          return (
            <div className="list-item-card" key={item.id}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" checked={item.completed} onChange={function () { handleToggle(item); }} />
                <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                  {item.name}
                </span>
              </label>
              <div className="item-meta">
                <span> Qty: {item.quantity}</span>
              </div>
              <div className="item-actions" style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                <Button variant="warning" size="sm" onClick={function () { openEditForm(item); }}>Edit</Button>
                <Button variant="danger" size="sm" onClick={function () { handleDelete(item.id); }}>Delete</Button>
              </div>
            </div>
          );
        })}
      </div>

      {isFormOpen ? (
        <div className="modal-overlay" onClick={function () { setIsFormOpen(false); }}>
          <div className="modal-box" onClick={function (e) { e.stopPropagation(); }}>
            <div className="modal-header">
              <h3>{editingItem ? 'Edit Item' : 'New Item'}</h3>
              <button className="modal-close" type="button" onClick={function () { setIsFormOpen(false); }}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <Input label="Item Name" value={itemName} onChange={function (e) { setItemName(e.target.value); }} required />
              <Input label="Quantity" type="number" min="1" value={itemQuantity} onChange={function (e) { setItemQuantity(e.target.value); }} required />
              <Button type="submit" variant="primary" block>Save</Button>
            </form>
          </div>
        </div>
      ) : null}

      <ShareModal
        isOpen={isShareOpen}
        onClose={function () { setIsShareOpen(false); }}
        listId={list.id}
        listName={list.name}
        sharedWith={list.sharedWith}
        onShareEmail={handleShareEmail}
      />
    </PageLayout>
  );
}

export default ListDetail;
