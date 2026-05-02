import { ArrowRight, Globe, LogIn, CheckCircle2, Loader2, X, Wallet, TrendingUp, Sparkles, CircleDollarSign } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { articlesData } from '../lib/articles';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
      if (currentUser) {
        setFormData(prev => ({ ...prev, email: currentUser.email || '', name: currentUser.displayName || '' }));
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    navigate('/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const dbRef = collection(db, 'consultations');
      await addDoc(dbRef, {
        userId: user.uid,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
        setFormData({ name: user.displayName || '', email: user.email || '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Error submitting consultation:', error);
      alert('Gagal mengirim pesan: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Hero Section */}
      <section className="py-20 text-center relative overflow-hidden">
        {/* Floating Flat Gradient Icons */}
        <motion.div
          className="absolute top-0 left-0 md:left-10 w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 z-0"
          animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <TrendingUp className="text-white w-8 h-8 md:w-12 md:h-12" strokeWidth={1.5} />
        </motion.div>
        
        <motion.div
          className="absolute bottom-0 right-0 md:right-10 w-20 h-20 md:w-28 md:h-28 rounded-[2rem] bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 z-0"
          animate={{ y: [0, 20, 0], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Wallet className="text-white w-10 h-10 md:w-14 md:h-14" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          className="absolute top-20 right-5 md:right-32 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-bl from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 hidden sm:flex z-0"
          animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Sparkles className="text-white w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-5 md:left-24 w-14 h-14 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 hidden sm:flex z-0"
          animate={{ y: [0, 15, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <CircleDollarSign className="text-white w-7 h-7 md:w-10 md:h-10" strokeWidth={1.5} />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-sm font-semibold tracking-wide shadow-sm">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">MICROSTOCK AI & INCOME GUIDE</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Microstock AI: <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Bangun Income Online dari Nol</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Pelajari microstock AI, tools berbasis kecerdasan buatan, dan strategi income digital berdasarkan pengalaman nyata. Tanpa overclaim, murni praktik.
          </p>
          <Link to="/guide" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5">
            Mulai Sekarang
          </Link>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 border-t border-slate-200 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none z-0 flex justify-center items-center opacity-40 lg:opacity-100">
          {/* Adobe Stock Proof */}
          <motion.div
            className="absolute top-4 left-2 md:left-8 lg:left-12 bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-2xl p-4 flex items-center gap-4 w-[240px] sm:w-[260px]"
            animate={{ y: [0, -15, 0], rotate: [-2, 1, -2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 shadow-inner">
              <CircleDollarSign size={24} strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Payout Received</p>
              <p className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">Adobe Stock</p>
              <p className="text-base sm:text-lg font-black text-emerald-600 mt-0.5">+$3,450.00</p>
            </div>
          </motion.div>

          {/* Envato Proof */}
          <motion.div
            className="absolute top-32 right-2 md:right-8 lg:right-12 bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-2xl p-4 flex items-center gap-4 w-[240px] sm:w-[260px]"
            animate={{ y: [0, 20, 0], rotate: [2, -1, 2] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 shadow-inner">
              <CircleDollarSign size={24} strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Payout Received</p>
              <p className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">Envato Market</p>
              <p className="text-base sm:text-lg font-black text-emerald-600 mt-0.5">+$4,890.75</p>
            </div>
          </motion.div>

          {/* Shutterstock Proof */}
          <motion.div
            className="absolute bottom-4 left-10 md:left-32 lg:left-40 bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-2xl p-4 flex items-center gap-4 w-[240px] sm:w-[260px]"
            animate={{ y: [0, -10, 0], rotate: [-1, 2, -1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 shadow-inner">
              <CircleDollarSign size={24} strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Payout Received</p>
              <p className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">Shutterstock</p>
              <p className="text-base sm:text-lg font-black text-emerald-600 mt-0.5">+$2,180.50</p>
            </div>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10 px-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">
              Hello, <span className="font-light italic text-slate-600">Salam Kenal</span>
            </h2>
            <h3 className="text-2xl font-bold text-blue-600">digitalbareng</h3>
          </div>
          <p className="text-lg text-slate-700 leading-relaxed">
            Berhenti cuma jadi penonton! Saatnya ubah internet jadi mesin pencetak uangmu. Dengan kekuatan <strong>microstock AI</strong>, aku akan pandu kamu step-by-step meraup income dalam Dollar & Rupiah, 100% <strong>#DariRumahAja</strong>.
          </p>

          <div className="pt-6">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Multi-Platform Contributor On Microstock AI:</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white border border-slate-200 shadow-sm text-slate-800 font-bold rounded-lg text-sm flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span> Adobe Stock
              </span>
              <span className="px-4 py-2 bg-white border border-slate-200 shadow-sm text-slate-800 font-bold rounded-lg text-sm flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span> Freepik
              </span>
              <span className="px-4 py-2 bg-white border border-slate-200 shadow-sm text-slate-800 font-bold rounded-lg text-sm flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500"></span> Vecteezy
              </span>
              <span className="px-4 py-2 bg-white border border-slate-200 shadow-sm text-slate-800 font-bold rounded-lg text-sm flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-600"></span> Shutterstock
              </span>
              <span className="px-4 py-2 bg-white border border-slate-200 shadow-sm text-slate-800 font-bold rounded-lg text-sm flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-500"></span> Getty Images
              </span>
              <span className="px-4 py-2 bg-white border border-slate-200 shadow-sm text-slate-800 font-bold rounded-lg text-sm flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span> Envato
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-6 font-medium italic">Dan Banyak Lagi...</p>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Artikel Microstock AI Terbaru</h2>
            <p className="text-slate-600">Insight dan strategi microstock AI yang saya pelajari minggu ini.</p>
          </div>
          <Link to="/blog" className="text-blue-600 font-medium hover:underline hidden sm:block">
            Lihat semua →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articlesData.slice(0, 3).map((article) => (
            <Link key={article.id} to={`/blog/${article.id}`} className="group block h-full">
              <article className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-200 h-full flex flex-col overflow-hidden">
                <div className="w-full h-48 bg-slate-100 overflow-hidden relative">
                  <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-medium px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full">{article.category}</span>
                    <time className="text-xs text-slate-400">{article.date}</time>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {article.description}
                  </p>
                  <div className="text-blue-600 text-sm font-medium flex items-center gap-1 mt-auto">
                    Baca selengkapnya <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link to="/blog" className="text-blue-600 font-medium hover:underline">
            Lihat semua artikel →
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-center text-white my-16 shadow-xl shadow-blue-600/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Memulai Microstock AI?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Pelajari step-by-step bagaimana saya membangun portfolio microstock AI dan memanfaatkan kecerdasan buatan untuk mempercepat workflow produksi aset.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/guide" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
              Mulai Baca Guide
            </Link>
            <Link to="/tools" className="bg-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition-colors border border-blue-500">
              Lihat Tools Saya
            </Link>
          </div>
        </div>
      </section>

      {/* Modal Konsultasi */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-xl text-slate-900">Mulai Konsultasi</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Pesan Terkirim!</h4>
                  <p className="text-slate-600">Terima kasih, tim kami akan segera menghubungi Anda kembali.</p>
                </div>
              ) : !user ? (
                <div className="text-center py-8">
                  <h4 className="text-lg font-medium text-slate-900 mb-4">Silakan login terlebih dahulu untuk mengirim pesan.</h4>
                  <button 
                    onClick={handleLogin}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors w-full"
                  >
                    <LogIn className="w-5 h-5" />
                    Buka Halaman Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 bg-slate-50 focus:bg-white"
                      placeholder="Masukkan nama Anda"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      disabled
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-slate-500 mt-1">Menggunakan email akun terkait.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Pesan / Ide Proyek</label>
                    <textarea 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 bg-slate-50 focus:bg-white resize-none"
                      placeholder="Ceritakan sedikit tentang proyek yang ingin Anda bangun..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting || !formData.message.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      'Kirim Pesan'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
