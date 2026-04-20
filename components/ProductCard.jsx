'use client';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { isAdmin } = useAuth();
  const outOfStock = product.countInStock === 0;

  return (
    <div className="group flex flex-col">
      <div className="relative overflow-hidden bg-surface aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {outOfStock && (
          <span className="absolute top-3 left-3 bg-background/95 text-[10px] uppercase tracking-widest px-2 py-1 text-foreground">
            Sold out
          </span>
        )}
        {!isAdmin && !outOfStock && (
          <button
            onClick={() => addItem(product, 1)}
            className="absolute bottom-0 inset-x-0 bg-secondary/90 text-white text-xs uppercase tracking-widest py-3 translate-y-full group-hover:translate-y-0 transition-transform"
          >
            Add to bag
          </button>
        )}
      </div>
      <div className="pt-4 pb-2 text-center">
        <p className="eyebrow mb-1">{product.category}</p>
        <h3 className="font-serif text-base mb-1">{product.name}</h3>
        <p className="text-sm text-foreground">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
