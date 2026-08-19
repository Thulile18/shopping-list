import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';
import { useShoppingLists } from '../hooks/useShoppingLists';
import Button from '../components/common/Button';
import PageLayout from '../components/common/PageLayout';
import ShoppingListFilters from '../components/lists/ShoppingListFilters';
import ShoppingItem from '../components/items/ShoppingItem';
import ShoppingItemForm from '../components/items/ShoppingItemForm';

function Home() {
  const user = useSelector(selectUser);
  const [searchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Pull functions and arrays straight out of our custom hooks
  const { filteredItems, loading, searchTerm, search, sort, setOrder } =
    useShoppingLists(user?.id);

  // Sync address query parameters straight to local helper functions
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

  // Handle open actions for adding items
  function openAddModal() {
    setEditingItem(null);
    setShowModal(true);
  }

  // Handle open actions for editing items
  function openEditModal(item: any) {
    setEditingItem(item);
    setShowModal(true);
  }

  // Handle closed actions for the popup window
  function closeModal() {
    setShowModal(false);
    setEditingItem(null);
  }

  // Stop page construction if no profile data exists
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

      {/* Render sub-component handling input fields filter row */}
      <ShoppingListFilters />

      <p style={{ margin: '10px 0', color: '#718096' }}>
        Total: {filteredItems.length} items found
      </p>

      {/* Primary list view loading condition blocks */}
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

      {/* Floating item form modal layer layout block */}
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
