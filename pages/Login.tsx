import { useState } from 'react';
import { useAuth } from '../components/auth/AuthProvider';

export default function LoginPage() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signin'|'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  // Detect auth errors passed back in hash (e.g., error_code, error_description)
  useState(() => {
    if (typeof window !== 'undefined' && window.location.hash.includes('error_code')) {
      const params = new URLSearchParams(window.location.hash.replace('#',''));
      const desc = params.get('error_description');
      if (desc) setError(desc);
    }
  });

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true); setError(null);
    const fn = mode === 'signin' ? signIn : signUp;
    const { error } = await fn(email, password);
    if (error) {
      setError(error.message || 'Error');
    } else if (mode === 'signup') {
      setInfo('Check your email to confirm your address.');
    }
    setPending(false);
  };

  return (
    <div className="max-w-md mx-auto py-24 px-6">
      <h1 className="text-2xl font-bold mb-4">{mode === 'signin' ? 'Sign In' : 'Sign Up'}</h1>
      <form onSubmit={handle} className="space-y-4">
        <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border rounded px-3 py-2" />
        <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full border rounded px-3 py-2" />
  {error && <div className="text-red-500 text-sm">{error}</div>}
  {info && <div className="text-green-600 text-sm">{info}</div>}
        <button disabled={pending} className="w-full bg-blue-600 disabled:bg-blue-400 text-white py-2 rounded">{pending ? 'Please wait...' : (mode==='signin'?'Sign In':'Create Account')}</button>
      </form>
      <button className="mt-4 text-sm text-blue-600" onClick={()=> setMode(m=> m==='signin'?'signup':'signin')}>{mode==='signin'?'Need an account? Sign Up':'Have an account? Sign In'}</button>
    </div>
  );
}
