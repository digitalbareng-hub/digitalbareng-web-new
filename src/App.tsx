/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { HelmetProvider } from 'react-helmet-async';
import { GeminiKeyProvider } from './contexts/GeminiKeyContext';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Profile = lazy(() => import('./pages/Profile'));
const Blog = lazy(() => import('./pages/Blog'));
const Tools = lazy(() => import('./pages/Tools'));
const Guide = lazy(() => import('./pages/Guide'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const Contact = lazy(() => import('./pages/Contact'));
const PromptGenerator = lazy(() => import('./pages/PromptGenerator'));
const DBMetadata = lazy(() => import('./pages/DBMetadata'));
const CalendarAssets = lazy(() => import('./pages/CalendarAssets'));

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <GeminiKeyProvider>
          <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full"></div></div>}>
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
          </Suspense>
          <Footer />
        </BrowserRouter>
      </GeminiKeyProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}
