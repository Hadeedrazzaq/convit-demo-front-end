'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../hooks/useAuth';

export default function CustomerGuard({ children }) {
  const { ready, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && isAdmin) router.replace('/admin/orders');
  }, [ready, isAdmin, router]);

  if (!ready) return null;
  if (isAdmin) return null;
  return children;
}
