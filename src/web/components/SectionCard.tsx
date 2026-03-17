import { PropsWithChildren } from "react";

interface SectionCardProps extends PropsWithChildren {
  title: string;
  description?: string;
}

export function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <section className="section-card">
      <h2>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
      {children}
    </section>
  );
}
