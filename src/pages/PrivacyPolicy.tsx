import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicy() {
  return (
    <div className="pt-24 pb-16 bg-white min-h-screen font-sans">
      <Helmet>
        <title>Kebijakan Privasi | Digital Bareng</title>
        <meta name="description" content="Kebijakan privasi Digital Bareng. Pelajari bagaimana kami melindungi data dan informasi pribadi Anda." />
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-4">Privasi Pengguna</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">Kebijakan Privasi</h1>
          <p className="text-slate-500 font-medium italic">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        
        <div className="prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:text-slate-900 prose-a:text-orange-600 leading-relaxed text-slate-600">
          <p>
            Selamat datang di <strong>digitalbareng.com</strong>! Privasi Anda sangat penting bagi kami. Kebijakan privasi ini menjelaskan 
            bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat Anda menggunakan website dan layanan kami.
          </p>

          <h2 className="text-2xl mt-12 mb-6">1. Informasi yang Kami Kumpulkan</h2>
          <p>Kami dapat mengumpulkan informasi pribadi yang Anda berikan secara langsung, seperti:</p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Nama, alamat email, dan informasi kontak lainnya saat Anda mendaftar atau menghubungi kami.</li>
            <li>Informasi yang Anda bagikan melalui komentar atau interaksi di komunitas kami.</li>
          </ul>

          <h2 className="text-2xl mt-12 mb-6">2. Bagaimana Kami Menggunakan Informasi Anda</h2>
          <p>Informasi yang kami kumpulkan digunakan untuk:</p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Menyediakan, memelihara, dan meningkatkan layanan kami.</li>
            <li>Mengirimkan pembaruan, buletin, dan komunikasi terkait layanan.</li>
            <li>Merespons pertanyaan, masukan, dan dukungan pelanggan.</li>
          </ul>

          <h2 className="text-2xl mt-12 mb-6">3. Keamanan Data</h2>
          <p>
            Kami menerapkan berbagai langkah keamanan untuk menjaga keamanan informasi pribadi Anda. Namun, perlu 
            diingat bahwa tidak ada metode transmisi data melalui internet atau penyimpanan elektronik yang 100% aman.
          </p>

          <h2 className="text-2xl mt-12 mb-6">4. Cookie</h2>
          <p>
            digitalbareng.com menggunakan "cookie" untuk meningkatkan pengalaman pengguna. Anda dapat memilih 
            untuk mengatur web browser Anda untuk menolak cookie, atau memberi peringatan ketika cookie dikirim.
          </p>

          <h2 className="text-2xl mt-12 mb-6">5. Tautan ke Situs Pihak Ketiga</h2>
          <p>
            Situs kami mungkin berisi tautan ke situs web lain. Kami tidak bertanggung jawab atas praktik privasi 
            atau konten dari situs-situs pihak ketiga tersebut. Kami menyarankan Anda untuk membaca kebijakan 
            privasi dari setiap situs yang Anda kunjungi.
          </p>

          <div className="mt-16 p-8 bg-orange-50 rounded-3xl border border-orange-100 italic">
            <h2 className="text-xl font-extrabold text-orange-900 mt-0 mb-4 not-italic">6. Hubungi Kami</h2>
            <p className="mb-0 text-orange-800">
              Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, silakan hubungi kami di: 
              <br/>
              <strong className="text-orange-600 not-italic">digitalbareng@gmail.com</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
