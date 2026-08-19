import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { removeShoppingList } from '../../store/slices/shoppingSlice';
import Button from '../common/Button';

// Simple interface to layout our component parameter definitions
interface ShoppingListCardProps {
  item: {
    id: string;
    name: string;
    quantity: number;
    notes: string;
    category: string;
    image: string;
    createdAt: string;
  };
  onEdit: (item: any) => void;
}

function ShoppingListCard({ item, onEdit }: ShoppingListCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  // Explicit handler function to process item removal safely
  async function handleDelete() {
    const confirmation = window.confirm('Delete this item?');
    if (confirmation === true) {
      await dispatch(removeShoppingList(item.id));
    }
  }

  // Explicit handler function to pass the edit payload back up to parent container
  function handleEditClick() {
    onEdit(item);
  }

  return (
    <div className="list-item-card">
      {/* Item title display text */}
      <div className="item-name">{item.name}</div>
      
      {/* Structural metadata strip displaying inventory count and categories */}
      <div className="item-meta">
        <span>📦 Qty: {item.quantity}</span>
        <span className="tag" style={{ marginLeft: '10px' }}>{item.category}</span>
      </div>
      
      {/* Render descriptions conditionally if item contains optional text */}
      {item.notes ? (
        <div className="item-notes" style={{ marginTop: '5px' }}>📝 {item.notes}</div>
      ) : null}
      
      {/* Render optional item picture asset panel checks safely */}
      {item.image ? (
        <img src={item.image} alt={item.name} className="item-image" />
      ) : null}
      
      {/* Card action management triggers interface layout panel */}
      <div className="item-actions" style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
        <Button variant="warning" size="sm" onClick={handleEditClick}>
          ✏️ Edit
        </Button>
        <Button variant="danger" size="sm" onClick={handleDelete}>
          🗑️ Delete
        </Button>
      </div>
    </div>
  );
}

export default ShoppingListCard;