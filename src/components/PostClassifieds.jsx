import { Link } from "react-router-dom";
import React, { useState } from "react";

export const PostClassifieds = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
    location: "",
    postedAt: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://olxproducts.onrender.com/product/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Product created successfully");
        setFormData({
          name: "",
          description: "",
          category: "",
          image: "",
          location: "",
          postedAt: "",
          price: "",
        });
      } else {
        alert("Failed to add employee: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <nav id="navbar">
        <Link to="/browseclassifieds">Browse Classifieds</Link>
        <Link to="/postclassifieds">Post Classifieds</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div id="mainpost">
        <h1>Post Classifieds</h1>
        <form onSubmit={handleSubmit} id="postForm">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />
          <input
            type="date"
            name="postedAt"
            placeholder="Date"
            value={formData.postedAt}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};
