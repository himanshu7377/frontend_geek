// Home.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch all users from the backend when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        if (response.ok) {
          const userData = await response.json();
          setUsers(userData);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdate = (userId) => {
    const userToUpdate = users.find(user => user._id === userId);
    setSelectedUser(userToUpdate);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted user from the list
        setUsers(users.filter(user => user._id !== userId));
        console.log('User deleted successfully');
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedUser),
      });
      if (response.ok) {
        console.log('User updated successfully');
        // Clear the selectedUser state
        setSelectedUser(null);
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h2>All Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Profession</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.profession}</td>
              <td>
                <Button variant="primary" onClick={() => handleUpdate(user._id)}>Update</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedUser && (
        <div>
          <h2>Edit User</h2>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={selectedUser.name} onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})} required />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={selectedUser.email} onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})} required />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="Enter phone number" value={selectedUser.phone} onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})} required />
            </Form.Group>
            <Form.Group controlId="formProfession">
              <Form.Label>Profession</Form.Label>
              <Form.Control type="text" placeholder="Enter profession" value={selectedUser.profession} onChange={(e) => setSelectedUser({...selectedUser, profession: e.target.value})} required />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleUpdateSubmit}>Save</Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Home;
