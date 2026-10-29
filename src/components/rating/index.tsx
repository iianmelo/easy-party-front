export default function Rating({
  value,
  reviews
}: {
  value: number;
  reviews?: number;
}) {
  const full = Math.max(0, Math.min(5, Math.round(value)));
  const label = value.toFixed(1).replace('.', ',');

  return (
    <p className="flex items-center gap-1.5 text-sm">
      <span className="sr-only">
        Avaliação {label} de 5
        {reviews != null ? `, ${reviews} avaliações` : ''}
      </span>
      <span aria-hidden className="tracking-tight text-amber-700">
        {'★'.repeat(full)}
        <span className="text-stone-300">{'★'.repeat(5 - full)}</span>
      </span>
      <span className="font-medium text-foreground">{label}</span>
      {reviews != null && (
        <span className="text-muted-foreground">({reviews})</span>
      )}
    </p>
  );
}
