import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, PlayCircle, Map, Target } from 'lucide-react';

export default function Guide() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mb-6">
            <Map className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Ultimate Guide: Microstock AI</h1>
          <p className="text-lg text-slate-600">
            Roadmap lengkap untuk pemula. Pelajari langkah demi langkah mendulang dollar dari jualan aset visual AI.
          </p>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 z-0 group-hover:bg-blue-100 transition-colors"></div>
            <div className="relative z-10">
              <div className="text-blue-600 font-bold tracking-widest text-sm mb-2">FASE 1: PERSIAPAN</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Pahami Fundamental & Daftar Akun</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Sebelum men-generate ribuan gambar, pastikan fondasi kamu kuat. Pelajari apa itu microstock, lisensi gambar, dan tren pasar. Lalu, buat akun kontributor di agency terbaik yang menerima AI.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Daftar akun Adobe Stock, Freepik, Vecteezy.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Siapkan metode pembayaran (Payoneer atau PayPal).</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-16 -mt-16 z-0 group-hover:bg-indigo-100 transition-colors"></div>
            <div className="relative z-10">
              <div className="text-indigo-600 font-bold tracking-widest text-sm mb-2">FASE 2: PRODUKSI</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Prompting & Generation Process</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Skill terpenting: berbicara dengan AI (prompting). Kamu harus bisa menghasilkan gambar yang secara komersial "laku dijual," bukan sekadar artsy.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Pilih 1 platform utama (Disarankan: Midjourney).</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Buat formula prompt yang konsisten.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Upscale gambar sesuai standar resolusi minimum (biasanya &gt;4MP).</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-16 -mt-16 z-0 group-hover:bg-emerald-100 transition-colors"></div>
            <div className="relative z-10">
              <div className="text-emerald-600 font-bold tracking-widest text-sm mb-2">FASE 3: DISTRIBUSI</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Keywording & Uploading Massal</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Gambar paling bagus sedunia tidak akan laku kalau tidak bisa ditemukan pembeli. Teknik SEO (title & keywords) dan upload massal menentukan pendapatanmu.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Gunakan CSV untuk title & tag massal.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Distribusikan via FTP agar menghemat waktu.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Mark gambar sebagai "Created using AI" (WAJIB).</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center bg-blue-600 rounded-3xl p-10 text-white shadow-xl shadow-blue-600/20">
            <Target className="w-12 h-12 mx-auto mb-4 text-blue-200" />
            <h3 className="text-2xl font-bold mb-4">Siap Memulai Perjalananmu?</h3>
            <p className="text-blue-100 mb-8 max-w-lg mx-auto">
              Ikuti terus blog kami untuk strategi terbaru dan bergabung dengan komunitas untuk bertukar ilmu.
            </p>
            <Link to="/blog" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3.5 rounded-full font-bold hover:bg-slate-50 transition-colors">
              Mulai Baca Artikel <PlayCircle className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
