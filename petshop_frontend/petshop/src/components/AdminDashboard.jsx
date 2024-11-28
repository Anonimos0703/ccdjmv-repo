import React from 'react';
import { useAdminAuth } from './AdminAuthProvider'; // Admin authentication context

const AdminDashboard = () => {
  const { admin } = useAdminAuth();

  return (
    <div>
      <h1>Welcome to the Admin Dashboard</h1>
      <p>Hello, {admin?.user}!</p>
      <p>This is a protected page only accessible to logged-in admins.</p>
      {/* You can add more admin-related functionalities here */}
    </div>
  );
};

export default AdminDashboard;
