import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../Store';
import { removeShoppingList, shareShoppingList } from '../Store/shoppingSlice';
import { selectUser } from '../Store/authSlice';
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
  const currentUser = useSelector(selectUser);
  const [isShareOpen, setIsShareOpen] = useState(false);
    async function handleDelete() {
    const confirmation = window.confirm('Delete this item?');
    if (confirmation === true && currentUser) {
      await dispatch(removeShoppingList({ id: item.id, currentUserId: currentUser.id }));
    }
  }
    function handleEditClick() {
    onEdit(item);
  }

  function handleShareEmail(email: string) {
    dispatch(shareShoppingList({ id: item.id, email: email, currentSharedWith: item.sharedWith }));
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
        <Button variant="outline" size="sm" onClick={function () { setIsShareOpen(true); }}>
            Share
        </Button>
        <Button variant="danger" size="sm" onClick={handleDelete}>
            Delete
        </Button>
      </div>

      <ShareModal
        isOpen={isShareOpen}
        onClose={function () { setIsShareOpen(false); }}
        listId={item.id}
        listName={item.name}
        sharedWith={item.sharedWith}
        onShareEmail={handleShareEmail}
      />
    </div>
  );
}

export default ShoppingItem;
