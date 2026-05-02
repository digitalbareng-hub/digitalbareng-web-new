import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import SEO from '../components/SEO';
import { articlesData } from '../lib/articles';

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
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
    
    if (id === 'panduan-lengkap-cara-mendaftar-menjadi-adobe-stock-contributor') {
      return {
        ...defaultData!,
        htmlContent: `
          <p>Setelah memahami dasar-dasar <a href="/blog/panduan-fundamental-microstock-ai">fundamental microstock</a> sebelumnya dan mengetahui aturan main seputar aset AI, langkah selanjutnya adalah mulai terjun ke medan pertempuran. Saat ini, tidak ada platform yang lebih menjanjikan dan ramah kreator (termasuk kreator AI) selain Adobe Stock.</p><p>Menjadi kontributor di Adobe Stock berarti Anda memajang karya langsung di hadapan jutaan pengguna <i>software</i> Adobe (seperti Photoshop dan Illustrator) di seluruh dunia. Peluang untuk mendapatkan penghasilan pasif dalam kurs Dolar (USD) sangatlah terbuka lebar.</p><p>Bagi pemula, proses pendaftaran mungkin terlihat membingungkan. Jangan khawatir! Berikut adalah panduan lengkap cara mendaftar menjadi Adobe Stock Contributor dari nol hingga siap mengunggah karya pertama Anda.</p><h3>Syarat Utama Sebelum Mendaftar</h3><p>Sebelum membuka <i>browser</i>, pastikan Anda sudah memenuhi dan menyiapkan tiga hal dasar ini:</p><ol start="1"><li><p><b>Berusia Minimal 18 Tahun:</b> Anda harus sudah cukup umur secara hukum untuk menyetujui kontrak kerja sama.</p></li><li><p><b>Identitas Resmi (ID):</b> Siapkan KTP, SIM, atau Paspor. Adobe mungkin akan memintanya sewaktu-waktu untuk memverifikasi identitas Anda jika diperlukan.</p></li><li><p><b>Karya Orisinal &amp; Kepatuhan Prompt AI:</b> Anda harus memiliki hak cipta penuh. Jika menggunakan AI, pastikan platform yang Anda gunakan memberikan hak komersial. <b>Penting:</b> Adobe melarang keras penggunaan <i>prompt</i> yang mengandung nama artis, tokoh terkenal, karakter fiksi (seperti karakter komik/film), atau merek dagang (<i>trademark</i>).</p></li></ol><h3>Langkah-Langkah Mendaftar Adobe Stock Contributor</h3><p>Proses pendaftarannya 100% gratis. Ikuti panduan praktis ini:</p><p><b>Langkah 1: Kunjungi Portal Kontributor</b><br/>Buka <i>browser</i> Anda dan kunjungi situs web resmi khusus kontributor di: <a href="https://contributor.stock.adobe.com/" target="_blank" rel="noopener noreferrer">contributor.stock.adobe.com</a>. Klik tombol <b>"Get Started"</b> atau <b>"Join Now"</b>.</p><div class="flex justify-center my-6"><img class="rounded-xl shadow-sm border border-slate-200" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhjN8qHTZHukC0Yf2pkfeibLEp2cs5bH3nhYLqHCTjJpH45M4SaIAvwWbtgtQAuUhM68O70HCNZMOllGVr7tOjBU5Tf7DDaArY0ZJcbBYNLSqjWhqqQReFn6afE9pzMxpO9D28d7ZgKQ0afrPe9d_tXm6wcJNX5-zp7Iq08hjhggI9lVbftoz2k5nlQLlU/w640-h286/Screenshot%202026-05-02%20184419.jpg" alt="Get Started Adobe Stock" /></div><p><b>Langkah 2: Buat atau Gunakan Adobe ID</b></p><ul><li><p><b>Jika Anda belum punya akun:</b> Klik “Create an account” (Buat akun). Anda bisa mendaftar menggunakan email pribadi, akun Google, Facebook, atau Apple. Isi nama, tanggal lahir, dan negara asal Anda dengan jujur dan sesuai KTP.</p></li><li><p><b>Jika Anda sudah punya akun:</b> Misalnya Anda pernah berlangganan Photoshop atau Lightroom, Anda bisa langsung <i>Sign In</i> menggunakan Adobe ID yang sudah ada.</p></li></ul><div class="flex justify-center my-6"><img class="rounded-xl shadow-sm border border-slate-200" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgX8ortfkpQHwr4QoYfJiTkm8Y5HlTML53vCCQxTa509AWcjCQp8nHtgifEpYFG-dO711GazMs9kSZ2RTFId6Pbi70kWF5H_pOGmWCe9T1uZFUjz8GsOcsIOu1UD5GbZxzR3Xz7uhe8Shg4THdzeRbFSotlklCSIgGXLOd9lZAayqkyTRqpqWixckXqARI/w640-h284/Screenshot%202026-05-02%20184527.jpg" alt="Sign in to Adobe" /></div><p><b>Langkah 3: Konfirmasi Email</b><br/>Setelah mendaftar, periksa kotak masuk (<i>inbox</i>) email Anda. Adobe akan mengirimkan tautan verifikasi. Klik tautan tersebut untuk mengaktifkan akun Anda secara penuh.</p><p><b>Langkah 4: Setujui Perjanjian Kontributor (Contributor Agreement)</b><br/>Setelah berhasil <i>login</i> ke Dasbor Kontributor, Anda akan disajikan dokumen persyaratan layanan. Dokumen ini berisi aturan tentang hak cipta, royalti, dan kebijakan pengunggahan. Baca dan pahami poin utamanya, lalu klik <b>"Accept"</b> (Setuju).</p><p>Jika mengalami kesulitan saat verifikasi nomor Handphone pakai cara ini:<br/></p><h4>Add Mobile Phone Number via Adobe Account Access</h4><p><a href="https://play.google.com/store/apps/details?id=com.adobe.ims.accountaccess&amp;hl=en&amp;pli=1" target="_blank" rel="noopener noreferrer">https://play.google.com/store/apps/details?id=com.adobe.ims.accountaccess&hl=en&pli=1</a></p><p>Login menggunakan akun yang sudah di daftarkan, kemudian Tambahkan No. Handphone.</p><p>Selamat! Sampai di sini, Anda sudah resmi menjadi Adobe Stock Contributor dan bisa melihat Dasbor utama Anda.</p><div class="flex justify-center my-6"><img class="rounded-xl shadow-sm border border-slate-200" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCGth5rqdgCZQkugNGrF9B9794eDAQeZd9dQSXIjZ4-fjPdAxxx9Voqb_t3sbkjmUCfUk5Ouw7XsMxrvEGt-IAHhYIawiXR8AkXkmnhwW4Xf6wCzJ5pE7fKmVECTRQiOugkmSIeZX3fwMQ8y1aJziKcDkY2plqIe-IMf8dcrStsPPjXFKVLEKIcYGhej0/w640-h270/image.webp" alt="Dashboard" /></div><h3>⚠️ Langkah Ekstra yang SANGAT Penting (Jangan Dilewati!)</h3><p>Banyak pemula yang langsung mengunggah gambar setelah akun jadi, padahal ada dua pengaturan krusial yang harus segera diselesaikan agar komisi Dolar Anda aman dan tidak terkena potongan besar.</p><p><b>1. Mengisi Formulir Pajak (Tax Form)</b><br/>Karena Adobe adalah perusahaan Amerika Serikat (AS), mereka diwajibkan memotong pajak dari penghasilan Anda.</p><ul><li><p>Masuk ke menu <b>Contributor Account</b> (Akun Kontributor).</p></li><li><p>Cari bagian <b>Tax Information</b> (Informasi Pajak).</p></li><li><p>Pilih formulir <b>W-8BEN</b> (ini adalah formulir khusus untuk individu <i>non-US Resident</i> atau warga negara selain Amerika Serikat, seperti Indonesia).</p></li><li><p>Isi formulir tersebut secara digital dengan nama asli dan alamat lengkap Anda. Mengisi formulir ini akan menyelamatkan Anda dari potongan pajak maksimal (30%) dari pemerintah AS. Indonesia memiliki perjanjian pajak (<i>Tax Treaty</i>) dengan AS, sehingga potongannya akan diturunkan menjadi hanya sekitar 10%.</p></li></ul><p><b>2. Menyiapkan Metode Pembayaran</b><br/>Bagaimana Adobe mentransfer Dolar ke rekening Anda? Di bagian akun, pastikan Anda mengetahui opsi pembayaran yang didukung. Saat ini, Adobe Stock mendukung tiga layanan:</p><ul><li><p><b>Payoneer</b></p></li><li><p><b>PayPal</b></p></li><li><p><b>Skrill</b></p></li></ul><p><i>(Catatan: Anda baru bisa menghubungkan akun pencairan ini dan menarik uang setelah total komisi Anda mencapai batas minimal/payout threshold sebesar <b>$25</b>).</i></p><h3>Tips Sukses Mengunggah Karya Pertama Anda (Sesuai Aturan Terbaru)</h3><p>Sekarang akun Anda sudah siap tempur! Saat mengunggah karya, terutama hasil <i>Generative AI</i>, Anda wajib mematuhi aturan teknis terbaru dari Adobe berikut ini:</p><ul><li><p><b>Format dan Resolusi yang Tepat:</b> Gunakan format <b>JPEG</b>. Resolusi gambar harus minimal <b>4 Megapixels</b> dan maksimal <b>100 Megapixels</b>. Ukuran file (size) maksimal tidak boleh lebih dari <b>45 Megabytes</b> (MB).</p></li><li><p><b>Klasifikasi Jenis Aset:</b> Jika gambar AI Anda terlihat sangat realistis seperti hasil jepretan kamera, pilih tipe aset <b>"Photos"</b>. Namun, jika bergaya kartun, <i>3D Pixar-style</i>, <i>minimalist Swiss-inspired layouts</i>, vektor, atau seni digital lainnya, Anda wajib memilih tipe aset <b>"Illustrations"</b>.</p></li><li><p><b>Kejujuran AI (Sangat Wajib):</b> Anda <b>WAJIB</b> mencentang opsi <i>"Created using generative AI tools"</i> di panel sebelah kanan.</p></li><li><p><b>Aturan Wajah Fiktif:</b> Jika gambar AI Anda menampilkan wajah manusia fotorealistik yang tidak didasarkan pada orang sungguhan, Anda harus mencentang kotak tambahan <i>"People and Property are fictional"</i>.</p></li><li><p><b>Kebersihan Presentasi Visual:</b> Sebelum diunggah, pastikan gambar bersih dari elemen latar belakang yang mengganggu. Sangat penting untuk menghapus <i>watermark</i> atau teks-teks acak yang sering muncul cacat dari generator AI. Karya dengan artefak berantakan akan otomatis ditolak (di-<i>reject</i>) oleh tim peninjau Adobe demi menjaga profesionalitas katalog mereka.</p></li><li><p><b>Maksimalkan Metadata:</b> Tulis judul dalam bahasa Inggris dan maksimalkan 49&nbsp;<i>keywords</i> (kata kunci). Jangan pernah memasukkan nama <i>brand</i> atau seniman terkenal di judul maupun <i>keyword</i> Anda!</p></li></ul><div class="flex justify-center my-6"><img class="rounded-xl shadow-sm border border-slate-200" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhUJsZoY1CpoPLLExw9qyfWA9-wD8hNHKAwGOv8llkbsjKQpz1vPbFnDOqCxxtztD1KU7WBQCxDZ2RZYh2vUFx0QO5B2ESuHgTdazFBu6xWOR0CSxFa2Zzrdfgvr3cANKSypBCH1hwjFAOGDIPtnowFFRO5EeT2tfKS1Ac0bWoxu3W57cTAU_9Lvu-aLf4/w566-h640/Screenshot%202026-05-02%20185906.jpg" alt="Metadata" /></div><p>Proses peninjauan (<i>review</i>) di Adobe Stock biasanya memakan waktu beberapa hari hingga beberapa minggu, tergantung antrean. Tetaplah bersabar, jaga kualitas visual Anda, dan teruslah berkarya selagi menunggu hasilnya!</p>
        `
      };
    }

    
    return {
      title: 'Artikel tidak ditemukan',
      category: 'ERROR',
      date: '-',
      description: 'Artikel tidak ditemukan.',
      thumbnail: '',
      htmlContent: '<p>Artikel yang Anda cari tidak ditemukan.</p>'
    };
  };

  const article = getArticleData(id);

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    if (anchor) {
      const href = anchor.getAttribute('href');
      if (href) {
        if (href.startsWith('/')) {
          e.preventDefault();
          window.location.href = href;
        } else if (href.includes('digitalbareng.com')) {
          e.preventDefault();
          try {
            const url = new URL(href);
            window.location.href = url.pathname;
          } catch {
             window.location.href = href;
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans pt-12">
      <SEO 
        title={`${article.title} | Digital Bareng`}
        description={article.description}
        image={article.thumbnail}
        article={true}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link reloadDocument to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors mb-8 font-bold group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Kembali ke Blog</span>
        </Link>
        
        <article>
          <div className="mb-10 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-6">
              <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-[10px] font-bold text-orange-600 tracking-wider uppercase border border-orange-100">
                {article.category}
              </span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-tight">{article.date}</span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-tight">·</span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-tight">5 min read</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
              {article.title}
            </h1>
            <div className="flex items-center justify-center sm:justify-start gap-4 p-4 bg-slate-50 rounded-2xl w-fit">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjskHwULPmRQcVE7FW7sCLElHzvCDtb9ziFMYFV_tAeVrm_QoRgpz8_tMb51xXxETXdilfW_-xJDj5OwIAWzWQRcr-4DT0dLJtEdwvMEudzGktBREUgxaJ66FZkM2RjslWTe_Be4vISWFkhHLOyk34MqyF0sNUKhAX8eJ3OM-UIZ25zhg/s1600/ChatGPT%20Image%20May%202,%202026,%2010_45_07%20AM.png" 
                alt="Author" 
                className="w-12 h-12 rounded-full border-2 border-white shadow-sm ring-2 ring-orange-100"
              />
              <div className="text-left">
                <p className="font-bold text-slate-900">Digital Bareng</p>
                <p className="text-xs font-bold text-orange-600 uppercase tracking-widest">Microstock AI Expert</p>
              </div>
            </div>
          </div>

          {article.thumbnail && (
            <div className="w-full h-auto md:h-[450px] bg-slate-100 rounded-[2.5rem] mb-12 flex items-center justify-center border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200">
               <img 
                 src={article.thumbnail} 
                 alt={article.title} 
                 className="w-full h-full object-cover"
               />
            </div>
          )}

          <div 
            className="prose prose-lg prose-slate max-w-none prose-headings:font-extrabold prose-headings:text-slate-900 prose-a:text-orange-600 hover:prose-a:text-orange-700 prose-img:rounded-[2rem] prose-strong:text-slate-900 prose-code:text-orange-600 prose-code:bg-orange-50 prose-code:px-1 prose-code:rounded leading-relaxed" 
            onClick={handleContentClick}
            dangerouslySetInnerHTML={{ __html: article.htmlContent }} 
          />

          <div className="border-t border-slate-100 mt-16 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex gap-4">
              <button onClick={handleShare} className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 rounded-full transition-all border border-slate-200 shadow-sm">
                <Share2 className="w-4 h-4" /> Share Strategi
              </button>
              <button onClick={handleSave} className={`flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-full transition-all border shadow-sm ${isSaved ? 'bg-orange-600 text-white border-orange-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>
                {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />} 
                {isSaved ? 'Tersimpan' : 'Simpan Artikel'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 justify-end">
              <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">Tips Microstock</span>
              <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">Mulai Digital Bareng</span>
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
