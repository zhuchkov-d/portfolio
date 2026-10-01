import { Reveal } from "@/components/reveal";

const facts = [
  { value: "5+", label: "лет в продуктовом дизайне" },
  { value: "B2B / Mobile", label: "Моя ключевая экспертиза" },
  { value: "1", label: "плагин в Figma Community" },
];

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Обо мне"
      className="scroll-mt-24 pt-40 pb-28 sm:pt-48 sm:pb-36"
    >
      <Reveal immediate>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Product designer · B2B [CAD,CRM] / SaaS / Mobile
        </p>
      </Reveal>

      <Reveal immediate delay={0.1}>
        <h1 className="mt-7 max-w-5xl text-[2.75rem] leading-[1.02] font-medium tracking-[-0.03em] text-balance sm:text-6xl lg:text-[5.25rem]">
          Привет я Даниил,<br />продуктовый дизайнер с&nbsp;обширным опытом
        </h1>
      </Reveal>

      <Reveal immediate delay={0.2}>
        <p className="mt-9 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Самостоятельно веду product design, взаимодействую с разработчиками и стейкхолдерами. Провожу product discovery и презентую свои решения
        </p>
      </Reveal>

      <Reveal immediate delay={0.3}>
        <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-6">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="sr-only">{f.label}</dt>
              <dd className="text-3xl font-medium tracking-tight sm:text-4xl">
                {f.value}
              </dd>
              <dd className="mt-1.5 text-xs leading-snug text-muted-foreground sm:text-sm">
                {f.label}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
