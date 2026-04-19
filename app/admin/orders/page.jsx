'use client';
import { useEffect, useState } from 'react';
import Pagination from '../../../components/Pagination';
import { listAllOrders, markDelivered } from '../../../services/orderService';

const PAGE_SIZE = 10;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);

  const refresh = async (targetPage = page) => {
    const data = await listAllOrders({ page: targetPage, limit: PAGE_SIZE });
    setOrders(data.items || []);
    setPages(data.pages || 1);
    setPage(data.page || 1);
  };

  useEffect(() => {
    refresh(1).catch((e) => setError(e?.response?.data?.message || e.message));
  }, []);

  const onDeliver = async (id) => {
    setBusyId(id);
    try {
      await markDelivered(id);
      await refresh(page);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <section className="py-10">
      <h1 className="font-serif text-3xl mb-6">Orders</h1>
      {error && <p className="text-danger">{error}</p>}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left">
            <tr>
              <th className="p-3">Order</th>
              <th className="p-3">User</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Placed</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-t border-line">
                <td className="p-3 font-mono text-xs">{o._id.slice(-6)}</td>
                <td className="p-3">
                  {o.user?.name}{' '}
                  <span className="text-muted text-xs">({o.user?.email})</span>
                </td>
                <td className="p-3">${o.totalPrice.toFixed(2)}</td>
                <td className="p-3">
                  <span className={o.status === 'Delivered' ? 'text-success' : 'text-primary'}>
                    {o.status}
                  </span>
                </td>
                <td className="p-3">{new Date(o.createdAt).toLocaleString()}</td>
                <td className="p-3 text-right">
                  {o.status === 'Pending' ? (
                    <button
                      disabled={busyId === o._id}
                      onClick={() => onDeliver(o._id)}
                      className="btn-primary px-3 py-1 disabled:bg-muted"
                    >
                      {busyId === o._id ? 'Updating…' : 'Mark Delivered'}
                    </button>
                  ) : (
                    <span className="text-xs text-muted">
                      {o.deliveredAt && new Date(o.deliveredAt).toLocaleDateString()}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pages={pages} onChange={(p) => refresh(p)} />
    </section>
  );
}
