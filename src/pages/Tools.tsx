import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wand2, Clapperboard, Bot, CalendarDays } from 'lucide-react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

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

  const toolsList = [
    {
      title: 'AI MetaGen',
      desc: 'Generate Judul & Keywords otomatis berbasis AI untuk Adobe Stock dan Pngtree.',
      icon: <Wand2 className="w-6 h-6 text-orange-500" />,
      tagText: '🔥 FAVORIT',
      tagColor: 'bg-green-100 text-green-700',
      path: '/tools/ai-metagen'
    },
    {
      title: 'DBmotion',
      desc: 'Aplikasi berbasis web untuk membuat animasi video promosi secara instan dengan teknologi Remotion.',
      icon: <Clapperboard className="w-6 h-6 text-orange-500" />,
      tagText: 'ANIMATION',
      tagColor: 'bg-fuchsia-100 text-fuchsia-700',
      href: 'https://dbmotion.digitalbareng.com/'
    },
    {
      title: 'Prompt Generator',
      desc: 'Panduan membuat prompt AI Image yang akurat untuk hasil yang menjual.',
      icon: <Bot className="w-6 h-6 text-orange-500" />,
      tagText: 'AI TOOL',
      tagColor: 'bg-blue-100 text-blue-700',
      path: '/tools/prompt-generator'
    },
    {
      title: 'Calendar Assets',
      desc: 'Jadwal event penting dunia untuk referensi pembuatan aset microstock Anda.',
      icon: <CalendarDays className="w-6 h-6 text-orange-500" />,
      tagText: 'REFERENSI',
      tagColor: 'bg-indigo-100 text-indigo-700',
      path: '/tools/calendar-assets'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Eksplorasi Tools</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Gunakan tools berikut untuk memaksimalkan workflow microstock dan kebutuhan konten digital Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolsList.map((tool, idx) => {
            const cardContent = (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm transition-shadow h-full flex flex-col group-hover:border-orange-300 group-hover:shadow-md">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-6">
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">{tool.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{tool.desc}</p>

                <div className="mt-auto">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full tracking-wider ${tool.tagColor}`}>
                    {tool.tagText}
                  </span>
                </div>
              </div>
            );

            return tool.path ? (
              <Link to={tool.path} key={idx} className="block group h-full cursor-pointer">
                {cardContent}
              </Link>
            ) : tool.href ? (
              <a href={tool.href} target="_blank" rel="noopener noreferrer" key={idx} className="block group h-full cursor-pointer">
                {cardContent}
              </a>
            ) : (
              <div key={idx} className="block group h-full">
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
