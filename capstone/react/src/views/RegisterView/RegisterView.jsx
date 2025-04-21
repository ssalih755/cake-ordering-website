import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import Notification from "../../components/Notification/Notification";

import styles from "./RegisterView.module.css";

export default function RegisterView() {
  const navigate = useNavigate();

  const [notification, setNotification] = useState(null);

  // Setup state for the registration data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    // Validate the form data
    if (password !== confirmPassword) {
      // Passwords don't match, so display error notification
      setNotification({ type: "error", message: "Passwords do not match." });
    } else {
      // If no errors, send data to server
      AuthService.register({
        username,
        password,
        confirmPassword,
        role: "user",
        firstname,
        lastname,
        email,
        phone,
      })
        .then(() => {
          setNotification({
            type: "success",
            message: "Registration successful",
          });

          navigate("/login");
        })
        .catch((error) => {
          // Check for a response message, but display a default if that doesn't exist
          const message =
            error.response?.data?.message || "Registration failed.";
          setNotification({ type: "error", message: message });
        });
    }
  }

  return (
    <div className={styles.viewRegister} id="view-register">
      <h2>Register</h2>
      <div className={styles.loginText}>
        <Link to="/login">Have an account? Log-in</Link>
      </div>
      <Notification
        notification={notification}
        clearNotification={() => setNotification(null)}
      />

      <form onSubmit={handleSubmit}>
        <div className={styles.formControl}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            size="50"
            required
            autoFocus
            autoComplete="username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className={styles.formControl}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            size="50"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className={styles.formControl}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            size="50"
            required
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>

        <div className={styles.formControl}>
          <label htmlFor="First Name">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstname}
            size="50"
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="Last Name">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastname}
            size="50"
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>

        <div className={styles.formControl}>
          <label htmlFor="Email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            size="50"
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className={styles.formControl}>
          <label htmlFor="Phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            size="50"
            required
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>

        <button type="submit" className={`btn-primary ${styles.formButton}`}>
          Register
        </button>
      </form>
    </div>
  );
}
