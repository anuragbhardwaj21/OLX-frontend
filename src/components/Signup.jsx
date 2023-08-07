import React, { useState } from "react";
import { Link } from "react-router-dom";
export const Signup = ({ isActive }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.cpassword) {
      alert("Password Didn't Matched");
      return;
    }
    const ndata = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await fetch("https://olxproducts.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ndata),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Signup successful");
        setFormData({
          email: "",
          password: "",
          cpassword: "",
        });
        window.location.href = "/";
      } else {
        alert("Signup failed: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div id="base">
      <form
        onSubmit={handleSubmit}
        id="signupForm"
      >
        <h1>Signup</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="cpassword"
          placeholder="Confirm Password"
          value={formData.cpassword}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
        <p>
        Already a member? <Link to="/">Login here</Link>
      </p>
      </form>
    </div>
  );
};
