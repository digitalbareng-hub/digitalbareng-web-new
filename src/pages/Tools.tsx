import React from 'react';
import { Upload, LayoutGrid, TrendingUp, Activity, Star, BookTemplate, Copy, Check } from 'lucide-react';

export default function Tools() {
  const [copied, setCopied] = React.useState(false);
  const command = 'git clone https://github.com/digitalbareng-hub/dbmotion.git';

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toolsList = [
    {
      title: 'AI MetaGen',
      desc: 'Generate Judul & Keywords otomatis berbasis AI untuk Adobe Stock dan Pngtree.',
      icon: <Upload className="w-6 h-6 text-blue-600" />,
      tagText: '🔥 FAVORIT',
      tagColor: 'bg-green-100 text-green-700',
    },
    {
      title: 'UltraResizer',
      desc: 'Optimasi resolusi gambar massal untuk memenuhi standar kualitas agensi.',
      icon: <LayoutGrid className="w-6 h-6 text-blue-600" />,
      tagText: 'DESKTOP APP',
      tagColor: 'bg-purple-100 text-purple-700',
    },
    {
      title: 'TrendMaster',
      desc: 'Analisis tren konten microstock yang akan ramai di masa mendatang.',
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      tagText: 'RISET',
      tagColor: 'bg-blue-100 text-blue-700',
    },
    {
      title: 'DBmotion',
      desc: 'Membuat animasi dengan remotion. Source code tersedia di GitHub repository.',
      icon: <Activity className="w-6 h-6 text-blue-600" />,
      tagText: 'ANIMATION',
      tagColor: 'bg-fuchsia-100 text-fuchsia-700',
      isGit: true,
    },
    {
      title: 'Prompt Generator',
      desc: 'Panduan membuat prompt AI Image yang akurat untuk hasil yang menjual.',
      icon: <Star className="w-6 h-6 text-blue-600" />,
      tagText: 'AI TOOL',
      tagColor: 'bg-blue-100 text-blue-700',
    },
    {
      title: 'Calendar Assets',
      desc: 'Template layout kalender siap pakai untuk project desain microstock.',
      icon: <BookTemplate className="w-6 h-6 text-blue-600" />,
      tagText: 'TEMPLATE',
      tagColor: 'bg-blue-100 text-blue-700',
    }
  ];

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
          {toolsList.map((tool, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                {tool.icon}
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">{tool.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{tool.desc}</p>
              
              {tool.isGit && (
                <div className="mb-6 bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between">
                  <code className="text-xs text-slate-700 font-mono overflow-x-auto whitespace-nowrap no-scrollbar">{command}</code>
                  <button 
                    onClick={handleCopy}
                    className="ml-3 p-1.5 hover:bg-slate-200 text-slate-500 rounded transition-colors shrink-0"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}

              <div className="mt-auto">
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full tracking-wider ${tool.tagColor}`}>
                  {tool.tagText}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
