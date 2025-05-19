import { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import './main.scss';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </BrowserRouter>
  );
}
