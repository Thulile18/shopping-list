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
import { guessCategory } from '../Utils/autoCategory';

import PageLayout from '../PageLayout';
import Button from '../Button';
import Input from '../Input';
import ShareModal from '../ShareModal';


/*
  The colours and icons are selected from the category text.
  This means new categories can use the same system
  without checking category names one by one.
*/
const categoryStyles = [
  {
    className: 'category-color-3',
    icon: '📚',
  },
  {
    className: 'category-color-0',
    icon: '🛒',
  },
  {
    className: 'category-color-1',
    icon: '💻',
  },
  {
    className: 'category-color-4',
    icon: '🏠',
  },
  {
    className: 'category-color-2',
    icon: '👕',
  },
];


function getCategoryStyle(categoryName: string) {
  let total = 0;

  for (let i = 0; i < categoryName.length; i++) {
    total =
      (total * 31 + categoryName.charCodeAt(i)) %
      categoryStyles.length;
  }

  return categoryStyles[total];
}


function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const currentUser = useSelector(selectUser);
  const lists = useSelector(selectFilteredLists);
  const loading = useSelector(selectLoading);

  const searchTerm = useSelector(selectSearchTerm);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [editingList, setEditingList] =
    useState<any>(null);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState('');

  const [shareTargetId, setShareTargetId] =
    useState<string | null>(null);

  const [
    categoryWasManuallyChanged,
    setCategoryWasManuallyChanged,
  ] = useState(false);


  useEffect(function () {
    if (currentUser) {
      dispatch(fetchUserLists(currentUser.id));
    }
  }, [currentUser, dispatch]);


  useEffect(function () {
    const urlSearch =
      searchParams.get('search') || '';

    const urlSort =
      searchParams.get('sort') || 'createdAt';

    const urlOrder =
      searchParams.get('order') || 'desc';

    dispatch(setSearchTerm(urlSearch));
    dispatch(setSortBy(urlSort));
    dispatch(setSortOrder(urlOrder));
  }, [searchParams, dispatch]);


  function handleSearchChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const newValue = e.target.value;

    dispatch(setSearchTerm(newValue));

    setSearchParams({
      search: newValue,
      sort: sortBy,
      order: sortOrder,
    });
  }


  function handleSortChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const newValue = e.target.value;

    dispatch(setSortBy(newValue));

    setSearchParams({
      search: searchTerm,
      sort: newValue,
      order: sortOrder,
    });
  }


  function handleOrderChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const newValue = e.target.value;

    dispatch(setSortOrder(newValue));

    setSearchParams({
      search: searchTerm,
      sort: sortBy,
      order: newValue,
    });
  }


  function openAddForm() {
    setEditingList(null);
    setName('');
    setCategory('');
    setNotes('');
    setImage('');
    setCategoryWasManuallyChanged(false);
    setIsFormOpen(true);
  }


  function openEditForm(list: any) {
    setEditingList(list);
    setName(list.name);
    setCategory(list.category);
    setNotes(list.notes);
    setImage(list.image);
    setCategoryWasManuallyChanged(true);
    setIsFormOpen(true);
  }


  function handleNameChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const newName = e.target.value;

    setName(newName);

    if (categoryWasManuallyChanged === false) {
      const guessedCategory =
        guessCategory(newName);

      if (guessedCategory !== '') {
        setCategory(guessedCategory);
      }
    }
  }


  function handleCategoryChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setCategory(e.target.value);
    setCategoryWasManuallyChanged(true);
  }


  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!currentUser) {
      return;
    }

    const data = {
      name: name.trim(),
      category: category.trim(),
      notes: notes.trim(),
      image: image.trim(),
      sharedWith: editingList
        ? editingList.sharedWith
        : [],
    };

    if (editingList) {
      await dispatch(
        editShoppingList({
          id: editingList.id,
          data: data,
          currentUserId: currentUser.id,
        })
      );
    } else {
      await dispatch(
        addShoppingList({
          userId: currentUser.id,
          data: data,
        })
      );
    }

    setIsFormOpen(false);
  }


  async function handleDelete(id: string) {
    if (!currentUser) {
      return;
    }

    const confirmation = window.confirm(
      'Delete this shopping list category?'
    );

    if (confirmation === true) {
      await dispatch(
        removeShoppingList({
          id: id,
          currentUserId: currentUser.id,
        })
      );
    }
  }


  function handleShareEmail(email: string) {
    const list = lists.find(function (l) {
      return l.id === shareTargetId;
    });

    if (list) {
      dispatch(
        shareShoppingList({
          id: list.id,
          email: email,
          currentSharedWith: list.sharedWith,
        })
      );
    }
  }


  function formatDate(dateValue: any) {
    if (!dateValue) {
      return '';
    }

    return new Date(dateValue).toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }
    );
  }


  const shareTargetList = lists.find(
    function (l) {
      return l.id === shareTargetId;
    }
  );


  const groupedByCategory:
    Record<string, typeof lists> = {};

  lists.forEach(function (list) {
    const key =
      list.category.trim() === ''
        ? 'Uncategorized'
        : list.category;

    if (!groupedByCategory[key]) {
      groupedByCategory[key] = [];
    }

    groupedByCategory[key].push(list);
  });


  const categoryNames =
    Object.keys(groupedByCategory).sort();


  const userName =
    currentUser && currentUser.name
      ? currentUser.name
      : 'there';


  return (
    <PageLayout>

      {/* Hero section */}

      <section className="home-hero">

        <div className="home-hero-icon">
          🛍️
        </div>

        <div className="home-hero-content">

          <p className="home-hero-greeting">
            Good afternoon, {userName}!
          </p>

          <h1>
            My Shopping Lists
          </h1>

          <p className="home-hero-text">
            Keep track of what you need,
            organize by category and shop smarter.
          </p>

        </div>

        <div className="home-hero-decoration">
          <span>Small</span>
          <span>steps, big</span>
          <span>savings ♡</span>
        </div>

      </section>


      {/* Search and filters */}

      <div className="filters-bar">

        <div className="search-box">

          <span className="search-icon">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search lists by name, category or notes..."
            value={searchTerm}
            onChange={handleSearchChange}
          />

        </div>


        <div className="filter-group">

          <label>
            Sort by:
          </label>

          <select
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="name">
              Name
            </option>

            <option value="category">
              Category
            </option>

            <option value="createdAt">
              Date added
            </option>
          </select>

        </div>


        <div className="filter-group">

          <label>
            Order:
          </label>

          <select
            value={sortOrder}
            onChange={handleOrderChange}
          >
            <option value="asc">
              Ascending
            </option>

            <option value="desc">
              Descending
            </option>
          </select>

        </div>


        <Button
          variant="primary"
          onClick={openAddForm}
        >
          + New List
        </Button>

      </div>


      {/* Loading */}

      {loading ? (
        <div className="loading">
          Loading your shopping lists...
        </div>
      ) : null}


      {/* Empty state */}

      {lists.length === 0 && !loading ? (
        <div className="empty-shopping-state">

          <div className="empty-shopping-icon">
            🛍️
          </div>

          <h2>
            No shopping lists yet
          </h2>

          <p>
            Click + New List to create
            your first shopping list.
          </p>

          <Button
            variant="primary"
            onClick={openAddForm}
          >
            + New List
          </Button>

        </div>
      ) : null}


      {/* Category cards */}

      {categoryNames.length > 0 ? (

        <div className="categories-grid">

          {categoryNames.map(
            function (categoryName) {

              const style =
                getCategoryStyle(categoryName);

              const categoryLists =
                groupedByCategory[categoryName];

              const count =
                categoryLists.length;


              return (

                <section
                  className={
                    'category-section ' +
                    style.className
                  }
                  key={categoryName}
                >

                  {/* Category heading */}

                  <div className="category-heading">

                    <div className="category-title-area">

                      <span className="category-icon">
                        {style.icon}
                      </span>

                      <div>

                        <h2>
                          {categoryName}
                        </h2>

                        <p>
                          Shopping lists and essentials
                        </p>

                      </div>

                    </div>


                    <span className="category-count">
                      ▤ {count}{' '}
                      {count === 1
                        ? 'item'
                        : 'items'}
                    </span>

                  </div>


                  {/* Lists inside category */}

                  <div className="category-list-stack">

                    {categoryLists.map(
                      function (list) {

                        return (

                          <div
                            className="list-item-card"
                            key={list.id}
                          >

                            {list.image ? (

                              <img
                                src={list.image}
                                alt={list.name}
                                className="item-image"
                                onError={
                                  function (e) {
                                    e.currentTarget.style.display =
                                      'none';
                                  }
                                }
                              />

                            ) : (

                              <div className="item-image-placeholder">
                                🛍️
                              </div>

                            )}


                            <div className="item-card-content">

                              <div className="item-card-top">

                                <div>

                                  <div
                                    className="item-name"
                                    onClick={
                                      function () {
                                        navigate(
                                          '/lists/' +
                                          list.id
                                        );
                                      }
                                    }
                                  >
                                    {list.name}
                                  </div>


                                  <div className="item-meta">

                                    <span className="tag">
                                      {list.category}
                                    </span>

                                  </div>

                                </div>


                                {formatDate(
                                  list.createdAt
                                ) ? (

                                  <span className="item-date">
                                    ▣ Added:{' '}
                                    {formatDate(
                                      list.createdAt
                                    )}
                                  </span>

                                ) : null}

                              </div>


                              {list.notes ? (

                                <div className="item-notes">
                                  ▤ {list.notes}
                                </div>

                              ) : null}


                              <div className="item-actions">

                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={
                                    function () {
                                      navigate(
                                        '/lists/' +
                                        list.id
                                      );
                                    }
                                  }
                                >
                                  ◉ Open
                                </Button>


                                <Button
                                  variant="warning"
                                  size="sm"
                                  onClick={
                                    function () {
                                      openEditForm(list);
                                    }
                                  }
                                >
                                  ✎ Edit
                                </Button>


                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={
                                    function () {
                                      setShareTargetId(
                                        list.id
                                      );
                                    }
                                  }
                                >
                                  ♧ Share
                                </Button>


                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={
                                    function () {
                                      handleDelete(
                                        list.id
                                      );
                                    }
                                  }
                                >
                                  ♲ Delete
                                </Button>

                              </div>

                            </div>

                          </div>

                        );
                      }
                    )}

                  </div>


                  {/* Category footer */}

                  <div className="category-footer">

                    <span>
                      ▣ {count}{' '}
                      {count === 1
                        ? 'item'
                        : 'items'}{' '}
                      in this category
                    </span>

                    <button
                      type="button"
                      onClick={
                        function () {
                          navigate('/home');
                        }
                      }
                    >
                      View all →
                    </button>

                  </div>

                </section>

              );
            }
          )}

        </div>

      ) : null}


      {/* Add/Edit modal */}

      {isFormOpen ? (

        <div
          className="modal-overlay"
          onClick={
            function () {
              setIsFormOpen(false);
            }
          }
        >

          <div
            className="modal-box"
            onClick={
              function (e) {
                e.stopPropagation();
              }
            }
          >

            <div className="modal-header">

              <h3>
                {editingList
                  ? 'Edit List'
                  : 'New Shopping List'}
              </h3>

              <button
                className="modal-close"
                type="button"
                onClick={
                  function () {
                    setIsFormOpen(false);
                  }
                }
              >
                ✕
              </button>

            </div>


            <form onSubmit={handleSubmit}>

              <Input
                label="List Name"
                value={name}
                onChange={handleNameChange}
                required
              />

              <Input
                label="Category (auto-suggested, editable)"
                value={category}
                onChange={handleCategoryChange}
                required
              />

              <Input
                label="Notes (optional)"
                value={notes}
                onChange={
                  function (e) {
                    setNotes(e.target.value);
                  }
                }
              />

              <Input
                label="Image URL (optional)"
                value={image}
                onChange={
                  function (e) {
                    setImage(e.target.value);
                  }
                }
              />

              <Button
                type="submit"
                variant="primary"
                block
              >
                Save
              </Button>

            </form>

          </div>

        </div>

      ) : null}


      {/* Share modal */}

      {shareTargetList ? (

        <ShareModal
          isOpen={true}
          onClose={
            function () {
              setShareTargetId(null);
            }
          }
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