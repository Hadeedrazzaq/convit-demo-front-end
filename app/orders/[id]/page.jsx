'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import CustomerGuard from '../../../components/CustomerGuard';
import ProtectedRoute from '../../../components/ProtectedRoute';
import OrderStatusBadge from '../../../components/OrderStatusBadge';
import OrderTimeline from '../../../components/OrderTimeline';
import { getOrderById } from '../../../services/orderService';

function OrderDetailInner() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getOrderById(id)
      .then(setOrder)
      .catch((e) => setError(e?.response?.data?.message || e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-muted py-10">Loading…</p>;
  if (error) return <p className="text-danger py-10">{error}</p>;
  if (!order) return null;

  const addr = order.shippingAddress;

  return (
    <section className="py-10">
      <Link href="/orders" className="link-nav text-muted hover:text-primary">
        ← Back to My Orders
      </Link>

      <div className="flex flex-wrap items-end justify-between gap-4 mt-4 mb-8">
        <div>
          <p className="eyebrow mb-1">Order</p>
          <h1 className="font-serif text-3xl">#{order._id.slice(-6).toUpperCase()}</h1>
          <p className="text-sm text-muted mt-1">
            Placed {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="font-serif text-xl mb-4">Tracking</h2>
            <OrderTimeline order={order} />
          </div>

          <div className="card">
            <h2 className="font-serif text-xl p-5 border-b border-line">Items</h2>
            <div className="divide-y divide-line">
              {order.orderItems.map((i) => (
                <div key={i.product} className="flex items-center gap-4 p-5">
                  <img src={i.image} alt={i.name} className="w-16 h-16 object-cover" />
                  <div className="flex-1">
                    <p className="font-medium">{i.name}</p>
                    <p className="text-sm text-muted">Qty {i.qty} · ${i.price.toFixed(2)}</p>
                  </div>
                  <span className="font-serif">${(i.qty * i.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card p-5">
            <h3 className="eyebrow mb-3">Summary</h3>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted">Payment</span>
              <span>Cash on Delivery</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted">Items</span>
              <span>{order.orderItems.reduce((n, i) => n + i.qty, 0)}</span>
            </div>
            <div className="border-t border-line my-3" />
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-serif text-xl">${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="eyebrow mb-3">Shipping to</h3>
            <p className="text-sm font-medium">{addr.fullName}</p>
            <p className="text-sm text-muted">{addr.address}</p>
            <p className="text-sm text-muted">
              {addr.city}, {addr.postalCode}
            </p>
            <p className="text-sm text-muted">{addr.country}</p>
            <p className="text-sm text-muted mt-2">{addr.phone}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default function OrderDetailPage() {
  return (
    <ProtectedRoute>
      <CustomerGuard>
        <OrderDetailInner />
      </CustomerGuard>
    </ProtectedRoute>
  );
}
