'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../hooks/useAuth';

export default function AdminGuard({ children }) {
  const { user, ready, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!user) router.replace('/login');
    else if (!isAdmin) router.replace('/');
  }, [ready, user, isAdmin, router]);

  if (!ready || !user || !isAdmin) return <p className="p-6">Checking access…</p>;
  return children;
}
