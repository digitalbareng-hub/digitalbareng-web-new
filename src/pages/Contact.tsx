import React from 'react';
import { Mail, MapPin, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen font-sans">
      <Helmet>
        <title>Hubungi Kami | Digital Bareng</title>
        <meta name="description" content="Punya pertanyaan atau tawaran kerjasama seputar Microstock AI? Hubungi tim Digital Bareng sekarang." />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-4">Let's Connect</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Hubungi Kami</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Punya pertanyaan khusus seputar strategi microstock, kerjasama brand, atau masukan untuk <strong>Digital Bareng</strong>? Kami siap mendengar.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden transition-all hover:border-orange-100">
          <div className="p-8 md:p-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              {/* Info Kiri */}
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-8">Informasi Kontak</h2>
                <div className="space-y-10">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0 shadow-sm">
                      <Mail className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 mb-1 text-lg">Email Resmi</h4>
                      <p className="text-slate-500 mb-3 text-sm leading-relaxed">Untuk diskusi strategis, konsultasi privat, dan tawaran kerjasama.</p>
                      <a href="mailto:digitalbareng@gmail.com" className="text-orange-600 font-bold hover:text-orange-700 transition-colors inline-flex items-center gap-1.5 group">
                        digitalbareng@gmail.com <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 mb-1 text-lg">Lokasi Basecamp</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Indonesia<br/>
                        <span className="text-orange-600 font-bold uppercase tracking-tighter text-[10px]">100% Remote Workflow, #DariRumahAja</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulir / Pesan */}
              <div className="bg-slate-900 p-8 md:p-10 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-orange-600/10 rounded-full blur-2xl group-hover:bg-orange-600/20 transition-all duration-700"></div>
                <h3 className="text-2xl font-extrabold mb-4 relative z-10">Sapa Kami Secara Langsung</h3>
                <p className="text-slate-400 mb-8 text-sm leading-relaxed relative z-10">
                  Saat ini jalur paling responsif kami adalah via Email. Klik tombol di bawah untuk langsung terhubung dengan tim kami.
                </p>
                <div className="relative z-10">
                  <a href="mailto:digitalbareng@gmail.com?subject=Halo%20DigitalBareng" className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20">
                    <Mail className="w-5 h-5" /> Kirim Email Sekarang
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
