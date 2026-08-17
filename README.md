shopping-list-app/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── jsonServer.ts
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Navbar.tsx
│   │   ├── lists/
│   │   │   ├── ShoppingListCard.tsx
│   │   │   ├── ShoppingListForm.tsx
│   │   │   └── ShoppingListFilters.tsx
│   │   └── items/
│   │       ├── ShoppingItem.tsx
│   │       └── ShoppingItemForm.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useShoppingLists.ts
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Home.tsx
│   │   └── Profile.tsx
│   ├── store/
│   │   ├── index.ts
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   └── shoppingSlice.ts
│   │   └── hooks.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── encryption.ts
│   ├── styles/
│   │   ├── global.css
│   │   └── components.css
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── db.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md