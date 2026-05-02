import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Loader2, Copy, Check, Key, Bot } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useGeminiKey } from '../contexts/GeminiKeyContext';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function PromptGenerator() {
  const navigate = useNavigate();
  const [loadingRoute, setLoadingRoute] = useState(true);
  const { geminiKey, isKeyConfigured } = useGeminiKey();

  const [keyword, setKeyword] = useState('');
  const [promptResult, setPromptResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login', { replace: true });
      } else {
        setLoadingRoute(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const generatePrompt = async () => {
    if (!keyword.trim()) return;
    if (!isKeyConfigured) {
      setError('Silakan masukkan Gemini API Key di halaman Profil Anda terlebih dahulu.');
      return;
    }
    
    setIsLoading(true);
    setPromptResult('');
    setError('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: geminiKey! });
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: `I want to create a high-quality microstock image. Generate a detailed, professional AI image prompt (in English) based on this concept: "${keyword}". Follow the professional microstock standards recommended by digitalbareng.com. The prompt should include subject details, lighting, camera angle, and artistic style. Keep it under 500 characters.`,
      });
      setPromptResult(response.text?.trim() || 'No prompt generated.');
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes('API key not valid')) {
        setError('API Key Gemini tidak valid. Periksa kembali di halaman Profil.');
      } else {
        setError(err.message || 'Terjadi kesalahan saat membuat prompt.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!promptResult) return;
    navigator.clipboard.writeText(promptResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loadingRoute) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <Helmet>
        <title>AI Prompt Generator - Buat Prompt Gambar Microstock | Digital Bareng</title>
        <meta name="description" content="Ubah ide sederhana menjadi prompt AI Image profesional berbahasa Inggris yang siap jual di Adobe Stock dan agensi microstock lainnya." />
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Bot className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Prompt Generator</h1>
          <p className="text-lg text-slate-600">
            Ubah ide sederhana menjadi prompt AI Image profesional berbasis strategi Digital Bareng.
          </p>
        </div>

        {!isKeyConfigured && (
          <div className="mb-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
              <Key className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-amber-900">API Key Belum Dikonfigurasi</h3>
              <p className="text-sm text-amber-800">Anda perlu memasukkan Gemini API Key di profil Anda untuk menggunakan alat ini secara gratis.</p>
            </div>
            <Link 
              to="/profile" 
              className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-sm transition-colors shrink-0"
            >
              Set Sekarang
            </Link>
          </div>
        )}

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Ide Konten / Keyword Dasar</label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Contoh: kucing minum kopi di cafe"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
            />
            <p className="text-xs text-slate-500 mt-2">Masukkan ide ringkas dalam bahasa Indonesia atau Inggris.</p>
          </div>

          <button
            onClick={generatePrompt}
            disabled={!keyword.trim() || isLoading}
            className="w-full py-3.5 px-4 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 mb-8 shadow-lg shadow-orange-100"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {isLoading ? 'Sedang Meracik Prompt...' : 'Generate Prompt'}
          </button>

          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          {promptResult && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700">Hasil Prompt (English)</label>
                <button 
                  onClick={handleCopy}
                  className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Tersalin' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">
                {promptResult}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
