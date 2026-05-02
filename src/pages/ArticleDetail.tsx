import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Share2, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { articlesData } from '../lib/articles';

export default function ArticleDetail() {
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const displayToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        try {
          await navigator.share({
            title: document.title,
            url: window.location.href
          });
        } catch (shareErr: any) {
          if (shareErr.name === 'NotAllowedError' || shareErr.name === 'AbortError') {
             // AbortError is if user cancelled, maybe don't fallback. But NotAllowedError definitely fallback.
             if (shareErr.name === 'NotAllowedError') {
               await navigator.clipboard.writeText(window.location.href);
               displayToast('Link berhasil disalin!');
             }
          } else {
             await navigator.clipboard.writeText(window.location.href);
             displayToast('Link berhasil disalin!');
          }
        }
      } else {
        await navigator.clipboard.writeText(window.location.href);
        displayToast('Link berhasil disalin!');
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    displayToast(isSaved ? 'Artikel dihapus dari simpanan.' : 'Artikel berhasil disimpan!');
  };

  const getArticleData = (id: string | undefined) => {
    const defaultData = articlesData.find(a => a.id === id);
    if (id === 'panduan-fundamental-microstock-ai') {
      return {
        ...defaultData!,
        htmlContent: `
          <p>Mendapatkan penghasilan pasif dalam bentuk Dollar (USD) dari rumah bukan lagi sekadar impian. Salah satu cara paling realistis dan teruji untuk mencapainya adalah melalui industri <b>Microstock</b>.</p><p>Secara sederhana, microstock adalah platform di mana Anda bisa menjual aset digital (foto, ilustrasi, vektor, video) kepada pembeli di seluruh dunia—mulai dari desainer grafis, agensi iklan, hingga blogger. Setiap kali aset Anda diunduh, Anda mendapatkan komisi.</p><p>Dulu, industri ini didominasi oleh fotografer dan ilustrator profesional. Namun, hari ini, aturan mainnya telah berubah drastis berkat kehadiran <i>Generative AI</i>. Jika Anda tahu cara memanfaatkannya, AI bisa menjadi mesin produksi aset digital Anda.</p><p>Tapi tunggu dulu, tidak semua agensi microstock menerima karya AI! Mari kita bahas aturan fundamental, daftar agensi yang ramah AI, hingga alur kerja produksinya.</p><h2>Aturan Emas: Pahami Mana yang Boleh dan Tidak Boleh</h2><p>Ini adalah bagian paling krusial. Mengunggah aset AI ke platform yang salah tidak hanya akan membuang waktu Anda, tetapi bisa mengakibatkan akun Anda di-banned secara permanen. Industri microstock saat ini terbelah menjadi dua kubu terkait AI.</p><h3>✅ Microstock yang Menerima Aset AI (Boleh Di-upload)</h3><p>Platform-platform ini telah mengadopsi AI, namun dengan syarat yang sangat ketat: <b>Anda harus jujur dan melabeli karya tersebut sebagai buatan AI.</b></p><ol start="1"><li><p><b>Adobe Stock:</b> Saat ini menjadi "surga" terbesar bagi kreator AI. Adobe sangat terbuka dengan aset AI selama Anda mencentang kotak <i>“Created using generative AI tools”</i> saat mengunggah. Penjualan di sini cenderung paling stabil dan tinggi.</p></li><li><p><b>Vecteezy:</b> Platform ini secara resmi menerima gambar AI, namun Anda wajib mematuhi pedoman teknis mereka, termasuk memberikan lisensi rilis properti (Property Release) khusus AI jika diminta, dan menempatkannya di kategori yang tepat.</p></li><li><p><b>Dreamstime:</b> Mengizinkan karya AI dan bahkan memiliki kategori/tag khusus untuk itu. Mereka menghargai transparansi dari kreatornya.</p></li><li><p><b>123RF:</b> Platform ini juga sudah beradaptasi dan mengizinkan kontributor untuk mengunggah gambar hasil <i>generative AI</i> dengan penandaan (tagging) yang sesuai.</p></li></ol><h3>❌ Microstock yang Menolak Aset AI (Dilarang Keras!)</h3><p>Jangan pernah mencoba "mengelabui" platform ini. Sistem pendeteksi mereka sangat canggih.</p><ol start="1"><li><p><b>Shutterstock:</b> Mereka <b>menolak semua aset AI pihak ketiga</b> (seperti Midjourney, Leonardo, dll). <i>Pengecualian:</i> Anda hanya boleh menjual gambar AI di Shutterstock JIKA gambar tersebut dibuat menggunakan generator AI bawaan milik Shutterstock sendiri.</p></li><li><p><b>iStock / Getty Images:</b> Sama sekali tidak menoleransi gambar AI generatif karena kekhawatiran terkait hak cipta hukum.</p></li><li><p><b>Depositphotos:</b> Secara tegas menyatakan bahwa mereka tidak menerima karya yang dihasilkan dari <i>text-to-image AI</i> pada platform kontributor standar mereka.</p></li></ol><h2>Alur Kerja (Workflow) Produksi Aset Menggunakan AI</h2><p>Meskipun AI yang "menggambar", Anda tetaplah sang "Sutradara". Untuk menghasilkan karya yang bisa laku dijual, Anda memerlukan <i>workflow</i> yang solid. Berikut adalah alur kerja umumnya:</p><h3>1. Riset &amp; Ideasi (Prompting)</h3><p>Jangan asal membuat gambar. Cari tahu apa yang sedang tren, musim apa yang akan datang (Halloween, Natal, Ramadhan), atau konsep bisnis apa yang sering dicari. Setelah itu, gunakan alat AI pilihan Anda:</p><ul><li><p><b>Midjourney:</b> Standar industri untuk kualitas visual tertinggi. Sangat unggul dalam fotorealisme, tekstur, dan pencahayaan sinematik. Membutuhkan langganan berbayar dan dioperasikan via Discord.</p></li><li><p><b>Leonardo AI:</b> Alternatif fantastis dengan antarmuka web yang rapi. Memiliki kontrol yang sangat detail, gaya yang beragam (dari foto hingga vektor/ilustrasi 3D), dan memberikan kuota gratis setiap hari.</p></li><li><p><b>Google Flow (Imagen / Gemini):</b> Sangat baik untuk memahami <i>prompt</i> bahasa alami dan instruksi spesifik. Bisa digunakan untuk menghasilkan aset yang membutuhkan akurasi logika atau konsep abstrak.</p></li><li><p><b>Whisk:</b> (Platform/eksperimen ekosistem baru) Sangat berguna untuk <i>brainstorming</i> visual, memodifikasi gaya dengan cepat, atau menggabungkan konsep sebelum Anda merendernya ke resolusi akhir.</p></li></ul><h3>2. Quality Control (QC) &amp; Perbaikan (Retouching)</h3><p>Ini adalah tahap yang membedakan amatir dan profesional. Agensi microstock sangat ketat soal kualitas.</p><ul><li><p><b>Cek Anatomi &amp; Logika:</b> AI sering mengacaukan jumlah jari manusia, teks yang tidak terbaca, atau elemen yang menyatu (seperti cangkir yang menempel di piring). Gunakan Photoshop (atau Photopea) untuk menghapus/memperbaiki <i>glitch</i> tersebut.</p></li><li><p><b>Hapus Teks/Logo:</b> Pastikan tidak ada logo merek dagang (trademark) atau huruf-huruf acak yang dihasilkan AI.</p></li></ul><h3>3. Upscaling (Menaikkan Resolusi)</h3><p>Microstock umumnya mensyaratkan resolusi minimal <b>4 Megapixels</b> (sekitar 2000 x 2000 pixel). Karena hasil output standar AI biasanya lebih kecil (misal 1024x1024), Anda wajib membesarkannya tanpa kehilangan kualitas.</p><ul><li><p>Gunakan perangkat lunak <i>AI Upscaler</i> seperti Topaz Gigapixel, Magnific AI, atau opsi gratis dan <i>open-source</i> seperti Upscayl.</p></li></ul><h3>4. Mengisi Metadata (Kunci Terjadinya Penjualan)</h3><p>Gambar yang indah tidak akan menghasilkan Dollar jika tidak bisa ditemukan oleh pembeli. SEO (Search Engine Optimization) adalah segalanya di microstock.</p><ul><li><p><b>Judul / Deskripsi (Title/Description):</b> Buatlah deskripsi yang harfiah dan jelas. Berpikir seperti pembeli. Jangan puitis.</p><ul><li><p><i>Salah:</i> Keindahan malam di masa depan.</p></li><li><p><i>Benar:</i> <i>Generative AI illustration of a futuristic cyberpunk city street at night with neon lights.</i> (Catatan: Selalu sisipkan kata "Generative AI" di judul/deskripsi).</p></li></ul></li><li><p><b>Kata Kunci (Keywords):</b> Anda bisa memasukkan hingga 50 kata kunci. Gunakan semuanya, tapi pastikan relevan!</p><ul><li><p>Masukkan kata wajib: <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 border border-slate-200">ai generated, generative ai, generative</code>.</p></li><li><p>Sertakan subjek utama: <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 border border-slate-200">city, building, neon, car, future</code>.</p></li><li><p>Sertakan gaya/konsep: <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 border border-slate-200">cyberpunk, sci-fi, technology, dark, glowing</code>.</p></li><li><p><i>Pro-tip:</i> Gunakan <i>keyword generator</i> seperti MyKeyworder.com atau alat saran kata kunci bawaan dari platform microstock.</p></li></ul></li></ul><h2>Kesimpulan</h2><p>Bermain microstock di era AI bukanlah skema "cepat kaya". Ini adalah bisnis yang membutuhkan konsistensi. Jika Anda secara rutin mengunggah gambar berkualitas tinggi, memperbaiki cacat pada hasil AI, mengisi metadata dengan teliti, dan mematuhi aturan platform, portofolio Anda akan tumbuh menjadi aset digital yang mencetak penghasilan pasif secara rutin.</p><p>Mulai dengan satu <i>niche</i> (misalnya: latar belakang abstrak, makanan, atau ilustrasi 3D), kuasai alat AI Anda, dan mulailah membangun aset digital Anda hari ini!</p>
        `
      };
    }
    
    return {
      title: 'Artikel tidak ditemukan',
      category: 'ERROR',
      date: '-',
      thumbnail: '',
      htmlContent: '<p>Artikel yang Anda cari tidak ditemukan.</p>'
    };
  };

  const article = getArticleData(id);

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Kembali ke Blog</span>
        </Link>
        
        <article>
          <div className="mb-10 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-6">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                {article.category}
              </span>
              <span className="text-sm text-slate-500">{article.date}</span>
              <span className="text-sm text-slate-500">·</span>
              <span className="text-sm text-slate-500">5 min read</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              {article.title}
            </h1>
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjskHwULPmRQcVE7FW7sCLElHzvCDtb9ziFMYFV_tAeVrm_QoRgpz8_tMb51xXxETXdilfW_-xJDj5OwIAWzWQRcr-4DT0dLJtEdwvMEudzGktBREUgxaJ66FZkM2RjslWTe_Be4vISWFkhHLOyk34MqyF0sNUKhAX8eJ3OM-UIZ25zhg/s1600/ChatGPT%20Image%20May%202,%202026,%2010_45_07%20AM.png" 
                alt="Author" 
                className="w-12 h-12 rounded-full border border-slate-200"
              />
              <div className="text-left">
                <p className="font-bold text-slate-900">Digital Bareng</p>
                <p className="text-sm text-slate-500">Microstock Contributor</p>
              </div>
            </div>
          </div>

          {article.thumbnail && (
            <div className="w-full h-auto md:h-96 bg-slate-100 rounded-3xl mb-12 flex items-center justify-center border border-slate-200 overflow-hidden">
               <img 
                 src={article.thumbnail} 
                 alt={article.title} 
                 className="w-full h-full object-cover"
               />
            </div>
          )}

          <div 
            className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-2xl" 
            dangerouslySetInnerHTML={{ __html: article.htmlContent }} 
          />

          <div className="border-t border-slate-200 mt-16 pt-8 flex items-center justify-between">
            <div className="flex gap-4">
              <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors border border-slate-200">
                <Share2 className="w-4 h-4" /> Share
              </button>
              <button onClick={handleSave} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors border ${isSaved ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}>
                {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />} 
                {isSaved ? 'Disimpan' : 'Simpan'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 justify-end">
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">Tips</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">AI Art</span>
            </div>
          </div>
        </article>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-xl font-medium text-sm animate-in slide-in-from-bottom-4 fade-in z-50">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
