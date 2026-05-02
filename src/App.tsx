/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import Blog from './pages/Blog';
import Tools from './pages/Tools';
import Guide from './pages/Guide';
import ArticleDetail from './pages/ArticleDetail';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import Contact from './pages/Contact';
import PromptGenerator from './pages/PromptGenerator';
import DBMetadata from './pages/DBMetadata';
import CalendarAssets from './pages/CalendarAssets';

import { HelmetProvider } from 'react-helmet-async';
import { GeminiKeyProvider } from './contexts/GeminiKeyContext';
import ScrollToTop from './components/ScrollToTop';

import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <GeminiKeyProvider>
          <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<ArticleDetail />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/prompt-generator" element={<PromptGenerator />} />
            <Route path="/tools/dbmetadata" element={<DBMetadata />} />
            <Route path="/tools/calendar-assets" element={<CalendarAssets />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </GeminiKeyProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}
