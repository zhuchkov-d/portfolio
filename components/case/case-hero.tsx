import { PreviewFrame } from "@/components/preview-frame";
import { Reveal } from "@/components/reveal";
import type { CaseStudy } from "@/lib/cases";

type CaseHeroProps = {
  study: CaseStudy;
};

export function CaseHero({ study }: CaseHeroProps) {
  const domain = study.meta.find((m) => m.label === "Домен")?.value ?? "Кейс";
  const meta = study.meta.filter((m) => m.label !== "Домен");

  return (
    <section id="hero" aria-label="Обзор кейса" className="pt-32 pb-20 sm:pt-40 sm:pb-28">
      <Reveal immediate>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {domain}
        </p>
      </Reveal>

      <Reveal immediate delay={0.1}>
        <h1 className="mt-7 max-w-5xl text-[2.75rem] leading-[1.02] font-medium tracking-[-0.03em] text-balance sm:text-6xl lg:text-[5.25rem]">
          {study.title}
        </h1>
      </Reveal>

      <Reveal immediate delay={0.2}>
        <p className="mt-9 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl">
          {study.subtitle}
        </p>
      </Reveal>

      <Reveal immediate delay={0.3}>
        <dl className="mt-16 grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label} className="min-w-0">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
                {m.label}
              </dt>
              <dd className="mt-2 text-sm leading-snug font-medium text-pretty sm:text-[15px]">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal immediate delay={0.4} className="mt-16 sm:mt-20">
        <div className="group rounded-[1.75rem] bg-card p-2.5 sm:p-3">
          <PreviewFrame
            src={study.cover.src}
            alt={study.cover.alt}
            className={study.cover.aspect ?? "aspect-[4/3] sm:aspect-[21/9]"}
          />
        </div>
      </Reveal>
    </section>
  );
}
