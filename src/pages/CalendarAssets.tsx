import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Search, Filter } from 'lucide-react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const eventsData = [
  { id: 1, date: 'January 1', name: "New Year's Day", category: 'Global', tags: ['holiday', 'celebration', 'fireworks'] },
  { id: 2, date: 'January (Varies)', name: 'Lunar New Year', category: 'Cultural', tags: ['asian', 'zodiac', 'spring'] },
  { id: 3, date: 'February 14', name: "Valentine's Day", category: 'Global', tags: ['romance', 'love', 'hearts'] },
  { id: 4, date: 'March 8', name: "International Women's Day", category: 'Global', tags: ['women', 'equality', 'empowerment'] },
  { id: 5, date: 'March 17', name: "St. Patrick's Day", category: 'Cultural', tags: ['irish', 'green', 'beer'] },
  { id: 6, date: 'April 22', name: 'Earth Day', category: 'Global', tags: ['environment', 'nature', 'sustainability'] },
  { id: 7, date: 'May (Varies)', name: "Mother's Day", category: 'Global', tags: ['family', 'mom', 'love'] },
  { id: 8, date: 'June (All Month)', name: 'Pride Month', category: 'Global', tags: ['lgbtq', 'rainbow', 'diversity'] },
  { id: 9, date: 'June (Varies)', name: "Father's Day", category: 'Global', tags: ['family', 'dad', 'love'] },
  { id: 10, date: 'July 4', name: 'Independence Day (US)', category: 'National', tags: ['usa', 'fireworks', 'summer'] },
  { id: 11, date: 'August 19', name: 'World Photography Day', category: 'Global', tags: ['camera', 'photo', 'art'] },
  { id: 12, date: 'September (Varies)', name: 'Oktoberfest', category: 'Cultural', tags: ['beer', 'germany', 'festival'] },
  { id: 13, date: 'October 31', name: 'Halloween', category: 'Global', tags: ['spooky', 'costumes', 'pumpkin'] },
  { id: 14, date: 'November (Varies)', name: 'Thanksgiving (US)', category: 'National', tags: ['turkey', 'family', 'autumn'] },
  { id: 15, date: 'November (Varies)', name: 'Black Friday', category: 'Commercial', tags: ['shopping', 'sale', 'discount'] },
  { id: 16, date: 'December 25', name: 'Christmas Day', category: 'Global', tags: ['winter', 'santa', 'gifts'] },
  { id: 17, date: 'December 31', name: "New Year's Eve", category: 'Global', tags: ['party', 'countdown', 'champagne'] },
];

export default function CalendarAssets() {
  const navigate = useNavigate();
  const [loadingRoute, setLoadingRoute] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login', { replace: true });
      } else {
        setLoadingRoute(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loadingRoute) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const categories = ['All', ...Array.from(new Set(eventsData.map(e => e.category)))];

  const filteredEvents = eventsData.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Calendar Events Seluruh Dunia</h1>
          </div>
          <p className="text-slate-500 mb-8 ml-16">Jadwal event penting dunia untuk referensi pembuatan aset microstock Anda.</p>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Cari event atau kata kunci (contoh: love, spooky)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-slate-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full pl-10 pr-8 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none appearance-none bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents.map(event => (
              <div key={event.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="font-semibold text-blue-600 mb-1">{event.date}</div>
                <div className="text-lg font-bold text-slate-900 mb-2">{event.name}</div>
                <div className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md mb-4">
                  {event.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map(tag => (
                    <span key={tag} className="text-xs text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {filteredEvents.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-500">
                Tidak ada event yang sesuai dengan pencarian Anda.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
