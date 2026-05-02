import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Under Construction</h1>
        <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
          Halaman yang Anda tuju sedang dalam tahap pengembangan atau tidak ditemukan.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
