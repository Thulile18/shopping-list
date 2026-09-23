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

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/login"
          element={
            isLoggedIn === true
              ? <Navigate to="/home" replace />
              : <Login />
          }
        />

        <Route
          path="/register"
          element={
            isLoggedIn === true
              ? <Navigate to="/home" replace />
              : <Register />
          }
        />

        <Route
          path="/home"
          element={
            isLoggedIn === true
              ? <Home />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/lists"
          element={
            isLoggedIn === true
              ? <Home />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/lists/:id"
          element={
            isLoggedIn === true
              ? <ListDetail />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/profile"
          element={
            isLoggedIn === true
              ? <Profile />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/shared/:id"
          element={<SharedList />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </div>
  );
}

export default App;