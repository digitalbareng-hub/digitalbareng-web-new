import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Link to="/" className="md:col-span-2 group">
            <div className="flex items-center gap-2 opacity-80 mb-4 group-hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 rounded overflow-hidden flex items-center justify-center bg-blue-50 group-hover:scale-110 transition-transform">
                <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjskHwULPmRQcVE7FW7sCLElHzvCDtb9ziFMYFV_tAeVrm_QoRgpz8_tMb51xXxETXdilfW_-xJDj5OwIAWzWQRcr-4DT0dLJtEdwvMEudzGktBREUgxaJ66FZkM2RjslWTe_Be4vISWFkhHLOyk34MqyF0sNUKhAX8eJ3OM-UIZ25zhg/s1600/ChatGPT%20Image%20May%202,%202026,%2010_45_07%20AM.png" alt="DigitalBareng Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-lg text-slate-900 group-hover:text-orange-600 transition-colors">DigitalBareng</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Panduan lengkap microstock AI — membantu kamu membangun sumber income online yang sustainable melalui microstock, AI tools, dan digital marketing.
            </p>
          </Link>
          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Eksplor</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/guide" className="hover:text-orange-600 transition-colors">Start Here (Guide)</Link></li>
              <li><Link to="/blog" className="hover:text-orange-600 transition-colors">Artikel Terbaru</Link></li>
              <li><Link to="/tools" className="hover:text-orange-600 transition-colors">Rekomendasi Tools</Link></li>
              <li><Link to="/contact" className="hover:text-orange-600 transition-colors">Kontak</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/privacy-policy" className="hover:text-orange-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use" className="hover:text-orange-600 transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-100 mt-12 pt-8 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} digitalbareng.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
