import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getShoppingList, getShoppingItemsByList, createShoppingItem, updateShoppingItem, deleteShoppingItem } from '../../API/jsonServer';
import { ShoppingList } from '../Types';
import PageLayout from '../PageLayout';
import Input from '../Input';
import Button from '../Button';

interface ListItem {
  id: string;
  listId: string;
  name: string;
  quantity: number;
  completed: boolean;
}

function SharedList() {
  
  const { id } = useParams();

  const [list, setList] = useState<ShoppingList | null>(null);
  const [items, setItems] = useState<ListItem[]>([]);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(function () {
    async function loadDataFromServer() {
      if (!id) {
        setHasError(true);
        setLoading(false);
        return;
      }

      try {
        const listData = await getShoppingList(id);
        setList(listData.data as ShoppingList);

        const itemsData = await getShoppingItemsByList(id);
        setItems(itemsData.data as ListItem[]);
      } catch (err) {
        setHasError(true);
      } finally {
        setLoading(false);
      }
    }

    loadDataFromServer();
  }, [id]);

  async function handleAddItem(event: React.FormEvent) {
    event.preventDefault();

    if (itemName === '') {
      alert('Please type an item name first');
      return;
    }

    try {
      const newItemObj = {
        listId: id,
        name: itemName,
        quantity: itemQuantity,
        completed: false
      };

      const response = await createShoppingItem(newItemObj);
      
      setItems([...items, response.data as ListItem]);
      setItemName('');
      setItemQuantity(1);
    } catch (err) {
      alert('Could not save item');
    }
  }

  async function handleToggleBox(item: ListItem) {
    try {
      const response = await updateShoppingItem(item.id, { completed: !item.completed });
      
      const updatedList = items.map(function (i) {
        if (i.id === item.id) {
          return response.data as ListItem;
        } else {
          return i;
        }
      });
      
      setItems(updatedList);
    } catch (err) {
      alert('Could not update checkbox');
    }
  }

  async function handleDeleteItem(itemId: string) {
    try {
      await deleteShoppingItem(itemId);
      
      const remainingItems = items.filter(function (i) {
        return i.id !== itemId;
      });
      
      setItems(remainingItems);
    } catch (err) {
      alert('Could not delete item');
    }
  }

  if (loading === true) {
    return (
      <PageLayout>
        <div style={{ textAlign: 'center', padding: '20px' }}> Loading list details... </div>
      </PageLayout>
    );
  }

  if (hasError === true || !list) {
    return (
      <PageLayout>
        <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
          <p> This shared list could not be found. It may have been deleted. </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        <h1 style={{ margin: '0 0 5px 0' }}>{list.name}</h1>
        <span style={{ background: '#007bff', color: 'white', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }}>
          {list.category}
        </span>
      </div>

      {list.notes ? (
        <div style={{ padding: '10px', background: '#f5f5f5', borderRadius: '4px', marginBottom: '20px' }}>
          📝 <strong>Notes:</strong> {list.notes}
        </div>
      ) : null}

      <form onSubmit={handleAddItem} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', marginBottom: '20px' }}>
        <div style={{ flex: 2 }}>
          <Input
            label="Item Description"
            value={itemName}
            onChange={function (e) { setItemName(e.target.value); }}
            placeholder="e.g. Milk"
            required
          />
        </div>
        <div style={{ flex: 1 }}>
          <Input
            label="Qty"
            type="number"
            value={String(itemQuantity)}
            onChange={function (e) { setItemQuantity(Number(e.target.value)); }}
            min="1"
            required
          />
        </div>
        <Button type="submit" variant="primary"> Add </Button>
      </form>

      <div style={{ background: '#ffffff', borderRadius: '6px', border: '1px solid #ddd', padding: '15px' }}>
        {items.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', margin: '10px 0' }}>This shopping list is currently empty.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {items.map(function (item) {
              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '10px',
                    borderBottom: '1px solid #eee'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={function () { handleToggleBox(item); }}
                      style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                    />
                    <span style={{ 
                      textDecoration: item.completed === true ? 'line-through' : 'none', 
                      color: item.completed === true ? '#999' : '#333' 
                    }}>
                      {item.name} <strong>(x{item.quantity})</strong>
                    </span>
                  </div>
                  
                  <button
                    type="button"
                    onClick={function () { handleDeleteItem(item.id); }}
                    style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '14px' }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {list.image ? (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <img src={list.image} alt={list.name} style={{ maxWidth: '100%', borderRadius: '6px' }} />
        </div>
      ) : null}
    </PageLayout>
  );
}

export default SharedList;
