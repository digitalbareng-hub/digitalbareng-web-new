import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wand2, Clapperboard, Bot, CalendarDays, Search, Palette, Layers, Box, Zap, Sparkles, ExternalLink, Database } from 'lucide-react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Helmet } from 'react-helmet-async';

export default function Tools() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login', { replace: true });
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const freeTools = [
    {
      title: 'dbmetadata',
      desc: 'Tool andalan untuk generate Judul, Deskripsi & Keywords otomatis berbasis Vision AI untuk Adobe Stock dan Pngtree.',
      icon: <Wand2 className="w-6 h-6 text-orange-600" />,
      tagText: 'FAVORIT',
      tagType: 'HOT',
      path: '/tools/dbmetadata'
    },
    {
      title: 'StockrankerPro',
      desc: 'Platform riset pasar microstock untuk menemukan keyword yang laku dan trend yang sedang booming secara real-time.',
      icon: <Search className="w-6 h-6 text-orange-600" />,
      tagText: 'FREE',
      tagType: 'FREE',
      href: 'https://stockrankerpro.vercel.app/'
    },
    {
      title: 'DBmotion',
      desc: 'Buat video promosi animasi mikro secara instan untuk kebutuhan marketing aset digital Anda.',
      icon: <Clapperboard className="w-6 h-6 text-orange-600" />,
      tagText: 'WEB APP',
      tagType: 'NORMAL',
      href: 'https://dbmotion.digitalbareng.com/'
    },
    {
      title: 'Calendar Content Dunia',
      desc: 'Referensi jadwal event penting dunia untuk planning pembuatan aset musiman (Seasonal Assets).',
      icon: <CalendarDays className="w-6 h-6 text-orange-600" />,
      tagText: 'REFERENSI',
      tagType: 'NORMAL',
      path: '/tools/calendar-assets'
    },
    {
      title: 'Prompt Generator',
      desc: 'Versi klasik generator prompt untuk membantu pemula memahami struktur dasar berbicara dengan AI.',
      icon: <Bot className="w-6 h-6 text-orange-600" />,
      tagText: 'BASIC',
      tagType: 'NORMAL',
      path: '/tools/prompt-generator'
    }
  ];

  const proTools = [
    {
      title: 'Data Riset Microstock Lengkap',
      desc: 'Database riset pasar terdalam untuk menemukan ceruk pasar yang sangat menguntungkan di berbagai agensi.',
      icon: <Database className="w-6 h-6 text-white" />,
      tagText: 'PRO ACCESS',
      tagType: 'PRO',
      href: 'https://lynk.id/a/4346371251/xp5oj89kwx98'
    },
    {
      title: 'Prompt Generator Ultimate',
      desc: 'Premium generator untuk menghasilkan prompt AI yang super detail dan berkualitas tinggi (Photo, Vector, Illustration).',
      icon: <Sparkles className="w-6 h-6 text-white" />,
      tagText: 'PRO ACCESS',
      tagType: 'PRO',
      href: 'https://lp-pgu.vercel.app/'
    },
    {
      title: 'Flat Vector Hand Drawn',
      desc: 'Flat Vector Hand Drawn GPT adalah tools AI yang dirancang khusus untuk para kreator yang ingin menghasilkan ilustrasi flat vector hand-drawn dengan cepat, konsisten, dan siap jual.',
      icon: <Palette className="w-6 h-6 text-white" />,
      tagText: 'PRO TOOLS',
      tagType: 'PRO',
      href: 'https://lynk.id/digitalbareng/mmx07r3gm39g'
    },
    {
      title: 'Vector Lexicon',
      desc: 'Generate vector design prompts quickly and accurately. Tools berbasis Gemini Canvas yang membantu kamu membuat prompt ilustrasi flat vector design secara cepat, konsisten, dan siap pakai untuk kebutuhan profesional.',
      icon: <Layers className="w-6 h-6 text-white" />,
      tagText: 'PRO TOOLS',
      tagType: 'PRO',
      href: 'https://clicky.id/digitalbareng/vector-lexicon'
    },
    {
      title: 'Isometric Lexicon',
      desc: 'Generate vector isometric design prompts quickly and accurately. Tools berbasis Gemini Canvas yang membantu kamu membuat prompt ilustrasi isometric flat vector design secara cepat, clean, profesional dan siap pakai untuk kebutuhan profesional.',
      icon: <Box className="w-6 h-6 text-white" />,
      tagText: 'PRO TOOLS',
      tagType: 'PRO',
      href: 'https://clicky.id/digitalbareng/isometric-lexicon'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const getTagStyles = (type: string) => {
    switch (type) {
      case 'HOT': return 'bg-red-50 text-red-600 border-red-100';
      case 'PRO': return 'bg-slate-900 text-white border-slate-800';
      case 'FREE': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const ToolCard = ({ tool }: any) => {
    const isPro = tool.tagType === 'PRO';
    
    const cardContent = (
      <div className={`rounded-[2.5rem] p-8 border transition-all h-full flex flex-col relative overflow-hidden group hover:shadow-2xl duration-300 ${
        isPro 
          ? 'bg-slate-900 border-slate-800 text-white hover:border-orange-500 hover:shadow-orange-900/20' 
          : 'bg-white border-slate-200 text-slate-900 hover:border-orange-500 hover:shadow-orange-600/10'
      } hover:-translate-y-2`}>
        <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-12 -mt-12 transition-colors ${
          isPro ? 'bg-white/5 group-hover:bg-orange-500/10' : 'bg-slate-50 group-hover:bg-orange-50'
        }`}></div>
        
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-transform ${
          isPro ? 'bg-orange-500' : 'bg-orange-50'
        }`}>
          {tool.icon}
        </div>
        
        <div className="mb-6 relative z-10">
          <h3 className={`text-2xl font-black mb-3 tracking-tight transition-colors ${
            isPro ? 'group-hover:text-orange-400' : 'group-hover:text-orange-600'
          }`}>
            {tool.title}
          </h3>
          <p className={`text-sm leading-relaxed font-medium ${isPro ? 'text-slate-400' : 'text-slate-600'}`}>
            {tool.desc}
          </p>
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between relative z-10">
          <span className={`text-[10px] font-black px-4 py-1.5 rounded-xl tracking-wider border transition-colors ${getTagStyles(tool.tagType)}`}>
            {tool.tagText}
          </span>
          
          {tool.href && (
            <div className={`${isPro ? 'text-slate-600 group-hover:text-orange-400' : 'text-slate-300 group-hover:text-orange-500'} transition-colors`}>
              <ExternalLink className="w-5 h-5" />
            </div>
          )}
          {tool.path && (
            <div className={`${isPro ? 'text-slate-600 group-hover:text-orange-400' : 'text-slate-300 group-hover:text-orange-500'} transition-colors`}>
              <Zap className="w-5 h-5 fill-current" />
            </div>
          )}
        </div>
      </div>
    );

    return tool.path ? (
      <Link to={tool.path} className="block h-full no-underline">
        {cardContent}
      </Link>
    ) : (
      <a href={tool.href} target="_blank" rel="noopener noreferrer" className="block h-full no-underline">
        {cardContent}
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-32 pb-24">
      <Helmet>
        <title>Professional Hub Tools Microstock AI | Digital Bareng</title>
        <meta name="description" content="Kumpulan tools premium dan gratis untuk meningkatkan produktivitas kreator microstock AI. Mulai dari generator metadata hingga riset pasar." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <p className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-4">Digital Bareng Ecosystem</p>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight italic">Tools <span className="text-orange-600">Hub</span></h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Efisiensi adalah kunci. Gunakan ekosistem tools kami untuk memenangkan persaingan di pasar microstock global.
          </p>
        </div>

        {/* Free Tools Section */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Free Utility Tools</h2>
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Public Access</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {freeTools.map((tool, idx) => (
              <ToolCard key={idx} tool={tool} />
            ))}
          </div>
        </div>

        {/* Pro Tools Section */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Premium Ecosystem</h2>
            <div className="h-px bg-slate-200 flex-1"></div>
            <div className="flex items-center gap-2 px-3 py-1 bg-orange-600 text-white rounded-lg text-[10px] font-black uppercase tracking-tighter">
              <Zap className="w-3 h-3 fill-current" /> High Performance
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proTools.map((tool, idx) => (
              <ToolCard key={idx} tool={tool} />
            ))}
          </div>
        </div>

        <div className="mt-24 p-12 md:p-16 bg-slate-900 rounded-[3rem] text-white text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl group-hover:bg-orange-600/30 transition-all duration-700"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-700"></div>
          
          <h2 className="text-3xl md:text-5xl font-black mb-8 relative z-10 tracking-tight">Butuh Tool Khusus Lainnya?</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto relative z-10 font-medium leading-relaxed">
            Kami terus mengambangkan ekosistem ini. Punya ide tool yang bisa mempercepat workflow Microstock AI? Sampaikan ke tim kami.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-3 bg-orange-600 text-white px-10 py-5 rounded-2xl font-black hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 relative z-10 group/btn active:scale-95">
            HUBUNGI TIM DEVELOPER <Bot className="w-6 h-6 group-hover/btn:rotate-12 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
