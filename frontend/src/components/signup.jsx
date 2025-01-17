import { useState } from "react";
import { RxEyeOpen } from "react-icons/rx";
import { VscEyeClosed } from "react-icons/vsc";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validations
    if (!credentials.fullname || !credentials.email || !credentials.password || !credentials.confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Clear error message
    setError("");

    // Logic to send credentials to the backend
    try {
      // Simulate a signup attempt
      const response = await fetch("http://localhost:3000/sign_up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        // Logic for successful signup (e.g., redirect to login)
        console.log("Signup successful", data);
      } 
      else {
        setError("Something went wrong. Please try again later.");
      }
    } catch (err) {
      console.error("Signup error:", err);
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

      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Fullname">
          <b>Fullname</b>
        </label>
        <input
          type="text"
          placeholder="Enter Fullname"
          name="fullname"
          id="fullname"
          value={credentials.fullname}
          onChange={handleInputChange}
          required
        />

<label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="email"
          name="email"
          id="email"
          value={credentials.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password">
          <b>Password</b>
        </label>
        <div className="password-container">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter Password"
            name="password"
            id="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
          <span
            className="eye-icon"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <RxEyeOpen /> : <VscEyeClosed />}
          </span>
        </div>

        <label htmlFor="confirmPassword">
          <b>Confirm Password</b>
        </label>
        <div className="password-container">
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            id="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <span
            className="eye-icon"
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            {confirmPasswordVisible ? <RxEyeOpen /> : <VscEyeClosed />}
          </span>
        </div>

        {error && <p className="error-message">{error}</p>}

        

        <button type="submit" className="login-button">
          Sign Up
        </button>
      </form>
    </div>
    </div>
  );
};

export default Signup;
