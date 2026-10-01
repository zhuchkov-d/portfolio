import { HoverCard } from "@/components/case/hover-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { CaseConstraint } from "@/lib/cases";
import { cn } from "@/lib/utils";

export function CaseConstraints({ items }: { items: CaseConstraint[] }) {
  const twoColumns = items.length % 2 === 0 && items.length % 3 !== 0;

  return (
    <section id="constraints" aria-label="Ограничения" className="scroll-mt-24 pb-28 sm:pb-36">
      <SectionHeading
        eyebrow="Ограничения"
        title="С чем пришлось считаться"
        aside="Контекст, который определял решения не меньше, чем исследования."
      />

      <div className={cn("grid gap-4", twoColumns ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3")}>
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06}>
            <HoverCard className="h-full">
              <div className="flex h-full flex-col gap-8 p-7 sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div className="mt-auto">
                  <h3 className="text-xl font-medium tracking-[-0.02em] text-balance">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                    {item.body}
                  </p>
                </div>
              </div>
            </HoverCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
