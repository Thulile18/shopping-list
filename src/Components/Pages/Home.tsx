import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../Store/authSlice';
import { useShoppingLists } from '../Hooks/useShoppingLists';
import Button from '../Button';
import PageLayout from '../PageLayout';
import ShoppingListFilters from '../Lists/ShoppingListFilters';
import ShoppingItem from '../Items/ShoppingItem';
import ShoppingItemForm from '../Items/ShoppingItemForm';

function Home() {
  const user = useSelector(selectUser);
  const [searchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const { filteredItems, loading, searchTerm, search, sort, setOrder } =
    useShoppingLists(user?.id);

  useEffect(function () {
    const searchParam = searchParams.get('search') || '';
    const sortParam = searchParams.get('sort') || 'createdAt';
    const orderParam = searchParams.get('order') || 'desc';

    if (searchParam !== '') {
      search(searchParam);
    }
    
    sort(sortParam);
    setOrder(orderParam);
  }, [searchParams]);

  function openAddModal() {
    setEditingItem(null);
    setShowModal(true);
  }

  function openEditModal(item: any) {
    setEditingItem(item);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingItem(null);
  }

  if (user === null || user === undefined) {
    return (
      <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>
        Please log in.
      </div>
    );
  }

  return (
    <PageLayout>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>My Shopping List</h1>
        <Button variant="primary" onClick={openAddModal}>
          + Add Item
        </Button>
      </div>

      <ShoppingListFilters />

      <p style={{ margin: '10px 0', color: '#718096' }}>
        Total: {filteredItems.length} items found
      </p>

      {loading === true ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
      ) : filteredItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '8px' }}>
          <p>
            {searchTerm !== ''
              ? 'No items match your search'
              : 'Your shopping list is empty. Add some items!'}
          </p>
        </div>
      ) : (
        <div className="list-grid">
          {filteredItems.map(function (item) {
            return (
              <ShoppingItem 
                key={item.id} 
                item={item} 
                onEdit={openEditModal} 
              />
            );
          })}
        </div>
      )}

      <ShoppingItemForm
        isOpen={showModal}
        onClose={closeModal}
        editingItem={editingItem}
        userId={user.id}
      />
    </PageLayout>
  );
}

export default Home;
