# Shopping List App

## Project Image

<!-- Add a screenshot of your running app here once you have one -->
<!-- Example: ![App screenshot](./src/assets/screenshot.png) -->

## Project Description

A shopping list management app built with React, TypeScript, and Redux, where users can register, log in, and create and manage their own shopping lists. Users can add items with a name, quantity, category, notes, and an image, then search, sort, and filter their lists. Lists can also be shared with others via email, a shareable link, or the device's native share options. User passwords are encrypted before being stored.

## Tech Stack

- React
- TypeScript
- Redux Toolkit
- React Router DOM
- json-server (mock backend / data persistence)
- Axios
- CryptoJS (password encryption)
- Vite

## Installation & Setup

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file in the project root with the following variables:
```
   VITE_API_BASE_URL=http://localhost:5000
   VITE_ENCRYPTION_KEY=your-own-secret-key-here
```
4. Start the mock backend: `npm run server` (runs on http://localhost:5000)
5. In a separate terminal, start the app: `npm run dev` (runs on http://localhost:5173)

## Add-ons

<!-- Optional: add a link here if you deploy the app somewhere, e.g. Vercel/Netlify -->

## Folder Structure

```
src/
  API/            → jsonServer.ts (calls to json-server)
  Components/
    Auth/         → LoginForm.tsx, RegistrationForm.tsx
    Hooks/        → useAuth.ts, useShoppingLists.ts
    Items/        → ShoppingItem.tsx, ShoppingItemForm.tsx
    Lists/        → ShoppingListCard.tsx, ShoppingListFilters.tsx, ShoppingListForm.tsx
    Pages/        → Home.tsx, Login.tsx, Profile.tsx, Register.tsx, SharedList.tsx
    Profile/      → ProfileInfo.tsx, ProfilePassword.tsx
    Store/        → authSlice.ts, shoppingSlice.ts, hooks.ts, index.ts
    Styles/       → global.css
    Types/        → index.ts
    Utils/        → encryption.ts
    (shared UI)   → AuthCard.tsx, Button.tsx, Input.tsx, Navbar.tsx, PageLayout.tsx, ShareModal.tsx
  App.tsx
  main.tsx
  vite-env.d.ts
```
