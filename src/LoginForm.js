import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Login successful
        console.log('Login successful');
        window.location.href = '/home';
        // Redirect or show a success message
      } else {
        // Login failed
        console.error('Login failed');
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div style={{ width: '500px', margin: 'auto',marginTop:'90px' }}>
      <h1 className="text-center">LOGIN</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formLoginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formLoginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className="text-center mt-4">
          <Button variant="primary" type="submit" style={{ width: '200px' }}>
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
