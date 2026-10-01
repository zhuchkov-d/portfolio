import { HoverCard } from "@/components/case/hover-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { CaseStudy } from "@/lib/cases";

export function CaseResults({ results }: { results: CaseStudy["results"] }) {
  return (
    <section id="results" aria-label="Результаты" className="scroll-mt-24 pb-28 sm:pb-36">
      <SectionHeading eyebrow="Результаты" title="Что изменилось" />

      <Reveal>
        <p className="max-w-4xl text-2xl leading-snug font-medium tracking-[-0.02em] text-balance sm:text-3xl lg:text-4xl">
          {results.lead}
        </p>
      </Reveal>

      <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:mt-20 lg:grid-cols-4">
        {results.metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.06}>
            <div className="border-t border-border pt-5">
              <dt className="sr-only">{m.label}</dt>
              <dd className="text-4xl font-medium tracking-[-0.03em] tabular-nums sm:text-5xl lg:text-6xl">
                {m.value}
              </dd>
              <dd className="mt-3 text-sm text-muted-foreground">{m.label}</dd>
              {m.note && (
                <dd className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground/60">
                  {m.note}
                </dd>
              )}
            </div>
          </Reveal>
        ))}
      </dl>

      <Reveal className="mt-14 sm:mt-20">
        <HoverCard className="bg-foreground text-background hover:bg-[color-mix(in_oklch,var(--foreground),var(--background)_6%)]">
          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-12 lg:items-end">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-background/60 lg:col-span-3">
              Главный вывод
            </p>
            <p className="text-xl leading-snug font-medium tracking-[-0.02em] text-balance sm:text-2xl lg:col-span-9 lg:text-3xl">
              {results.takeaway}
            </p>
          </div>
        </HoverCard>
      </Reveal>
    </section>
  );
}
