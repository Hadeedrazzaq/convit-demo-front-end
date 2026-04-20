'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import { useCatalog } from '../context/CatalogContext';
import { BRAND } from '../config/brand';

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const { count } = useCart();
  const { setActiveCategory } = useCatalog();
  const pathname = usePathname() || '';
  const onAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');

  return (
    <header className="bg-background border-b border-line sticky top-0 z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href={isAdmin ? '/admin/orders' : '/'}
          onClick={() => setActiveCategory('')}
          className="flex items-center gap-2"
        >
          <img src={BRAND.logo} alt={BRAND.name} className="h-8 w-auto" />
          <span className="font-serif text-xl tracking-brand uppercase">{BRAND.name}</span>
        </Link>

        {!isAdmin && (
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              onClick={() => setActiveCategory('')}
              className="link-nav"
            >
              Shop
            </Link>
            <Link href="/#shop" scroll={false} className="link-nav">
              Collection
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-5">
          {isAdmin ? (
            <>
              <Link href="/admin/products" className="link-nav">Products</Link>
              <Link href="/admin/orders" className="link-nav">Orders</Link>
              <span className="text-muted text-xs">Admin · {user.name}</span>
              <button onClick={logout} className="text-danger text-xs uppercase tracking-widest hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              {!onAuthPage && (
                <Link href="/cart" className="link-nav">
                  Cart{count ? ` (${count})` : ''}
                </Link>
              )}
              {user ? (
                <>
                  <Link href="/orders" className="link-nav">My Orders</Link>
                  <span className="text-muted text-xs">Hi, {user.name}</span>
                  <button onClick={logout} className="text-danger text-xs uppercase tracking-widest hover:underline">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="link-nav">Login</Link>
                  <Link href="/signup" className="link-nav">Signup</Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
