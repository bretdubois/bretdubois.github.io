export interface SpecItem {
  key: string;
  value: string;
}

export default function SpecSheet({ items }: { items: SpecItem[] }) {
  return (
    <dl className="spec-sheet">
      {items.map((item) => (
        <div key={item.key} className="spec-cell">
          <dt>{item.key}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
