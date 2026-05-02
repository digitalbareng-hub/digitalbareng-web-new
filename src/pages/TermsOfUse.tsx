import React from 'react';

export default function TermsOfUse() {
  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Syarat dan Ketentuan Penggunaan (Terms of Use)</h1>
        
        <div className="prose prose-slate max-w-none">
          <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <p>
            Selamat datang di digitalbareng.com! Dengan mengakses dan menggunakan situs ini, Anda setuju untuk terikat 
            dengan Syarat dan Ketentuan berikut. Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak menggunakan situs kami.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">1. Penggunaan Situs</h2>
          <p>
            Anda setuju untuk menggunakan digitalbareng.com hanya untuk tujuan yang sah dan dengan cara yang tidak melanggar 
            hak atau membatasi penggunaan situs oleh orang lain. Tindakan yang dilarang meliputi pelecehan, menyebarkan 
            materi pencemaran nama baik, atau mengganggu aliran komunikasi dalam situs.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">2. Kekayaan Intelektual</h2>
          <p>
            Semua konten di digitalbareng.com, termasuk teks, grafis, logo, ikon, gambar, dan klip audio, serta 
            kompilasinya merupakan milik digitalbareng.com atau penyedia kontennya dan dilindungi oleh undang-undang 
            hak cipta internasional.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">3. Penafian (Disclaimer)</h2>
          <p>
            Konten, layanan, dan panduan yang disediakan di situs ini ditujukan untuk tujuan informasi dan edukasi. 
            Kami tidak memberikan jaminan bahwa penggunaan panduan atau strategi kami akan menghasilkan keuntungan 
            finansial tertentu. Hasil setiap individu dapat bervariasi berdasarkan usaha, keterampilan, dan faktor lainnya.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">4. Batasan Tanggung Jawab</h2>
          <p>
            Dalam keadaan apa pun, digitalbareng.com maupun para pihak terkaitnya tidak bertanggung jawab atas segala 
            kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan 
            menggunakan materi di situs kami.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">5. Perubahan Syarat dan Ketentuan</h2>
          <p>
            Kami berhak, atas kebijakan kami sendiri, untuk memperbarui, mengubah, atau mengganti bagian mana pun 
            dari Syarat dan Ketentuan ini. Merupakan tanggung jawab Anda untuk secara berkala memeriksa pembaruan di halaman ini.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">6. Hukum yang Berlaku</h2>
          <p>
            Syarat dan Ketentuan ini tunduk dan ditafsirkan sesuai dengan hukum yang berlaku di Indonesia.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">7. Hubungi Kami</h2>
          <p>
            Pertanyaan mengenai Syarat dan Ketentuan ini dapat dikirimkan kepada kami di: 
            <strong> digitalbareng@gmail.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
