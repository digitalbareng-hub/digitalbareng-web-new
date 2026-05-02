import React, { useState, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, doc } from 'firebase/firestore';

export function Comments({ articleId }: { articleId: string }) {
  const [comments, setComments] = useState<{ id: string, comment: string }[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!articleId) return;
    
    const q = query(
      collection(db, 'comments'),
      where('articleId', '==', articleId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        comment: doc.data().comment as string
      }));
      setComments(data);
    }, (err) => {
      console.error('Error fetching comments:', err);
      // Create index if it asks 
      if (err.message.includes('requires an index')) {
         setError('Perlu membuat index database (silakan cek console logs)');
      } else {
         setError(err.message);
      }
    });

    return () => unsubscribe();
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      await addDoc(collection(db, 'comments'), {
        articleId,
        comment: newComment,
        createdAt: serverTimestamp()
      });
      setNewComment('');
    } catch (err: any) {
      setError(err.message);
      console.error('Error adding comment:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-12 bg-white rounded-3xl p-8 border border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-blue-600" />
          Komentar
        </h3>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="space-y-6 mb-8">
        {comments.length === 0 ? (
          <p className="text-slate-500 text-center py-8">Belum ada komentar. Jadilah yang pertama!</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-slate-700">{c.comment}</p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Tulis komentar Anda..."
          className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !newComment.trim()}
          className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
