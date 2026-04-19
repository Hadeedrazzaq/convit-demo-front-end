'use client';
import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SuccessInner() {
  const params = useSearchParams();
  const id = params.get('id');
  return (
    <div className="max-w-md mx-auto card p-10 text-center mt-12">
      <h1 className="font-serif text-3xl text-success mb-2">Order placed!</h1>
      <p className="text-muted mb-1">Your Cash-on-Delivery order is confirmed.</p>
      {id && <p className="text-xs text-muted mb-6">Reference: #{id.slice(-6).toUpperCase()}</p>}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {id && (
          <Link href={`/orders/${id}`} className="btn-primary inline-block">
            Track your order
          </Link>
        )}
        <Link href="/" className="btn-outline inline-block px-6 py-3">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <SuccessInner />
    </Suspense>
  );
}
