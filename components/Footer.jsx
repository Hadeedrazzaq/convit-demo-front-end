'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useCatalog } from '../context/CatalogContext';
import { BRAND } from '../config/brand';

const SHOP_LINKS = ['Dresses', 'Outerwear', 'Knitwear', 'Accessories'];

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const { setActiveCategory } = useCatalog();

  const goCategory = (cat) => {
    setActiveCategory(cat);
    if (pathname !== '/') router.push('/');
    setTimeout(() => {
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <footer className="mt-24 border-t border-line bg-background">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h3 className="font-serif text-lg mb-3">{BRAND.name}</h3>
          <p className="text-muted">{BRAND.tagline}</p>
        </div>

        <div>
          <h4 className="eyebrow mb-3">Shop</h4>
          <ul className="space-y-2 text-muted">
            {SHOP_LINKS.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => goCategory(cat)}
                  className="hover:text-primary transition-colors"
                >
                  {cat}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => goCategory('')}
                className="hover:text-primary transition-colors"
              >
                All Pieces
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-3">Help</h4>
          <ul className="space-y-2 text-muted">
            <li>Shipping &amp; Returns</li>
            <li>Size Guide</li>
            <li>Contact</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-3">Newsletter</h4>
          <p className="text-muted mb-3">Early access to new arrivals.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex">
            <input type="email" placeholder="Email" className="input flex-1" />
            <button className="bg-primary hover:bg-primary-dark text-white px-4 text-xs uppercase tracking-widest">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} {BRAND.name}. {BRAND.footerNote}
      </div>
    </footer>
  );
}
