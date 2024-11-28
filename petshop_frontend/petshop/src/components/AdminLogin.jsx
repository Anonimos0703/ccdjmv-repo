import React, { useState } from 'react';
import { useAdminAuth } from './AdminAuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [user, setUser] = useState(''); // Correct state for 'user'
  const [password, setPassword] = useState('');
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Pass query parameters
      const response = await axios.post('http://localhost:8080/admin/login', null, {
        params: { user, password }, // Query parameters directly from state
      });
      console.log('Full response:', response);  
      if (response.status === 200) {
        login(user);
        console.log('Login successful, navigating to dashboard');
        navigate('/admin/dashboard'); // This should now work
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Invalid credentials');
        alert('Invalid username or password');
      } else {
        console.error('Something went wrong', error);
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={user} // Use 'user' as state variable
          onChange={(e) => setUser(e.target.value)} // Update 'user' state
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
