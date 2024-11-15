import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';

function Layout({ children, username }) {
  return (
    <>
      <Header username={username} />
      {children}
      <Footer />
    </>
  );
}

function App() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout username={username}>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/auth"
          element={<Auth setUsername={setUsername} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
