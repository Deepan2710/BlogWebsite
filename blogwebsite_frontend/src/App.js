import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import IndexPage from './pages/IndexPage.js';
import LoginPage from './pages/LoginPage.js';
import SignupPage from './pages/SignupPage.js';
import BlogViewPage from './pages/BlogViewPage.js';
import BlogAddPage from './pages/BlogAddPage.js';
import ResetPasswordPage from './pages/ResetPasswordPage.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/index" />} />
        <Route path="/index" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/blog_view" element={<BlogViewPage />} />
        <Route path="/blog_add" element={<BlogAddPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

      </Routes>
    </Router>
  );
}

export default App;
