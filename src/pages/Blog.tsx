import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, PenTool, Image, Sparkles } from 'lucide-react';
import { articlesData } from '../lib/articles';

export default function Blog() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Artikel Microstock AI</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Insight, tutorial, dan tips praktis seputar microstock AI. Pelajari cara menghasilkan income dari karya digitalmu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesData.map((article) => (
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
      </div>
    </div>
  );
}
