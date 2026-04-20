export default function OrderStatusBadge({ status }) {
  const map = {
    Pending: 'bg-primary/10 text-primary border-primary/30',
    Delivered: 'bg-success/10 text-success border-success/30',
  };
  const cls = map[status] || 'bg-surface text-muted border-line';
  return (
    <span className={`inline-block border px-2.5 py-1 uppercase tracking-widest text-[10px] ${cls}`}>
      {status}
    </span>
  );
}
