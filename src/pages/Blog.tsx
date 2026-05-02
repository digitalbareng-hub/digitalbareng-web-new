import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, PenTool, Image, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import { articlesData } from '../lib/articles';

export default function Blog() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-12">
      <SEO 
        title="Blog Microstock AI - Strategi & Tutorial Terbaru | Digital Bareng"
        description="Kumpulan artikel strategi microstock AI, tutorial, dan tips menghasilkan Dollar dari internet. Temukan insight terbaru hanya di Digital Bareng."
        keywords="blog microstock, tutorial adobe stock, trik pngtree, ai microstock strategy"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold tracking-widest uppercase">INSIGHT & STRATEGY</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Blog Microstock AI</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Panduan terlengkap dari Digital Bareng untuk membantumu mendominasi pasar microstock menggunakan teknologi AI terbaru.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesData.map((article) => (
            <Link key={article.id} to={`/blog/${article.id}`} className="group block h-full">
              <article className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-orange-200 h-full flex flex-col overflow-hidden">
                <div className="w-full h-52 bg-slate-100 overflow-hidden relative">
                  <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 font-bold" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold px-3 py-1 bg-white/90 backdrop-blur-sm text-orange-600 rounded-full shadow-sm tracking-wider uppercase border border-white">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <time className="text-xs text-slate-400 font-bold tracking-tight">{article.date}</time>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {article.description}
                  </p>
                  <div className="text-orange-600 text-sm font-bold flex items-center gap-1 mt-auto group-hover:gap-2 transition-all">
                    Baca Strategi Ini <span>→</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
