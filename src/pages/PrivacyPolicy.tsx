import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Kebijakan Privasi (Privacy Policy)</h1>
        
        <div className="prose prose-slate max-w-none">
          <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <p>
            Selamat datang di digitalbareng.com! Privasi Anda sangat penting bagi kami. Kebijakan privasi ini menjelaskan 
            bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat Anda menggunakan website dan layanan kami.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">1. Informasi yang Kami Kumpulkan</h2>
          <p>Kami dapat mengumpulkan informasi pribadi yang Anda berikan secara langsung, seperti:</p>
          <ul className="list-disc pl-5 mb-4">
            <li>Nama, alamat email, dan informasi kontak lainnya saat Anda mendaftar atau menghubungi kami.</li>
            <li>Informasi yang Anda bagikan melalui komentar atau interaksi di komunitas kami.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">2. Bagaimana Kami Menggunakan Informasi Anda</h2>
          <p>Informasi yang kami kumpulkan digunakan untuk:</p>
          <ul className="list-disc pl-5 mb-4">
            <li>Menyediakan, memelihara, dan meningkatkan layanan kami.</li>
            <li>Mengirimkan pembaruan, buletin, dan komunikasi terkait layanan.</li>
            <li>Merespons pertanyaan, masukan, dan dukungan pelanggan.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">3. Keamanan Data</h2>
          <p>
            Kami menerapkan berbagai langkah keamanan untuk menjaga keamanan informasi pribadi Anda. Namun, perlu 
            diingat bahwa tidak ada metode transmisi data melalui internet atau penyimpanan elektronik yang 100% aman.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">4. Cookie</h2>
          <p>
            digitalbareng.com menggunakan "cookie" untuk meningkatkan pengalaman pengguna. Anda dapat memilih 
            untuk mengatur web browser Anda untuk menolak cookie, atau memberi peringatan ketika cookie dikirim.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">5. Tautan ke Situs Pihak Ketiga</h2>
          <p>
            Situs kami mungkin berisi tautan ke situs web lain. Kami tidak bertanggung jawab atas praktik privasi 
            atau konten dari situs-situs pihak ketiga tersebut. Kami menyarankan Anda untuk membaca kebijakan 
            privasi dari setiap situs yang Anda kunjungi.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">6. Hubungi Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, silakan hubungi kami di: 
            <strong> digitalbareng@gmail.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
