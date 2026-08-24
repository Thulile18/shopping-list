import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Store';
import { removeShoppingList, shareShoppingList } from '../Store/shoppingSlice';
import Button from '../Button';
import ShareModal from '../ShareModal';

interface ShoppingItemProps {
  item: {
    id: string;
    name: string;
    quantity: number;
    notes: string;
    category: string;
    image: string;
    createdAt: string;
    sharedWith: string[];
  };
  onEdit: (item: any) => void;
}

function ShoppingItem({ item, onEdit }: ShoppingItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isShareOpen, setIsShareOpen] = useState(false);
  async function handleDelete() {
    const confirmation = window.confirm('Delete this item?');
    if (confirmation === true) {
      await dispatch(removeShoppingList(item.id));
    }
  }

  function handleEditClick() {
    onEdit(item);
  }

  return (
    <div className="list-item-card">
      <div className="item-name">{item.name}</div>
      
      <div className="item-meta">
        <span> Qty: {item.quantity}</span>
        <span className="tag" style={{ marginLeft: '10px' }}>{item.category}</span>
      </div>
      
      {item.notes ? (
        <div className="item-notes" style={{ marginTop: '5px' }}>📝 {item.notes}</div>
      ) : null}
    
      {item.image ? (
        <img src={item.image} alt={item.name} className="item-image" />
      ) : null}
      
      <div className="item-actions" style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
        <Button variant="warning" size="sm" onClick={handleEditClick}>
            Edit
        </Button>
        <Button variant="danger" size="sm" onClick={handleDelete}>
            Delete
        </Button>
      </div>
    </div>
  );
}

export default ShoppingItem;
