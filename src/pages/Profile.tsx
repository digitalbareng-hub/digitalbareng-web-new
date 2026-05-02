import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User as UserIcon, Mail, LogOut, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { auth, logout } from '../lib/firebase';
import { onAuthStateChanged, User, sendEmailVerification } from 'firebase/auth';

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Kembali ke Beranda</span>
        </Link>
        
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 sm:p-10 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold">
                {user.displayName ? user.displayName[0].toUpperCase() : user.email?.[0].toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{user.displayName || 'Pengguna'}</h1>
                <p className="text-slate-500">{user.email}</p>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </button>
          </div>
          
          <div className="p-8 sm:p-10">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Informasi Akun</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 text-slate-500">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Nama Lengkap</p>
                  <p className="text-slate-900 font-medium mt-1">{user.displayName || '-'}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 text-slate-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 pb-6">
                  <p className="text-sm font-medium text-slate-500">Alamat Email</p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
                    <p className="text-slate-900 font-medium">{user.email}</p>
                    
                    {user.emailVerified ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4" />
                        Terverifikasi
                      </span>
                    ) : (
                      <div className="flex flex-col sm:items-end gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm font-medium">
                          <AlertCircle className="w-4 h-4" />
                          Belum Terverifikasi
                        </span>
                        <button 
                          onClick={handleResendVerification}
                          disabled={isResending}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1.5"
                        >
                          {isResending ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                          Kirim ulang verifikasi
                        </button>
                        {resendMessage && <p className="text-xs text-slate-500">{resendMessage}</p>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
