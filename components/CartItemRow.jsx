'use client';
import useCart from '../hooks/useCart';

export default function CartItemRow({ item }) {
  const { updateQty, removeItem } = useCart();
  return (
    <div className="flex items-center gap-4 py-3 border-b border-line">
      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
      <div className="flex-1">
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-muted">${item.price.toFixed(2)} each</p>
      </div>
      <input
        type="number"
        min={1}
        value={item.qty}
        onChange={(e) => updateQty(item.product, Number(e.target.value))}
        className="input w-16 text-right"
      />
      <span className="w-20 text-right font-serif">${(item.price * item.qty).toFixed(2)}</span>
      <button onClick={() => removeItem(item.product)} className="text-danger text-xs uppercase tracking-widest">
        Remove
      </button>
    </div>
  );
}
