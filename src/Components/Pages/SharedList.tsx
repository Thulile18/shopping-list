import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getShoppingList } from '../../API/jsonServer';
import { ShoppingList } from '../Types';
import PageLayout from '../PageLayout';

function SharedList() {
  const { id } = useParams();
  const [list, setList] = useState<ShoppingList | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(function () {
    async function loadList() {
      if (!id) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      try {
        const response = await getShoppingList(id);
        setList(response.data as ShoppingList);
      } catch (error) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    loadList();
  }, [id]);

  if (loading) {
    return (
      <PageLayout>
        <div className="loading">Loading shared list...</div>
      </PageLayout>
    );
  }

  if (notFound || !list) {
    return (
      <PageLayout>
        <div className="empty-state">
          <p>This shared list could not be found. It may have been deleted.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="page-header">
        <h1>{list.name}</h1>
      </div>

      <div className="list-item-card">
        <div className="item-meta">
          <span> Qty: {list.quantity}</span>
          <span className="tag" style={{ marginLeft: '10px' }}>{list.category}</span>
        </div>

        {list.notes ? (
          <div className="item-notes" style={{ marginTop: '5px' }}> 📝 {list.notes}</div>
        ) : null}

        {list.image ? (
          <img src={list.image} alt={list.name} className="item-image" />
        ) : null}
      </div>

      <p className="text-muted" style={{ marginTop: '15px' }}>
        This is a shared, read-only view of a shopping list.
      </p>
    </PageLayout>
  );
}

export default SharedList;
