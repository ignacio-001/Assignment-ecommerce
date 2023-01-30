import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function RegistrationForm  ()  {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate=useNavigate();
  async function handleSubmit(event){
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/register", {
        email,
        password,
        name,
      });

      // Redirect to the login page
        navigate("/login");
    } catch (error) {
      console.log(error);
      setErrorMessage("Error creating account. Please try again.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
         onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    );
  };
  export default RegistrationForm;
