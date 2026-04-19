'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuth from '../../hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const u = await login(form.email, form.password);
      router.push(u.isAdmin ? '/admin/orders' : '/');
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto card p-8 mt-12 space-y-4">
      <h1 className="font-serif text-2xl">Login</h1>
      {error && <p className="text-danger text-sm">{error}</p>}
      <input type="email" placeholder="Email" className="input" value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <input type="password" placeholder="Password" className="input" value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      <button disabled={busy} className="btn-primary w-full">
        {busy ? 'Signing in…' : 'Login'}
      </button>
      <p className="text-sm text-muted">
        No account? <Link href="/signup" className="underline hover:text-primary">Sign up</Link>
      </p>
    </form>
  );
}
