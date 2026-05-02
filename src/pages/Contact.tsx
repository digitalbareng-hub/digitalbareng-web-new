import React from 'react';
import { Mail, MapPin, ExternalLink } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Hubungi Kami</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Punya pertanyaan, kerjasama, atau masukan untuk digitalbareng? Jangan ragu untuk menghubungi kami melalui kanal di bawah ini.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Info Kiri */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Informasi Kontak</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
                      <p className="text-slate-600 mb-2">Untuk pertanyaan umum dan tawaran kerjasama.</p>
                      <a href="mailto:digitalbareng@gmail.com" className="text-blue-600 font-medium hover:underline inline-flex items-center gap-1">
                        digitalbareng@gmail.com <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Lokasi Basecamp</h4>
                      <p className="text-slate-600">
                        Indonesia<br/>
                        <em>100% Remote, #DariRumahAja</em>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulir / Pesan */}
              <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Sapa Kami Secara Langsung</h3>
                <p className="text-slate-600 mb-6 text-sm">
                  Saat ini jalur responsif kami adalah via Email. Silakan klik alamat email di samping dan kirim pesan secara langsung melalui aplikasi email Anda.
                </p>
                <div className="flex flex-col gap-3">
                  <a href="mailto:digitalbareng@gmail.com?subject=Halo%20DigitalBareng" className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm">
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
