import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User as UserIcon, Mail, LogOut, CheckCircle2, AlertCircle, RefreshCw, Key, ShieldCheck, Eye, EyeOff, ExternalLink, Trash2, Zap } from 'lucide-react';
import { auth, logout } from '../lib/firebase';
import { onAuthStateChanged, User, sendEmailVerification } from 'firebase/auth';
import { useGeminiKey } from '../contexts/GeminiKeyContext';
import { Helmet } from 'react-helmet-async';

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [showKey, setShowKey] = useState(false);
  const { geminiKey, setGeminiKey, isUsingGlobalFallback, hasUserKey } = useGeminiKey();
  const [tempKey, setTempKey] = useState(hasUserKey ? (geminiKey || '') : '');
  const [keySaved, setKeySaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/login');
      } else {
        setUser(currentUser);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSaveKey = () => {
    if (!tempKey.trim()) return;
    setGeminiKey(tempKey);
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 3000);
  };

  const handleClearKey = () => {
    setGeminiKey(null);
    setTempKey('');
  };

  const handleResendVerification = async () => {
    if (!user) return;
    setIsResending(true);
    setResendMessage('');
    try {
      await sendEmailVerification(user);
      setResendMessage('Tautan verifikasi telah dikirim ke email Anda.');
    } catch (error) {
      setResendMessage('Gagal mengirim email verifikasi. Coba lagi nanti.');
    } finally {
      setIsResending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-orange-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Helmet>
        <title>Profil Saya | Digital Bareng</title>
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors mb-8 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold">Kembali ke Beranda</span>
        </Link>
        
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden mb-8 transition-all">
          <div className="p-8 sm:p-12 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 bg-gradient-to-br from-white to-slate-50/50">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-24 h-24 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center text-4xl font-black shadow-lg shadow-orange-100 transition-transform group-hover:scale-105 duration-300">
                  {user.displayName ? user.displayName[0].toUpperCase() : user.email?.[0].toUpperCase()}
                </div>
                {user.emailVerified && (
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-xl border-4 border-white">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">{user.displayName || 'Creator'}</h1>
                <p className="text-slate-500 font-medium">{user.email}</p>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 font-bold transition-all"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </button>
          </div>
          
          <div className="p-8 sm:p-12">
            <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Akun Kamu</h2>
            
            <div className="grid grid-cols-1 gap-8">
              <div className="flex items-start gap-5 p-6 rounded-3xl bg-slate-50/50 border border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 shrink-0">
                  <UserIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Nama Lengkap</p>
                  <p className="text-slate-900 font-extrabold text-lg">{user.displayName || 'Belum diatur'}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-5 p-6 rounded-3xl bg-slate-50/50 border border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Alamat Email</p>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <p className="text-slate-900 font-extrabold text-lg">{user.email}</p>
                    
                    {user.emailVerified ? (
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-700 text-sm font-black">
                        <CheckCircle2 className="w-4 h-4" />
                        AKUN VERIFIED
                      </span>
                    ) : (
                      <div className="flex flex-col sm:items-end gap-2">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-100 text-amber-700 text-sm font-black">
                          <AlertCircle className="w-4 h-4" />
                          BELUM VERIFIKASI
                        </span>
                        <button 
                          onClick={handleResendVerification}
                          disabled={isResending}
                          className="text-sm text-orange-600 hover:text-orange-700 font-bold flex items-center gap-2 underline underline-offset-4"
                        >
                          {isResending && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                          Kirim ulang link verifikasi
                        </button>
                        {resendMessage && <p className="text-xs text-slate-500 font-medium">{resendMessage}</p>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gemini API Key Section */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden transition-all group hover:border-orange-200">
          <div className="p-8 sm:p-12 border-b border-slate-100 bg-orange-50/30">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform">
                <Key className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">AI Power Tools</h2>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <p className="text-slate-500 font-medium">Aktifkan tools AI menggunakan API Key kamu sendiri.</p>
                  {isUsingGlobalFallback && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-orange-100 text-orange-700 text-[10px] font-black tracking-tighter uppercase whitespace-nowrap">
                      <Zap className="w-3 h-3 fill-current" /> Auto Key Active
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-8 sm:p-12">
            <div className="bg-slate-900 text-white rounded-[2rem] p-8 mb-10 flex flex-col md:flex-row gap-6 items-center border border-slate-800 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
              <ShieldCheck className="w-12 h-12 text-orange-500 shrink-0 relative z-10" />
              <div className="text-sm leading-relaxed relative z-10">
                <p className="font-black text-lg mb-2 text-white">Privasi Kamu Terjamin</p>
                <p className="text-slate-400">API Key kamu disimpan <strong>langsung di browser kamu</strong> (localStorage). Tim Digital Bareng tidak pernah menyimpan atau melihat kunci API kamu. Kunci ini hanya digunakan untuk akses tools AI secara langsung.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Google AI Key (Gemini)</label>
                  {hasUserKey && (
                    <button 
                      onClick={handleClearKey}
                      className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Hapus Kunci
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={tempKey}
                    onChange={(e) => setTempKey(e.target.value)}
                    placeholder={isUsingGlobalFallback ? "Kunci otomatis aktif, masukkan kunci baru untuk mengganti..." : "Masukkan API Key (AIza...)"}
                    className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-orange-500 outline-none transition-all pr-14 font-mono text-slate-900 font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-orange-600 transition-colors"
                  >
                    {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6 p-2">
                  <a 
                    href="https://aistudio.google.com/app/apikey" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-orange-600 font-bold inline-flex items-center gap-2 border-b-2 border-transparent hover:border-orange-600 transition-all pb-1 group"
                  >
                    Dapatkan Kunci Gratis di Google AI Studio
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  
                  <button
                    onClick={handleSaveKey}
                    disabled={!tempKey.trim()}
                    className={`min-w-[220px] py-4 px-8 rounded-2xl font-black transition-all flex items-center justify-center gap-3 active:scale-95 ${
                      keySaved 
                        ? 'bg-emerald-500 text-white shadow-emerald-200 shadow-xl' 
                        : 'bg-orange-600 text-white hover:bg-orange-700 shadow-xl shadow-orange-100 disabled:opacity-50 disabled:grayscale'
                    }`}
                  >
                    {keySaved ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        SIAP DIGUNAKAN!
                      </>
                    ) : (
                      <>
                        <RefreshCw className={`w-5 h-5 ${keySaved ? '' : ''}`} />
                        UPDATE API KEY
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
