'use client';

export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;
  const go = (p) => onChange(Math.min(Math.max(1, p), pages));
  const nums = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(pages, start + 4);
  for (let i = start; i <= end; i++) nums.push(i);

  return (
    <div className="flex items-center justify-center gap-1 mt-10">
      <button onClick={() => go(page - 1)} disabled={page === 1} className="btn-outline disabled:opacity-40">
        Prev
      </button>
      {nums.map((n) => (
        <button
          key={n}
          onClick={() => go(n)}
          className={n === page ? 'btn-outline-active' : 'btn-outline'}
        >
          {n}
        </button>
      ))}
      <button onClick={() => go(page + 1)} disabled={page === pages} className="btn-outline disabled:opacity-40">
        Next
      </button>
    </div>
  );
}
