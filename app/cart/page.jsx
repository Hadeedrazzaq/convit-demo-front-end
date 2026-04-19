'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CartItemRow from '../../components/CartItemRow';
import CustomerGuard from '../../components/CustomerGuard';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';
import { placeOrder } from '../../services/orderService';

const ADDR_FIELDS = ['fullName', 'address', 'city', 'postalCode', 'country', 'phone'];

function labelOf(key) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
}

function CartInner() {
  const { items, total, clear } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [addr, setAddr] = useState(Object.fromEntries(ADDR_FIELDS.map((f) => [f, ''])));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const onPlaceOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      router.push('/login');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const order = await placeOrder({
        orderItems: items.map(({ product, qty }) => ({ product, qty })),
        shippingAddress: addr,
      });
      clear();
      router.push(`/order-success?id=${order._id}`);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setBusy(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="font-serif text-3xl mb-3">Your bag is empty</h1>
        <p className="text-muted">Discover our new-season arrivals.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
      <div className="md:col-span-2">
        <h1 className="font-serif text-3xl mb-6">Shopping Bag</h1>
        <div className="card px-5">
          {items.map((i) => (
            <CartItemRow key={i.product} item={i} />
          ))}
        </div>
        <div className="text-right mt-4">
          Subtotal: <span className="font-serif text-xl">${total.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={onPlaceOrder} className="card p-6 space-y-3 h-fit">
        <h2 className="font-serif text-xl mb-2">Shipping · Cash on Delivery</h2>
        {error && <p className="text-danger text-sm">{error}</p>}
        {ADDR_FIELDS.map((k) => (
          <input
            key={k}
            placeholder={labelOf(k)}
            className="input"
            value={addr[k]}
            onChange={(e) => setAddr({ ...addr, [k]: e.target.value })}
            required
          />
        ))}
        <button disabled={busy} className="btn-primary w-full">
          {busy ? 'Placing…' : `Place Order · $${total.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
}

export default function CartPage() {
  return (
    <CustomerGuard>
      <CartInner />
    </CustomerGuard>
  );
}
