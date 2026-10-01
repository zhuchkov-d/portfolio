import { PreviewFrame } from "@/components/preview-frame";
import { Reveal } from "@/components/reveal";
import type { CaseSection } from "@/lib/cases";
import { cn } from "@/lib/utils";

function StoryText({ section, centered }: { section: CaseSection; centered?: boolean }) {
  return (
    <div className={cn("min-w-0", centered && "mx-auto max-w-2xl text-center")}>
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
        {section.eyebrow}
      </p>
      <h2 className="mt-5 text-3xl font-medium tracking-[-0.03em] text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
        {section.title}
      </h2>
      <p className="mt-6 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
        {section.body}
      </p>
    </div>
  );
}

function StoryVisual({ section }: { section: CaseSection }) {
  const { visual } = section;
  return (
    <figure className="group min-w-0">
      <div className="rounded-[1.75rem] bg-card p-2.5 transition-colors duration-500 hover:bg-[color-mix(in_oklch,var(--card),var(--foreground)_3%)] sm:p-3">
        <PreviewFrame
          src={visual.src}
          alt={visual.alt}
          className={visual.aspect ?? "aspect-[16/10]"}
        />
      </div>
      {visual.caption && (
        <figcaption className="mt-4 px-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
          {visual.caption}
        </figcaption>
      )}
    </figure>
  );
}

function StorySection({ section }: { section: CaseSection }) {
  if (section.align === "center") {
    return (
      <article id={section.id} className="scroll-mt-24">
        <Reveal>
          <StoryText section={section} centered />
        </Reveal>
        <Reveal delay={0.1} className="mt-12 sm:mt-16">
          <StoryVisual section={section} />
        </Reveal>
      </article>
    );
  }

  const textFirst = section.align === "left";

  return (
    <article
      id={section.id}
      className="grid scroll-mt-24 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16"
    >
      <Reveal
        className={cn(
          "lg:col-span-5",
          textFirst ? "lg:order-1" : "lg:order-2"
        )}
      >
        <StoryText section={section} />
      </Reveal>
      <Reveal
        delay={0.1}
        className={cn(
          "lg:col-span-7",
          textFirst ? "lg:order-2" : "lg:order-1"
        )}
      >
        <StoryVisual section={section} />
      </Reveal>
    </article>
  );
}

export function CaseStory({ sections }: { sections: CaseSection[] }) {
  return (
    <section
      id="story"
      aria-label="Процесс"
      className="scroll-mt-24 flex flex-col gap-28 pb-28 sm:gap-40 sm:pb-36"
    >
      {sections.map((s) => (
        <StorySection key={s.id} section={s} />
      ))}
    </section>
  );
}
