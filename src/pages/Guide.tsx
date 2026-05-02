import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, PlayCircle, Map, Target } from 'lucide-react';
import SEO from '../components/SEO';

export default function Guide() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-12">
      <SEO 
        title="Panduan Microstock AI 2026 - Roadmap Dari Nol | Digital Bareng"
        description="Roadmap lengkap cara menghasilkan Dollar dari Microstock AI. Panduan step-by-step persiapan, produksi, hingga distribusi aset digital."
        keywords="panduan microstock, roadmap ai, belajar adobe stock, pngtree strategy"
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 mb-6 shadow-sm">
            <Map className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Ultimate Roadmap: Microstock AI</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Panduan eksklusif dari <strong>Digital Bareng</strong> untuk membantumu mendulang dollar melalui aset visual AI secara efisien.
          </p>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-16 -mt-16 z-0 group-hover:bg-orange-100 transition-colors"></div>
            <div className="relative z-10">
              <div className="text-orange-600 font-bold tracking-widest text-xs mb-3 uppercase">FASE 1: STRATEGI & PERSIAPAN</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Fondasi & Pendaftaran Akun</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Di Digital Bareng, kami selalu mulai dengan riset. Pahami platform mana yang membayar paling besar dan agency mana yang paling ramah kreator AI saat ini.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Daftar Adobe Stock Contributor (Prioritas Utama).</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Setup akun di Freepik, Pngtree, dan Vecteezy.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-16 -mt-16 z-0 group-hover:bg-orange-100 transition-colors"></div>
            <div className="relative z-10">
              <div className="text-orange-600 font-bold tracking-widest text-xs mb-3 uppercase">FASE 2: PRODUKSI SKALA BESAR</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Prompting & Quality Control</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Skill terpenting: menciptakan prompt yang menghasilkan aset yang secara komersial "laku dijual," bukan sekadar artsy. Gunakan AI Prompt Generator kami untuk hasil terbaik.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Gunakan Midjourney atau Leonardo.ai untuk kualitas tinggi.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Lakukan Upscaling hingga resolusi minimal 4000px.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-16 -mt-16 z-0 group-hover:bg-orange-100 transition-colors"></div>
            <div className="relative z-10">
              <div className="text-orange-600 font-bold tracking-widest text-xs mb-3 uppercase">FASE 3: OPTIMASI & MONETISASI</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">SEO Metadata & Upload</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Tembus algoritma agency dengan teknik SEO Microstock ala Digital Bareng. Title dan Keywords yang relevan adalah kunci pendapatan Dollar mengalir.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Gunakan AI MetaGen untuk judul & keyword otomatis.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Mark aset sebagai "Generative AI" secara jujur.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center bg-slate-900 rounded-[2.5rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl group-hover:bg-orange-600/30 transition-all duration-700"></div>
            <Target className="w-16 h-16 mx-auto mb-6 text-orange-500 relative z-10" />
            <h3 className="text-3xl font-extrabold mb-6 relative z-10 leading-tight">Siap Memulai Perjalananmu?</h3>
            <p className="text-slate-400 mb-10 max-w-lg mx-auto text-lg relative z-10">
              Dapatkan insight eksklusif dan strategi terbaru seputar microstock AI langsung di blog resmi Digital Bareng.
            </p>
            <Link reloadDocument to="/blog" className="inline-flex items-center gap-3 bg-orange-600 text-white px-10 py-4 rounded-full font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 relative z-10">
              Mulai Baca Artikel Strategi <PlayCircle className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
