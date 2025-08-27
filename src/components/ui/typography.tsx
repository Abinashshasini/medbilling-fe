export function TypographyH1({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-extrabold tracking-tight text-balance ${className}`}
    >
      {text}
    </h1>
  );
}

export function TypographyH2({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <h2 className={`text-2xl font-bold tracking-tight ${className}`}>{text}</h2>
  );
}

export function TypographyH3({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <h3
      className={`scroll-m-20 text-base font-medium tracking-tight ${className}`}
    >
      {text}
    </h3>
  );
}

export function TypographyP({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <p
      className={`leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground ${className}`}
    >
      {text}
    </p>
  );
}
