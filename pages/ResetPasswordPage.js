import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('black');
  const email = sessionStorage.getItem("userEmail");
  const navigate = useNavigate();
console.log(email);
  const handleReset = async () => {
    if (!email) {
      setMessage("No email found");
      setMessageColor("red");
      return;
    }

    try {
      const res = await fetch("http://localhost:9090/reset", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          newPassword,  
          confirmPassword
        })
      });

      const text = await res.text();

      if (res.ok && text === "success") {
        setMessage("Password updated successfully. You can now login.");
        setMessageColor("green");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (text === "not_match") {
        setMessage("New password and confirm password do not match.");
        setMessageColor("red");
      } else if (text === "new_old") {
        setMessage("New password cannot be same as old password.");
        setMessageColor("orange");
      } else if (text === "account_exist") {
        setMessage(
          <>
            Account does not exist. Please <a href="/signup">sign up</a>.
          </>
        );        setMessageColor("orange");

      } else { 
        setMessage("Something went wrong.");
        setMessageColor("red");
      }
    } catch (error) {
      console.error("Error resetting password", error);
      setMessage("Something went wrong.");
      setMessageColor("red");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleReset} style={styles.button}>Update Password</button>
        {message && <div style={{ ...styles.message, color: messageColor }}>{message}</div>}
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
    background: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  message: {
    textAlign: "center",
    marginTop: "10px",
    fontWeight: "bold"
  }
};

export default ResetPasswordPage;


