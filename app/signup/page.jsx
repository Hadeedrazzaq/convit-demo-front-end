'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuth from '../../hooks/useAuth';

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await signup(form.name, form.email, form.password);
      router.push('/');
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto card p-8 mt-12 space-y-4">
      <h1 className="font-serif text-2xl">Create account</h1>
      {error && <p className="text-danger text-sm">{error}</p>}
      <input placeholder="Name" className="input" value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <input type="email" placeholder="Email" className="input" value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <input type="password" placeholder="Password (min 6)" minLength={6} className="input" value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      <button disabled={busy} className="btn-primary w-full">
        {busy ? 'Creating…' : 'Sign up'}
      </button>
      <p className="text-sm text-muted">
        Already registered? <Link href="/login" className="underline hover:text-primary">Login</Link>
      </p>
    </form>
  );
}
