import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';

function Layout({ children, username, role }) {
  return (
    <>
      <Header username={username} role={role} />
      {children}
      <Footer />
    </>
  );
}

function App() {
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');
    if (storedUsername) setUsername(storedUsername);
    if (storedRole) setRole(storedRole);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout username={username} role={role}>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/auth"
          element={<Auth setUsername={setUsername} setRole={setRole} />}
        />
         <Route
          path="/aboutus"
          element={
            <Layout username={username} role={role}>
              <AboutUs />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;