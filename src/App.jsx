import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Header from './components/Header/Header';
import { useTheme } from './utils/ThemeContext';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashborad from './Screens/Dashboard/Dashborad';
import { useAuth } from './utils/AuthContext';
import AuthHoc from './utils/AuthHoc';

const App = () => {
  const { darkMode } = useTheme();
  const { user } = useAuth();

  return (
    <div className={`${darkMode ? "dark-mode" : "light-mode"}`}>
      <Header />
      <Routes>
        <Route path="/" element={user ? <Navigate to={'/dashboard'} /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to={'/dashboard'} /> : <Register />} />
        <Route path="/dashboard" element={<AuthHoc children={<Dashborad />} />} />
      </Routes>
    </div>
  )
}

export default App;