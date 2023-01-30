import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Form, Button, Alert } from 'react-bootstrap';

const ProductForm = () => {
  const navigate = useNavigate();
  const user=JSON.parse(localStorage.getItem("token"));;
  const email=user.email;
  // console.log('ekjkerjrkejw',email)
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    email: user.email,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    if (id) {
    // If the component is being rendered with an id parameter in the URL,
    // fetch the product details from the server to pre-populate the form
    axios.get(`http://localhost:3001/api/products/${id}`)
    .then((response) =>{
      console.log(response);
      setProduct(response.data)
    } )
    .catch((error) => {
    setErrorMessage("Error fetching product details from the server.");
    console.log(error);
    });
    }
    }, [id]);
    
    
    
    
    

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
    console.log(product);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const temp = JSON.parse(localStorage.getItem('token'));
    const token = temp.token;
    let apiEndpoint = "http://localhost:3001/api/productadd";
    let method = "POST";
    if (id) {
      apiEndpoint += `/${id}`;
      method = "PUT";
    }

    try {
      const res = await axios({
        method: method,
        url: apiEndpoint,
        data: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
  }

export default ProductForm;
