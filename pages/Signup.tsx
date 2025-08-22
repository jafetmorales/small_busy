import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null); setMessage(null);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      // TODO: POST initial business metadata (website) to backend after auth callback
      setMessage('Check your email to confirm your account.');
    } catch (err:any) {
      setError(err.message);
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-24 px-6">
      <form onSubmit={handleSignup} className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Start Your Free Trial</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">Create an account to begin monitoring competitors & opportunities.</p>
        <div>
          <label className="block text-xs font-medium mb-1">Business Website</label>
          <input value={website} onChange={e=>setWebsite(e.target.value)} required placeholder="https://example.com" className="w-full rounded border px-3 py-2 bg-transparent" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full rounded border px-3 py-2 bg-transparent" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full rounded border px-3 py-2 bg-transparent" />
        </div>
        <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 rounded-lg font-medium">
          {loading ? 'Creating Account…' : 'Create Account'}
        </button>
        {message && <div className="text-sm text-green-600">{message}</div>}
        {error && <div className="text-sm text-red-600">{error}</div>}
        <p className="text-xs text-gray-500 dark:text-gray-500">By signing up you agree to receive weekly competitor & opportunity emails. Unsubscribe anytime.</p>
      </form>
    </div>
  );
}
