'use client';
import { useEffect, useState } from 'react';
import Pagination from '../../../components/Pagination';
import {
  listProducts,
  createProduct,
  deleteProduct,
} from '../../../services/productService';

const EMPTY = {
  name: '',
  price: 0,
  description: '',
  category: '',
  image: '',
  countInStock: 0,
};
const PAGE_SIZE = 8;

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const refresh = async (targetPage = page) => {
    const data = await listProducts({ page: targetPage, limit: PAGE_SIZE });
    setProducts(data.items || []);
    setPages(data.pages || 1);
    setPage(data.page || 1);
  };

  useEffect(() => {
    refresh(1).catch((e) => setError(e.message));
  }, []);

  const onCreate = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await createProduct({
        ...form,
        price: Number(form.price),
        countInStock: Number(form.countInStock),
      });
      setForm(EMPTY);
      await refresh(1);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    await deleteProduct(id);
    const nextPage = products.length === 1 && page > 1 ? page - 1 : page;
    await refresh(nextPage);
  };

  return (
    <section className="py-10">
      <h1 className="font-serif text-3xl mb-6">Products</h1>

      <form onSubmit={onCreate} className="card p-5 grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        {error && <p className="text-danger text-sm md:col-span-3">{error}</p>}
        <input placeholder="Name" className="input" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Category" className="input" value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })} required />
        <input type="number" step="0.01" placeholder="Price" className="input" value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input placeholder="Image URL" className="input md:col-span-2" value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })} required />
        <input type="number" placeholder="Stock" className="input" value={form.countInStock}
          onChange={(e) => setForm({ ...form, countInStock: e.target.value })} required />
        <input placeholder="Description" className="input md:col-span-3" value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <button disabled={busy} className="btn-primary md:col-span-3">
          {busy ? 'Adding…' : 'Add product'}
        </button>
      </form>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t border-line">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">${p.price.toFixed(2)}</td>
                <td className="p-3">{p.countInStock}</td>
                <td className="p-3 text-right">
                  <button onClick={() => onDelete(p._id)} className="text-danger text-xs uppercase tracking-widest">
                    Delete
                  </button>
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
