import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:9090/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const responseText = await res.text();
      sessionStorage.setItem("userEmail", email);
      sessionStorage.setItem("userName", email.split("@")[0]);
      const mail=sessionStorage.getItem("userEmail");
      console.log(mail);
      if (res.ok && responseText === "/blog_add.html") {
        // Successful login
      
        navigate("/blog_add");
      } else {
        if (responseText === "no_account") {
          setErrorMsg("Account does not exist. Please sign up.");
        } else if (responseText === "invalid") {
          setErrorMsg("Invalid credentials. Please try again.");
        } else {
          console.log("here1");
          setErrorMsg("Login failed. Please try again.");
        }
      }
    } catch (err) {
      console.log("heree2");
      setErrorMsg("Login failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
          {errorMsg && <div style={styles.error}>{errorMsg}</div>}
        </form>
        <p style={{ marginTop: "10px" }}>
              Don't have an account? <a href="/signup">Sign up</a>  
        </p>
        {/* <p style={{ marginTop: "10px" }}>
  <button
    style={{ background: "none", color: "#007bff", border: "none", cursor: "pointer", textDecoration: "underline" }}
    onClick={() => navigate("/reset-password")}
  >
    Forgot Password?
  </button>
</p>   */}

      </div> 
    </div>
  );
};

const styles = {
  page: {
    background: "#f5f5f5",
    padding: "40px",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    background: "#fff",
    maxWidth: "400px",
    margin: "auto",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    background: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: "10px",
  }
};

export default LoginPage;
