interface StatProps {
  value: string;
  label: string;
}

export default function Stat({ value, label }: StatProps) {
  return (
    <div>
      <div className="text-primary-gold font-data-lg text-data-lg">{value}</div>
      <div className="text-label-sm font-label-sm text-on-surface-variant">
        {label}
      </div>
    </div>
  );
}
