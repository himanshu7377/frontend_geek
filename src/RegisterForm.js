import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    profession: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // Registration successful
        console.log('User registered successfully');
        toast.success('User registered successfully', {
          autoClose: 3000 // Set the duration in milliseconds (3 seconds in this case)
        });
        window.location.href = '/login';
        // Redirect or show a success message
      } else {
        // Registration failed
        console.error('Registration failed');
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <div className="w-50">
        <h2 className="mb-4 text-center">Register</h2>
        <Form onSubmit={handleRegister}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your phone number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProfession">
            <Form.Label>Profession</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your profession"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit" className="mt-3 w-50">
              Register
            </Button>
          </div>
        </Form>
        <ToastContainer />
      </div>
    </Container>
  );
};

export default RegisterForm;
