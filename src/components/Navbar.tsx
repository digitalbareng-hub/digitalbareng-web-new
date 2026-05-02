import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Globe, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjskHwULPmRQcVE7FW7sCLElHzvCDtb9ziFMYFV_tAeVrm_QoRgpz8_tMb51xXxETXdilfW_-xJDj5OwIAWzWQRcr-4DT0dLJtEdwvMEudzGktBREUgxaJ66FZkM2RjslWTe_Be4vISWFkhHLOyk34MqyF0sNUKhAX8eJ3OM-UIZ25zhg/s1600/ChatGPT%20Image%20May%202,%202026,%2010_45_07%20AM.png" alt="DigitalBareng Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Digital<span className="text-orange-600">Bareng</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`font-medium transition-colors ${location.pathname === '/' ? 'text-orange-600' : 'text-slate-600 hover:text-orange-600'}`}>Beranda</Link>
            <Link to="/guide" className={`font-medium transition-colors ${location.pathname === '/guide' ? 'text-orange-600' : 'text-slate-600 hover:text-orange-600'}`}>Guide</Link>
            <Link to="/tools" className={`font-medium transition-colors ${location.pathname === '/tools' ? 'text-orange-600' : 'text-slate-600 hover:text-orange-600'}`}>Tools</Link>
            <Link to="/blog" className={`font-medium transition-colors ${location.pathname.startsWith('/blog') ? 'text-orange-600' : 'text-slate-600 hover:text-orange-600'}`}>Blog</Link>
            
            {isAuthLoading ? (
              <div className="w-8 h-8 rounded-full border-2 border-orange-600 border-t-transparent animate-spin"></div>
            ) : user ? (
              <div className="flex items-center gap-4">
                <div className="text-sm text-slate-600 hidden lg:block">
                  Halo, <span className="font-semibold text-slate-900">{user.displayName?.split(' ')[0] || user.email?.split('@')[0]}</span>
                </div>
                <Link 
                  to="/profile"
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-full font-medium transition-colors"
                >
                  Profil
                </Link>
              </div>
            ) : (
              <Link 
                to="/login"
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-orange-600/10 hover:shadow-orange-600/20"
              >
                Log In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full px-4 pt-2 pb-6 shadow-lg shadow-slate-200/20">
          <div className="flex flex-col space-y-4 text-center mt-4">
            <Link to="/" className="text-slate-700 font-medium text-lg py-2">Beranda</Link>
            <Link to="/guide" className="text-slate-700 font-medium text-lg py-2">Guide</Link>
            <Link to="/tools" className="text-slate-700 font-medium text-lg py-2">Tools</Link>
            <Link to="/blog" className="text-slate-700 font-medium text-lg py-2 border-b border-slate-100 pb-4">Blog</Link>
            
            {isAuthLoading ? (
              <div className="flex justify-center py-2">
                <div className="w-8 h-8 rounded-full border-2 border-orange-600 border-t-transparent animate-spin"></div>
              </div>
            ) : user ? (
              <div className="flex flex-col items-center gap-4 pt-2">
                 <div className="text-sm text-slate-600">
                  Logged in as <span className="font-semibold text-slate-900">{user.email}</span>
                </div>
                <Link 
                  to="/profile"
                  className="w-full max-w-xs flex justify-center items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-xl font-medium transition-colors"
                >
                  Profil Saya
                </Link>
              </div>
            ) : (
              <Link 
                to="/login"
                className="w-full max-w-xs mx-auto flex justify-center bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-xl font-bold transition-colors mt-2 shadow-lg shadow-orange-600/10"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
