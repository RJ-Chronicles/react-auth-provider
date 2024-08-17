import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSessionManagement from "../session/useSessionManagement";
import { User } from "../store/types";
import useAuthContext from "../store/useAuthContext";

// Inline CSS
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  form: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    width: "300px",
    // textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
};

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <div>
        <button onClick={() => navigate("/login")} style={styles.button}>
          Log in
        </button>
      </div>
    </div>
  );
};

import React, { useState } from "react";

export const Login: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    password: "",
    email: "",
  });

  const { restoreUserSession, handleUserLogin } = useSessionManagement();
  const navigate = useNavigate();
  const { state } = useAuthContext();
  const { isAuthenticated } = state;
  useEffect(() => {
    restoreUserSession();
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [restoreUserSession, isAuthenticated]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setUserInfo((prev) => {
      return {
        ...prev,
        [name]: e.target.value,
      };
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password } = userInfo;
    console.log(userInfo);
    if (password.trim().length <= 4 || name.trim().length <= 2) {
      return;
    }
    const user: User = {
      name: name,
      email: email,
      expiration: "50",
      token: "LKSDFEWIJLJDF09II_LSAJDFJEW",
    };
    handleUserLogin(user);
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Login</h2>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={userInfo.name}
          onChange={handleInput}
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={handleInput}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userInfo.password}
          onChange={handleInput}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export const DashboarPage = () => {
  const { handleUserLogout } = useSessionManagement();
  return (
    <div style={styles.container}>
      {" "}
      <div>
        <button style={styles.button} onClick={(e) => handleUserLogout()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export const LoginPage: React.FC = () => {
  const { restoreUserSession, handleUserLogin } = useSessionManagement();
  const navigate = useNavigate();
  const { state } = useAuthContext();
  const { isAuthenticated } = state;
  useEffect(() => {
    restoreUserSession();
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [restoreUserSession, isAuthenticated]);

  const submitLogin = () => {
    const user: User = {
      name: "jack",
      email: "jack@gmail.com",
      expiration: "50",
      token: "xylk",
    };
    handleUserLogin(user);
  };
  return (
    <div>
      <h1>Login page</h1>
      <button onClick={submitLogin}>Login</button>
    </div>
  );
};
