import { useState } from "react";
import { RxEyeOpen } from "react-icons/rx";
import { VscEyeClosed } from "react-icons/vsc";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // Add state for password visibility

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validations
    if (!credentials.username || !credentials.password) {
      setError("Username and Password are required.");
      return;
    }

    // Clear error message
    setError("");

    // Logic to send credentials to the backend (placeholder for backend integration)
    try {
      // Simulate a login attempt
      const response = await fetch("http://localhost:3500/sign_up", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        // Logic for successful login (e.g., token storage)
        console.log("Login successful", data);
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
    <div className="Auth-card">
      <h1 className="title">
        <span className="blue">Blue</span>
        <span className="crest">Crest</span>
        </h1>

      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Fullname">
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter email"
          name="email"
          id="email"
          value={credentials.fullname}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password">
          <b>Password</b>
        </label>
        <div className="password-container">
          <input
            type={passwordVisible ? "text" : "password"} // Toggle the password visibility
            placeholder="Enter Password"
            name="password"
            id="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
          <span
            className="eye-icon"
            onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility state
          >
            {passwordVisible ? <RxEyeOpen /> : <VscEyeClosed />}
          </span>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button">
          Login
        </button>

        <label>
          <input type="checkbox" name="remember" />
          Remember Me
        </label>
      </form>
    </div>
    </div>
  );
};

export default Login;
