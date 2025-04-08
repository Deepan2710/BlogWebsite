import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'error' or 'success'
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:9090/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      if (!res.ok) {
        alert("Account exists. Please login.");
        throw new Error("Account exists. Please login to enter.");
      }

       await res.text();
      setMessageType('success');
      setMessage("Signup successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error(err);
      setMessageType('error');
      setMessage("Login to create blog");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.signupBox}>
        <h2 style={styles.heading}>Create Account</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
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
          <button type="submit" style={styles.button}>Signup</button>
        </form>
        <div style={messageType === 'error' ? styles.error : styles.success}>
          {message}
        </div>
        <p style={styles.loginLink}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#007bff" }}>Login here</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: '#eef2f7',
    padding: '40px',
    minHeight: '100vh',
  },
  signupBox: {
    background: '#fff',
    maxWidth: '400px',
    margin: 'auto',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    fontSize: '1rem',
    borderRadius: '6px',
    border: 'none',
    background: '#28a745',
    color: '#fff',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  },
  success: {
    color: 'green',
    textAlign: 'center',
    marginTop: '10px',
  },
  loginLink: {
    textAlign: 'center',
    marginTop: '15px',
  }
};

export default SignupPage;
