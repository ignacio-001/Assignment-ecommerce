import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogout = () => {
    // Make a GET request to the server to log out the user
    fetch("http://localhost:3001/api/logout")
    .then((response) => response.json())
    .then(() => {
      // Clear the JWT token from the client's local storage
      localStorage.removeItem("token");
      // Update the isLoggedIn state to false
      props.setIsLoggedIn(false);
    })
    .catch((error) => {
      console.log(error);
    });
};

  return (
    <nav>
      <Link to="/">Home</Link>
      {props.isLoggedIn ? (
        <>
          <Link to="/products">Products</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
