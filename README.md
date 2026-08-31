          Shopping List App

 
 Project Image:
   

 
 Project Description:

A shopping list management app built with React, TypeScript and Redux, where users can register, log in and organise their shopping into categorised lists (e.g. Groceries, Electronics). Each list can contain multiple items with a name, quantity and image. Users can search, sort and filter both their lists and items and share a list with others via email, a shareable link or their device's native share options. User passwords are encrypted before being stored and decrypted on login.

 Tech Stack:

- React
- TypeScript
- Redux Toolkit
- React Router DOM
- json-server (mock backend / data persistence)
- Fetch API
- CryptoJS (password encryption)
- Vite

 Installation & Setup:

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file in the project root with the following variables:

   VITE_API_BASE_URL=http://localhost:5000
   VITE_ENCRYPTION_KEY=your-own-secret-key-here

4. Start the mock backend: `npm run server` (runs on http://localhost:5000)
5. In a separate terminal, start the app: `npm run dev`

 Features:

- Register, login, and manage your profile (view/update info, update password)
- Protected routing — only logged-in users can access the Dashboard, Profile, and List Detail pages
- Dashboard: create, view, edit, delete shopping lists, grouped by category
- List Detail: add, view, edit, delete items within a list, each with a name, quantity, and optional image
- Search and sort (by name, category, date added) on both the Dashboard and List Detail — synced with the URL
- Share a list via email, copy link, or native share; shared links are viewable without logging in
- Fully responsive design (320px–1200px+)

 Design Planning:

- Canva UI mockups and moodboard: see the design files in this repository

 
Folder Structure:


src:
  
API              → jsonServer.ts (fetch calls to json-server)
  
Components
    
    Auth         → LoginForm.tsx, RegistrationForm.tsx
    Hooks        → useAuth.ts
    Pages        → Home.tsx (Dashboard), ListDetail.tsx, Login.tsx, Profile.tsx,
                     Register.tsx, Landing.tsx, SharedList.tsx
    Profile      → ProfileInfo.tsx, ProfilePassword.tsx
    Store        → authSlice.ts, shoppingSlice.ts, hooks.ts, index.ts
    Styles       → global.css
    Types        → index.ts
    Utils       → encryption.ts
   (shared UI)  → AuthCard.tsx, Button.tsx, Input.tsx, Navbar.tsx, PageLayout.tsx, ShareModal.tsx
  App.tsx
  main.tsx
  vite-env.d.ts

  Add Ons:

(Google, AI, Geeks4Geeks, w3schools )
