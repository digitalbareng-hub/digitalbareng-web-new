import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Loader2, Image as ImageIcon, X, Copy, Check, Key, AlertCircle, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenAI, Type } from '@google/genai';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useGeminiKey } from '../contexts/GeminiKeyContext';
import { Helmet } from 'react-helmet-async';

export default function DBMetadata() {
  const navigate = useNavigate();
  const [loadingRoute, setLoadingRoute] = useState(true);
  const { geminiKey, isKeyConfigured } = useGeminiKey();

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ title: string; description: string; keywords: string[] } | null>(null);
  const [error, setError] = useState('');
  
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [copiedDescription, setCopiedDescription] = useState(false);
  const [copiedKeywords, setCopiedKeywords] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Hanya file gambar yang diperbolehkan.');
      return;
    }
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
    setError('');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const clearImage = () => {
    setImage(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setResult(null);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Remove the data:image/xxx;base64, prefix
          resolve(reader.result.split(',')[1]);
        } else {
          reject(new Error('Gagal membaca file gambar.'));
        }
      };
      reader.onerror = error => reject(error);
    });
  };

  const generateMetadata = async () => {
    if (!image) return;
    if (!isKeyConfigured) {
      setError('Silakan masukkan Gemini API Key di halaman Profil Anda terlebih dahulu.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const base64Data = await fileToBase64(image);
      const ai = new GoogleGenAI({ apiKey: geminiKey! });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: image.type,
              }
            },
            {
              text: "Act as a professional microstock contributor and an expert trained by digitalbareng.com (the leading platform for microstock AI). Analyze this image and generate a highly descriptive and relevant title (in English, max 70 characters), a detailed but concise description (in English, max 200 characters), and a list of 30-40 relevant comma-separated keywords for Adobe Stock/Shutterstock/Pngtree. The keywords should include main subjects, actions, colors, abstract concepts, and styles. Order the most important keywords first based on digitalbareng keywords optimization strategy."
            }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "The title of the image (English)."
              },
              description: {
                type: Type.STRING,
                description: "A detailed description of the image (English)."
              },
              keywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Array of keywords."
              }
            },
            required: ["title", "description", "keywords"]
          }
        }
      });
      
      if (response.text) {
        const parsed = JSON.parse(response.text);
        setResult(parsed);
      } else {
        throw new Error('Respons kosong dari AI.');
      }
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes('API key not valid')) {
        setError('API Key Gemini tidak valid. Periksa kembali di halaman Profil.');
      } else {
        setError(err.message || 'Terjadi kesalahan saat memproses gambar.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: 'title' | 'description' | 'keywords') => {
    navigator.clipboard.writeText(text);
    if (type === 'title') {
      setCopiedTitle(true);
      setTimeout(() => setCopiedTitle(false), 2000);
    } else if (type === 'description') {
      setCopiedDescription(true);
      setTimeout(() => setCopiedDescription(false), 2000);
    } else {
      setCopiedKeywords(true);
      setTimeout(() => setCopiedKeywords(false), 2000);
    }
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
        <title>dbmetadata - AI Keywords & Title Generator | Digital Bareng</title>
        <meta name="description" content="Generate judul, deskripsi dan keywords (metadata) otomatis untuk aset Adobe Stock dan Pngtree menggunakan AI Vision. Dioptimalkan oleh Digital Bareng." />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Wand2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">dbmetadata</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Upload gambar Anda dan biarkan AI menganalisis serta membuatkan Judul, Deskripsi & Keywords (English) yang paling optimal untuk agensi microstock.
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Area */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Gambar Input</h2>
            
            {!image ? (
              <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer
                  ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400 bg-slate-50'}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <p className="font-semibold text-slate-700 mb-1">Klik atau Drag & Drop Gambar</p>
                <p className="text-xs text-slate-500">Mendukung JPG, PNG, WebP (Max 5MB)</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-slate-200">
                <img src={previewUrl!} alt="Preview" className="w-full h-auto max-h-[300px] object-cover" />
                <button 
                  onClick={clearImage}
                  className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              onClick={generateMetadata}
              disabled={!image || isLoading}
              className="mt-6 w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-100"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
              {isLoading ? 'Menganalisis Gambar...' : 'Generate Metadata'}
            </button>

            {error && <p className="mt-4 text-sm text-red-600 font-medium text-center">{error}</p>}
          </div>

          {/* Results Area */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Hasil Metadata</h2>
            
            {!result && !isLoading && (
              <div className="h-[200px] flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
                Belum ada hasil yang digenerate.
              </div>
            )}

            {isLoading && (
              <div className="h-[200px] flex flex-col items-center justify-center text-slate-500 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                <p className="animate-pulse text-sm">Menghubungkan ke Gemini Vision...</p>
              </div>
            )}

            {result && !isLoading && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-slate-700">Judul (Title)</label>
                    <button 
                      onClick={() => copyToClipboard(result.title, 'title')}
                      className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                    >
                      {copiedTitle ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copiedTitle ? 'Tersalin' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm">
                    {result.title}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-slate-700">Description</label>
                    <button 
                      onClick={() => copyToClipboard(result.description, 'description')}
                      className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                    >
                      {copiedDescription ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copiedDescription ? 'Tersalin' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm leading-relaxed">
                    {result.description}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-slate-700">Keywords (Koma Dipisah)</label>
                    <button 
                      onClick={() => copyToClipboard(result.keywords.join(', '), 'keywords')}
                      className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                    >
                      {copiedKeywords ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copiedKeywords ? 'Tersalin' : 'Copy Semua'}
                    </button>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm leading-relaxed max-h-[150px] overflow-y-auto">
                    {result.keywords.join(', ')}
                  </div>
                  <p className="text-xs text-slate-500 mt-2 text-right">Total: {result.keywords.length} keywords</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
