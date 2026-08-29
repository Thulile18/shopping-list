import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppDispatch } from '../Store';
import {
  fetchUserLists,
  addShoppingList,
  editShoppingList,
  removeShoppingList,
  shareShoppingList,
  setSearchTerm,
  setSortBy,
  setSortOrder,
  selectFilteredLists,
  selectLoading,
  selectSearchTerm,
  selectSortBy,
  selectSortOrder,
} from '../Store/shoppingSlice';
import { selectUser } from '../Store/authSlice';
import PageLayout from '../PageLayout';
import Button from '../Button';
import Input from '../Input';
import ShareModal from '../ShareModal';

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentUser = useSelector(selectUser);
  const lists = useSelector(selectFilteredLists);
  const loading = useSelector(selectLoading);
  const searchTerm = useSelector(selectSearchTerm);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingList, setEditingList] = useState<any>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState('');
  const [shareTargetId, setShareTargetId] = useState<string | null>(null);

  useEffect(function () {
    if (currentUser) {
      dispatch(fetchUserLists(currentUser.id));
    }
  }, [currentUser, dispatch]);

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
    setEditingList(null);
    setName('');
    setCategory('');
    setNotes('');
    setImage('');
    setIsFormOpen(true);
  }

  function openEditForm(list: any) {
    setEditingList(list);
    setName(list.name);
    setCategory(list.category);
    setNotes(list.notes);
    setImage(list.image);
    setIsFormOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!currentUser) {
      return;
    }

    const data = {
      name: name.trim(),
      category: category.trim(),
      notes: notes.trim(),
      image: image.trim(),
      sharedWith: editingList ? editingList.sharedWith : [],
    };

    if (editingList) {
      await dispatch(editShoppingList({ id: editingList.id, data: data, currentUserId: currentUser.id }));
    } else {
      await dispatch(addShoppingList({ userId: currentUser.id, data: data }));
    }
    setIsFormOpen(false);
  }

  async function handleDelete(id: string) {
    if (!currentUser) {
      return;
    }
    const confirmation = window.confirm('Delete this shopping list category?');
    if (confirmation === true) {
      await dispatch(removeShoppingList({ id: id, currentUserId: currentUser.id }));
    }
  }

  function handleShareEmail(email: string) {
    const list = lists.find(function (l) {
      return l.id === shareTargetId;
    });
    if (list) {
      dispatch(shareShoppingList({ id: list.id, email: email, currentSharedWith: list.sharedWith }));
    }
  }

  const shareTargetList = lists.find(function (l) {
    return l.id === shareTargetId;
  });

  // Group the lists by their category, so each category shows as its own section
  const groupedByCategory: Record<string, typeof lists> = {};
  lists.forEach(function (list) {
    const key = list.category.trim() === '' ? 'Uncategorized' : list.category;
    if (!groupedByCategory[key]) {
      groupedByCategory[key] = [];
    }
    groupedByCategory[key].push(list);
  });
  const categoryNames = Object.keys(groupedByCategory).sort();

  return (
    <PageLayout>
      <div className="page-header">
        <h1>My Shopping Lists</h1>
        <Button variant="primary" onClick={openAddForm}>+ New List</Button>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <span> 🔍 </span>
          <input
            type="text"
            placeholder="Search lists by name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="filter-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={handleSortChange}>
            <option value="name">Name</option>
            <option value="category">Category</option>
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

      {loading ? <div className="loading">Loading...</div> : null}

      {lists.length === 0 ? (
        <p className="text-muted">No shopping lists yet. Click "+ New List" to create one.</p>
      ) : null}

      {categoryNames.map(function (categoryName) {
        return (
          <div key={categoryName} style={{ marginBottom: '30px' }}>
            <h2 style={{ marginBottom: '15px' }}>{categoryName}</h2>
            <div className="list-grid">
              {groupedByCategory[categoryName].map(function (list) {
                return (
                  <div className="list-item-card" key={list.id}>
                    <div className="item-name" onClick={function () { navigate('/lists/' + list.id); }} style={{ cursor: 'pointer' }}>
                      {list.name}
                    </div>
                    <div className="item-meta">
                      <span className="tag">{list.category}</span>
                    </div>
                    {list.notes ? <div className="item-notes">📝 {list.notes}</div> : null}
                    {list.image ? <img src={list.image} alt={list.name} className="item-image" /> : null}

                    <div className="item-actions" style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                      <Button variant="primary" size="sm" onClick={function () { navigate('/lists/' + list.id); }}>Open</Button>
                      <Button variant="warning" size="sm" onClick={function () { openEditForm(list); }}>Edit</Button>
                      <Button variant="outline" size="sm" onClick={function () { setShareTargetId(list.id); }}>Share</Button>
                      <Button variant="danger" size="sm" onClick={function () { handleDelete(list.id); }}>Delete</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {isFormOpen ? (
        <div className="modal-overlay" onClick={function () { setIsFormOpen(false); }}>
          <div className="modal-box" onClick={function (e) { e.stopPropagation(); }}>
            <div className="modal-header">
              <h3>{editingList ? 'Edit List' : 'New Shopping List'}</h3>
              <button className="modal-close" type="button" onClick={function () { setIsFormOpen(false); }}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <Input label="List Name" value={name} onChange={function (e) { setName(e.target.value); }} required />
              <Input label="Category" value={category} onChange={function (e) { setCategory(e.target.value); }} required />
              <Input label="Notes (optional)" value={notes} onChange={function (e) { setNotes(e.target.value); }} />
              <Input label="Image URL (optional)" value={image} onChange={function (e) { setImage(e.target.value); }} />
              <Button type="submit" variant="primary" block>Save</Button>
            </form>
          </div>
        </div>
      ) : null}

      {shareTargetList ? (
        <ShareModal
          isOpen={true}
          onClose={function () { setShareTargetId(null); }}
          listId={shareTargetList.id}
          listName={shareTargetList.name}
          sharedWith={shareTargetList.sharedWith}
          onShareEmail={handleShareEmail}
        />
      ) : null}
    </PageLayout>
  );
}

export default Home;