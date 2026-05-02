import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Loader2, Copy, Check } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function PromptGenerator() {
  const navigate = useNavigate();
  const [loadingRoute, setLoadingRoute] = useState(true);

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
    
    setIsLoading(true);
    setPromptResult('');
    setError('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `I want to create a high-quality microstock image. Generate a detailed, professional AI image prompt (in English) based on this concept: "${keyword}". The prompt should include subject details, lighting, camera angle, and artistic style. Keep it under 500 characters.`,
      });
      setPromptResult(response.text?.trim() || 'No prompt generated.');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Terjadi kesalahan saat membuat prompt.');
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
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Prompt Generator</h1>
          <p className="text-lg text-slate-600">
            Ubah ide sederhana menjadi prompt AI Image profesional berbahasa Inggris yang siap jual di microstock.
          </p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Ide Konten / Keyword Dasar</label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Contoh: kucing minum kopi di cafe"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            />
            <p className="text-xs text-slate-500 mt-2">Masukkan ide ringkas dalam bahasa Indonesia atau Inggris.</p>
          </div>

          <button
            onClick={generatePrompt}
            disabled={!keyword.trim() || isLoading}
            className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 mb-8"
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
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
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
