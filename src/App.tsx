import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './Components/Store';
import Navbar from './Components/Navbar';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import Home from './Components/Pages/Home';
import Profile from './Components/Pages/Profile';
import SharedList from './Components/Pages/SharedList';
import Landing from './Components/Pages/Landing';
import ListDetail from './Components/Pages/ListDetail';

function App() {
  
  const { token } = useSelector(function (state: RootState) {
    return state.auth;
  });
  
  const isLoggedIn = Boolean(token);

  return (
    <div className="app-container">
      {/* Global application navigation banner header */}
      <Navbar />
      
      <Routes>
        {/* Main Base Path: Everyone who opens the app lands here first */}
        <Route path="/" element={<Landing />} />
        
        {/* Authentication Routes */}
        <Route
          path="/login"
          element={isLoggedIn === true ? <Navigate to="/home" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn === true ? <Navigate to="/home" replace /> : <Register />}
        />
        
        {/* Protected Dashboard/Shopping List View */}
        <Route
          path="/home"
          element={isLoggedIn === true ? <Home /> : <Navigate to="/login" replace />}
        />
        
        <Route
          path="/profile"
          element={isLoggedIn === true ? <Profile /> : <Navigate to="/login" replace />}
        />

        {/* Individual Selected List Details Page View Route */}
        <Route
          path="/lists/:id"
          element={isLoggedIn === true ? <ListDetail /> : <Navigate to="/login" replace />}
        />

        {/* Read-Only Shared List Component Link Route */}
        <Route path="/shared/:id" element={<SharedList />} />
        
        {/* Fallback Catch-All Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
