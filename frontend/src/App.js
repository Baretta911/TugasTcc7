import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NoteList from "./components/NoteList";
import LoginForm from "./components/Login";
import RegisterForm from "./components/Register";
import { BASE_URL } from "./utils";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cek localStorage saat pertama kali render
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  // Fungsi untuk register
  const handleRegister = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/create-users`, data);
      alert(response.data.msg);
      window.location.href = "/login";
    } catch (error) {
      alert("Gagal Register. Pastikan semua data benar.");
    }
  };

  // Fungsi untuk login
  const handleLogin = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, data, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      setIsAuthenticated(true);
    } catch (error) {
      alert("Email atau password salah.");
    }
  };

  // Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  // Fungsi ProtectedRoute
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <button onClick={handleLogout} style={{ margin: 16 }}>
                  Logout
                </button>
                <NoteList />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={<LoginForm handleLogin={handleLogin} />}
        />
        <Route
          path="/register"
          element={<RegisterForm handleRegister={handleRegister} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
