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

function App() {
  const { token } = useSelector(function (state: RootState) {
    return state.auth;
  });
  
  const isLoggedIn = Boolean(token);

  return (
    <div className="app-container">
      <Navbar />
      
      <Routes>
        
        <Route
          path="/login"
          element={isLoggedIn === true ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn === true ? <Navigate to="/" replace /> : <Register />}
        />

        <Route
          path="/"
          element={isLoggedIn === true ? <Home /> : <Landing />}
        />
        <Route
          path="/profile"
          element={isLoggedIn === true ? <Profile /> : <Navigate to="/login" replace />}
        />

        <Route path="/shared/:id" element={<SharedList />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
