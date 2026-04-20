'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import CustomerGuard from '../../components/CustomerGuard';
import ProtectedRoute from '../../components/ProtectedRoute';
import OrderStatusBadge from '../../components/OrderStatusBadge';
import Pagination from '../../components/Pagination';
import { getMyOrders } from '../../services/orderService';

const PAGE_SIZE = 8;

function MyOrdersInner() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMyOrders()
      .then((data) => setOrders(Array.isArray(data) ? data : data.items || []))
      .catch((e) => setError(e?.response?.data?.message || e.message))
      .finally(() => setLoading(false));
  }, []);

  const pages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const paged = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="py-10">
      <h1 className="font-serif text-3xl mb-6">My Orders</h1>

      {loading && <p className="text-muted">Loading…</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <div className="card p-10 text-center">
          <p className="text-muted mb-4">You haven&apos;t placed any orders yet.</p>
          <Link href="/" className="btn-primary inline-block">Start shopping</Link>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <>
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface text-left">
                <tr>
                  <th className="p-3">Order</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {paged.map((o) => (
                  <tr key={o._id} className="border-t border-line">
                    <td className="p-3 font-mono text-xs">{o._id.slice(-6)}</td>
                    <td className="p-3">{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">{o.orderItems.reduce((n, i) => n + i.qty, 0)}</td>
                    <td className="p-3">${o.totalPrice.toFixed(2)}</td>
                    <td className="p-3"><OrderStatusBadge status={o.status} /></td>
                    <td className="p-3 text-right">
                      <Link href={`/orders/${o._id}`} className="link-nav hover:text-primary">
                        Track
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} pages={pages} onChange={setPage} />
        </>
      )}
    </section>
  );
}

export default function MyOrdersPage() {
  return (
    <ProtectedRoute>
      <CustomerGuard>
        <MyOrdersInner />
      </CustomerGuard>
    </ProtectedRoute>
  );
}
