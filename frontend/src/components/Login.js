import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BASE_URL } from "../utils";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      setIsLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={styles.container}
    >
      <motion.div
        className="auth-form-wrapper"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={styles.formWrapper}
      >
        <h2 style={styles.title}>Welcome Back</h2>

        {errorMessage && (
          <motion.div
            className="error-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={styles.error}
          >
            {errorMessage}
          </motion.div>
        )}

        <form className="auth-form" onSubmit={handleLogin} style={styles.form}>
          <div className="form-group" style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              autoFocus
              style={styles.input}
            />
          </div>

          <div className="form-group" style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={isLoading}
            style={{
              ...styles.button,
              opacity: isLoading ? 0.7 : 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner" style={styles.spinner}></span>{" "}
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="register-link" style={styles.link}>
              Register here
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1976d2 0%, #90caf9 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formWrapper: {
    background: "#fff",
    padding: "32px 28px",
    borderRadius: 12,
    boxShadow: "0 4px 24px #0002",
    minWidth: 340,
    maxWidth: 380,
    width: "100%",
  },
  title: {
    textAlign: "center",
    color: "#1976d2",
    marginBottom: 24,
    fontWeight: 700,
    letterSpacing: 1,
  },
  error: {
    color: "#e74c3c",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "15px",
    background: "rgba(231, 76, 60, 0.1)",
    textAlign: "center",
    fontWeight: 500,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: {
    fontWeight: 600,
    color: "#1976d2",
    marginBottom: 2,
  },
  input: {
    padding: "10px",
    borderRadius: 6,
    border: "1px solid #bdbdbd",
    fontSize: 16,
    outline: "none",
    transition: "border 0.2s",
  },
  button: {
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "10px 0",
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    marginTop: 8,
  },
  link: {
    color: "#1976d2",
    fontWeight: 600,
    textDecoration: "none",
  },
  spinner: {
    width: 18,
    height: 18,
    border: "3px solid #fff",
    borderTop: "3px solid #1976d2",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    display: "inline-block",
  },
};

export default LoginForm;
