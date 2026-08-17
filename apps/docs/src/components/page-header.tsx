export function PageHeader({
  title,
  description,
  eyebrow,
}: {
  title: string;
  description: string;
  eyebrow?: string;
}) {
  return (
    <header className="mb-10">
      {eyebrow ? (
        <p className="mb-2 font-medium text-accent-fg text-sm uppercase tracking-wider">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-bold text-3xl text-fg tracking-tight">{title}</h1>
      <p className="mt-3 max-w-2xl text-fg-muted text-lg">{description}</p>
    </header>
  );
}
