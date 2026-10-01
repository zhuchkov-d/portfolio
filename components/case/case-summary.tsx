import { HoverCard } from "@/components/case/hover-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { CaseStudy } from "@/lib/cases";

type CaseSummaryProps = {
  summary: CaseStudy["summary"];
};

function TextCard({
  eyebrow,
  children,
  className,
}: {
  eyebrow: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <HoverCard className={className}>
      <div className="flex h-full flex-col justify-between gap-10 p-7 sm:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </p>
        <p className="text-lg leading-snug font-medium tracking-[-0.01em] text-pretty sm:text-xl lg:text-2xl">
          {children}
        </p>
      </div>
    </HoverCard>
  );
}

export function CaseSummary({ summary }: CaseSummaryProps) {
  return (
    <section id="summary" aria-label="Кратко" className="scroll-mt-24 pb-28 sm:pb-36">
      <SectionHeading
        eyebrow="Кратко"
        title="Проблема, решение, эффект"
        aside="Если читать только один блок — читайте этот."
      />

      <div className="grid gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <TextCard eyebrow="Проблема" className="h-full">
            {summary.problem}
          </TextCard>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-7">
          <TextCard eyebrow="Решение" className="h-full">
            {summary.solution}
          </TextCard>
        </Reveal>

        {summary.metrics.map((m, i) => (
          <Reveal key={m.label} delay={0.12 + i * 0.06} className="lg:col-span-4">
            <HoverCard className="h-full">
              <div className="flex h-full flex-col justify-between gap-8 p-7 sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div>
                  <p className="text-4xl font-medium tracking-[-0.03em] tabular-nums sm:text-5xl">
                    {m.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
                </div>
              </div>
            </HoverCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
