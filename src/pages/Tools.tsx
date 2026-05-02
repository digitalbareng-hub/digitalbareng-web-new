import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cpu, MonitorPlay, MousePointer2, Image as ImageIcon } from 'lucide-react';

export default function Tools() {
  const categories = [
    {
      title: 'AI Image Generators',
      icon: <ImageIcon className="w-6 h-6 text-blue-500" />,
      items: [
        { name: 'Midjourney', desc: 'Gen-AI untuk artistic, photorealistic images kualitas tinggi. Wajib dicoba untuk microstock.', isPro: true },
        { name: 'Leonardo AI', desc: 'Alternatif gratis dengan kuota harian yang cukup besar. Punya fitur styling yang bagus.', isPro: false },
        { name: 'DALL-E 3', desc: 'Generator dari OpenAI yang terintegrasi di ChatGPT Plus. Sangat patuh pada prompt.', isPro: true }
      ]
    },
    {
      title: 'Upscale & Enhancement',
      icon: <Cpu className="w-6 h-6 text-emerald-500" />,
      items: [
        { name: 'Upscayl', desc: 'Software open-source gratis untuk desktop. Sangat direkomendasikan untuk batch upscale cepat.', isPro: false },
        { name: 'Topaz Gigapixel', desc: 'Tool premium andalan pro untuk upscaling dengan preserve detail yang sangat baik.', isPro: true },
        { name: 'Magnific AI', desc: 'AI upscaler generasi baru dengan fitur "enhance" dan "relight". Premium tier.', isPro: true }
      ]
    },
    {
      title: 'Workflow & Manajemen',
      icon: <MonitorPlay className="w-6 h-6 text-purple-500" />,
      items: [
        { name: 'Xpiks', desc: 'Software andalan untuk keywording dan mengunggah (FTP) ke banyak microstock sekaligus.', isPro: false },
        { name: 'Microstock Plus', desc: 'Sistem berbasis web untuk distribusi file ke multi-agency. Memudahkan manajemen aset.', isPro: true },
        { name: 'ImStocker', desc: 'Tool keywording terbaik, otomatis memberikan saran tag berdasarkan gambar yang serupa.', isPro: false }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Tools Wajib Contributor</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Senjata rahasia yang saya gunakan sehari-hari untuk memproduksi dan mendistribusikan puluhan ribu aset AI ke berbagai platform microstock.
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((cat, i) => (
            <div key={i}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                  {cat.icon}
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{cat.title}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((tool, j) => (
                  <div key={j} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-blue-300 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-slate-900">{tool.name}</h3>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tool.isPro ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {tool.isPro ? 'PREMIUM' : 'FREE'}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{tool.desc}</p>
                    <button className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 transition-colors">
                      Pelajari Tool ini <MousePointer2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
