import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./component/LoginForm";
import RegistrationForm from "./component/RegistrationForm";
import ProductList from "./component/ProductList";
import Navbar from "./component/Navbar";
import { useState } from "react";
import ProductForm from "./component/ProductForm";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (token) => {
    // Store the JWT token in the client's local storage
    localStorage.setItem("token", token);
    // Update the isLoggedIn state to true
    setIsLoggedIn(true);
  };
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} updateLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/productform" element={<ProductForm/>} />
        <Route path="/productForm/:id" element={<ProductForm/>} />
      </Routes>
    </div>
  );
}

export default App;
