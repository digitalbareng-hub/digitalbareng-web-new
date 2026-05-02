import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function TermsOfUse() {
  return (
    <div className="pt-24 pb-16 bg-white min-h-screen font-sans">
      <Helmet>
        <title>Syarat dan Ketentuan | Digital Bareng</title>
        <meta name="description" content="Syarat dan ketentuan penggunaan layanan Digital Bareng. Pelajari hak dan kewajiban Anda saat menggunakan platform kami." />
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-4">Kebijakan Platform</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">Syarat & Ketentuan</h1>
          <p className="text-slate-500 font-medium italic">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        
        <div className="prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:text-slate-900 prose-a:text-orange-600 leading-relaxed text-slate-600">
          <p>
            Selamat datang di <strong>digitalbareng.com</strong>! Dengan mengakses dan menggunakan situs ini, Anda setuju untuk terikat 
            dengan Syarat dan Ketentuan berikut. Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak menggunakan situs kami.
          </p>

          <h2 className="text-2xl mt-12 mb-6">1. Penggunaan Situs</h2>
          <p>
            Anda setuju untuk menggunakan digitalbareng.com hanya untuk tujuan yang sah dan dengan cara yang tidak melanggar 
            hak atau membatasi penggunaan situs oleh orang lain. Tindakan yang dilarang meliputi pelecehan, menyebarkan 
            materi pencemaran nama baik, atau mengganggu aliran komunikasi dalam situs.
          </p>

          <h2 className="text-2xl mt-12 mb-6">2. Kekayaan Intelektual</h2>
          <p>
            Semua konten di digitalbareng.com, termasuk teks, grafis, logo, ikon, gambar, dan klip audio, serta 
            kompilasinya merupakan milik digitalbareng.com atau penyedia kontennya dan dilindungi oleh undang-undang 
            hak cipta internasional.
          </p>

          <h2 className="text-2xl mt-12 mb-6">3. Penafian (Disclaimer)</h2>
          <p>
            Konten, layanan, dan panduan yang disediakan di situs ini ditujukan untuk tujuan informasi dan edukasi. 
            Kami tidak memberikan jaminan bahwa penggunaan panduan atau strategi kami akan menghasilkan keuntungan 
            finansial tertentu. Hasil setiap individu dapat bervariasi berdasarkan usaha, keterampilan, dan faktor lainnya.
          </p>

          <h2 className="text-2xl mt-12 mb-6">4. Batasan Tanggung Jawab</h2>
          <p>
            Dalam keadaan apa pun, digitalbareng.com maupun para pihak terkaitnya tidak bertanggung jawab atas segala 
            kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan 
            menggunakan materi di situs kami.
          </p>

          <h2 className="text-2xl mt-12 mb-6">5. Perubahan Syarat dan Ketentuan</h2>
          <p>
            Kami berhak, atas kebijakan kami sendiri, untuk memperbarui, mengubah, atau mengganti bagian mana pun 
            dari Syarat dan Ketentuan ini. Merupakan tanggung jawab Anda untuk secara berkala memeriksa pembaruan di halaman ini.
          </p>

          <h2 className="text-2xl mt-12 mb-6">6. Hukum yang Berlaku</h2>
          <p>
            Syarat dan Ketentuan ini tunduk dan ditafsirkan sesuai dengan hukum yang berlaku di Indonesia.
          </p>

          <div className="mt-16 p-8 bg-orange-50 rounded-3xl border border-orange-100 italic">
            <h2 className="text-xl font-extrabold text-orange-900 mt-0 mb-4 not-italic">7. Hubungi Kami</h2>
            <p className="mb-0 text-orange-800">
              Pertanyaan mengenai Syarat dan Ketentuan ini dapat dikirimkan kepada kami di: 
              <br/>
              <strong className="text-orange-600 not-italic">digitalbareng@gmail.com</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
