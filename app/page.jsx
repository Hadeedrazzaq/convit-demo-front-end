'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductGrid from '../components/ProductGrid';
import Pagination from '../components/Pagination';
import useAuth from '../hooks/useAuth';
import { useCatalog } from '../context/CatalogContext';
import { listProducts } from '../services/productService';

const PAGE_SIZE = 8;

export default function HomePage() {
  const { ready, isAdmin } = useAuth();
  const router = useRouter();
  const { activeCategory, setActiveCategory } = useCatalog();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (ready && isAdmin) router.replace('/admin/orders');
  }, [ready, isAdmin, router]);

  useEffect(() => {
    listProducts({ limit: 50 })
      .then((data) => setProducts(data.items || []))
      .catch((e) => setError(e?.response?.data?.message || e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [activeCategory]);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).sort(),
    [products]
  );
  const filtered = useMemo(
    () => (activeCategory ? products.filter((p) => p.category === activeCategory) : products),
    [products, activeCategory]
  );
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (isAdmin) return null;

  return (
    <>
      <section className="relative -mx-6 mb-16 h-[70vh] min-h-[480px] bg-surface overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600"
          alt="Seasonal editorial"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
          <p className="uppercase tracking-[0.3em] text-xs mb-4">Spring / Summer</p>
          <h1 className="font-serif text-5xl md:text-7xl mb-6">The New Arrivals</h1>
          <button
            onClick={() =>
              document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="btn-primary bg-background text-foreground hover:bg-surface px-8"
          >
            Shop the collection
          </button>
        </div>
      </section>

      <section id="shop">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
          <div>
            <p className="eyebrow mb-1">Collection</p>
            <h2 className="font-serif text-3xl">{activeCategory || 'All Pieces'}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('')}
              className={activeCategory === '' ? 'btn-outline-active' : 'btn-outline'}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={activeCategory === c ? 'btn-outline-active' : 'btn-outline'}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading && <p className="text-muted">Loading…</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <>
            <ProductGrid products={paged} />
            <Pagination page={page} pages={pages} onChange={setPage} />
          </>
        )}
      </section>
    </>
  );
}
