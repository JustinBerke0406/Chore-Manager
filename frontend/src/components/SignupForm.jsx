import React, { useState } from "react";
import Connector from "../../../backend/connector";

const connector = new Connector();

function SignupForm({ onAuthSuccess, showMessage }) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Generate a simple unique ID using the current timestamp.
      const newUserId = Date.now();
      const newUser = {
        UserID: newUserId,
        email,
        firstName,
        lastName,
        age: parseInt(age, 10),
        pass: password // Note: In production, be sure to hash passwords!
      };

      const result = await connector.setUser(newUser);
      if (result && result.message === "Success") {
        showMessage("Signup successful! Redirecting to home...");
        onAuthSuccess(); // Navigate to the home screen.
      } else {
        showMessage("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      showMessage("Error during signup. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Signup</h2>
      <div className="form-group">
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label>First Name:</label>
        <input 
          type="text" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
          required 
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input 
          type="text" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
          required 
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label>Age:</label>
        <input 
          type="number" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          required 
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          className="form-input"
        />
      </div>
      <button type="submit" className="submit-button">Signup</button>
    </form>
  );
}

export default SignupForm;
