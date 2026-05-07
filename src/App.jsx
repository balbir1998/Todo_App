import './App.css'
import { Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import { useTheme } from './utils/ContextAPI';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashborad from './Screens/Dashboard/Dashborad';

const App = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`${darkMode ? "dark-mode" : "light-mode"}`}>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashborad />} />
      </Routes>
    </div>
  )
}

export default App;
