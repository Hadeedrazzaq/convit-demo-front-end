const STEPS = [
  { key: 'placed', label: 'Order Placed', desc: 'We received your order.' },
  { key: 'pending', label: 'Preparing', desc: 'Being packed for dispatch.' },
  { key: 'delivered', label: 'Delivered', desc: 'Package delivered. Pay on receipt.' },
];

export default function OrderTimeline({ order }) {
  const reached = order.status === 'Delivered' ? 2 : 1;

  return (
    <ol className="relative border-l border-line ml-3 space-y-6">
      {STEPS.map((s, i) => {
        const done = i <= reached;
        return (
          <li key={s.key} className="pl-6">
            <span
              className={`absolute -left-[9px] w-4 h-4 rounded-full border-2 ${
                done ? 'bg-primary border-primary' : 'bg-background border-line'
              }`}
            />
            <p className={`font-medium ${done ? 'text-foreground' : 'text-muted'}`}>
              {s.label}
            </p>
            <p className="text-sm text-muted">{s.desc}</p>
            {s.key === 'placed' && (
              <p className="text-xs text-muted mt-1">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            )}
            {s.key === 'delivered' && order.deliveredAt && (
              <p className="text-xs text-muted mt-1">
                {new Date(order.deliveredAt).toLocaleString()}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
