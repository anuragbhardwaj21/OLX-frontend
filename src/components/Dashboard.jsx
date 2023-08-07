import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateSortOrder, setDateSortOrder] = useState("");
  const [priceSortOrder, setPriceSortOrder] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const queryParams = new URLSearchParams();
    if (categoryFilter) {
      queryParams.append("category", categoryFilter);
    }
    if (dateSortOrder) {
      queryParams.append("sortBy", "postedAt");
      queryParams.append("sortOrder", dateSortOrder);
    }
    if (priceSortOrder) {
      queryParams.append("sortBy", "price");
      queryParams.append("sortOrder", priceSortOrder);
    }

    fetch(`https://olxproducts.onrender.com/product?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) =>
        console.error("Error fetching product data:", error)
      );
  }, [categoryFilter, dateSortOrder, priceSortOrder]);

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleDateSortChange = (e) => {
    setDateSortOrder(e.target.value);
  };

  const handlePriceSortChange = (e) => {
    setPriceSortOrder(e.target.value);
  };

  const handleDeleteProduct = async (productId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://olxproducts.onrender.com/product/delete/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setProducts((prevProductData) =>
          prevProductData.filter((product) => product._id !== productId)
        );
      } else {
        alert("Failed to delete Product: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  function formatDateString(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      <nav id="navbar">
        <Link to="/browseclassifieds">Browse Classifieds</Link>
        <Link to="/postclassifieds">Post Classifieds</Link>

        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div id="mainbrowse">
        <h1>Browse Classifieds</h1>
        <div className="sortfilterarea">
        <select value={categoryFilter} onChange={handleCategoryChange}>
          <option value="">Filter By Category</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
          <option value="other">Other</option>
        </select>
        <select value={dateSortOrder} onChange={handleDateSortChange}>
          <option value="">Sort By Date</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <select value={priceSortOrder} onChange={handlePriceSortChange}>
          <option value="">Sort By Price</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        </div>
        <div className="product-cards">
          {products.map((product, index) => (
            <div className="product-card" key={index}>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.category}</p>
              <p>Desc: {product.description}</p>
              <p>Location: {product.location}</p>
              <p>Posted On: {formatDateString(product.postedAt)}</p>
              <p>Rs. {product.price} /-</p>

              <button onClick={() => handleDeleteProduct(product._id)}>
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
