import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Store';
import { addShoppingList, editShoppingList } from '../Store/shoppingSlice';
import Button from '../Button';
import Input from '../Input';

interface ShoppingItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem: any | null;
  userId: string;
}

function ShoppingItemForm({ isOpen, onClose, editingItem, userId }: ShoppingItemFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const categories = ['Groceries', 'Electronics', 'Clothing', 'Home', 'Health', 'Other'];
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('Groceries');
  const [image, setImage] = useState('');

  useEffect(function () {
    if (editingItem !== null && editingItem !== undefined) {
      setName(editingItem.name);
      setQuantity(editingItem.quantity);
      setNotes(editingItem.notes || '');
      setCategory(editingItem.category);
      setImage(editingItem.image || '');
    } else {
      setName('');
      setQuantity(1);
      setNotes('');
      setCategory('Groceries');
      setImage('');
    }
  }, [editingItem]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (name.trim() === '') {
      alert('Please enter an item name');
      return;
    }

        const data = {
               name: name.trim(),
           quantity: Number(quantity) || 1,
              notes: notes.trim(),
           category: category,
              image: image.trim(),
         sharedWith: editingItem ? editingItem.sharedWith : [],
    };

    if (editingItem) {
      const resultAction = await dispatch(editShoppingList({ id: editingItem.id, data: data }));
      if (editShoppingList.fulfilled.match(resultAction)) {
        onClose();
      }
    } else {
      const resultAction = await dispatch(addShoppingList({ userId: userId, data: data }));
      if (addShoppingList.fulfilled.match(resultAction)) {
        onClose();
      }
    }
  }

  if (isOpen === false) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={function (e) { e.stopPropagation(); }}>
        
        <div className="modal-header">
          <h3>{editingItem !== null ? 'Edit Item' : 'Add New Item'}</h3>
          <button className="modal-close" type="button" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Item Name *"
            value={name}
            onChange={function (e) { setName(e.target.value); }}
            placeholder="e.g. Milk"
            required
          />
          
          <Input
            label="Quantity"
            type="number"
            min="1"
            value={String(quantity)}
            onChange={function (e) { setQuantity(Number(e.target.value) || 1); }}
          />

          <div className="form-group">
            <label>Category</label>
            <select
              className="form-control"
              value={category}
              onChange={function (e) { setCategory(e.target.value); }}
            >
              {categories.map(function (cat) {
                return (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                );
              })}
            </select>
          </div>

          <Input
            label="Notes (optional)"
            value={notes}
            onChange={function (e) { setNotes(e.target.value); }}
            placeholder="Any extra details..."
          />

          <Input
            label="Image URL (optional)"
            value={image}
            onChange={function (e) { setImage(e.target.value); }}
            placeholder="https://example.com/image.jpg"
          />

          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
            <Button type="submit" variant="primary" block>
              {editingItem !== null ? 'Update Item' : 'Add Item'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default ShoppingItemForm;
