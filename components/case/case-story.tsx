import { PreviewFrame } from "@/components/preview-frame";
import { Reveal } from "@/components/reveal";
import type { CaseGallery, CaseSection, CaseVisual } from "@/lib/cases";
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
          fit={visual.fit}
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

function GalleryItem({ item, className }: { item: CaseVisual; className?: string }) {
  return (
    <figure className={cn("group min-w-0", className)}>
      <div className="h-full rounded-[1.5rem] bg-card p-2 transition-colors duration-500 hover:bg-[color-mix(in_oklch,var(--card),var(--foreground)_3%)] sm:p-2.5">
        <PreviewFrame
          src={item.src}
          alt={item.alt}
          fit={item.fit}
          className={cn("h-full rounded-[1.1rem]", item.aspect ?? "aspect-[4/3]")}
        />
      </div>
      {item.caption && (
        <figcaption className="mt-3 px-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Бенто‑сетка: 2 элемента — поровну, 3 — первый занимает две колонки на десктопе.
 * `layout: "equal"` — равные колонки, каждый элемент со своим соотношением сторон.
 */
function StoryGallery({ gallery }: { gallery: CaseGallery }) {
  const items = gallery.items.slice(0, 3);
  const three = items.length === 3;
  const equal = gallery.layout === "equal";

  return (
    <Reveal delay={0.15} className="mt-4 sm:mt-5">
      <div
        className={cn(
          "grid gap-4 sm:gap-5",
          three ? (equal ? "sm:grid-cols-3" : "lg:grid-cols-3") : "sm:grid-cols-2",
          equal && "items-start"
        )}
      >
        {items.map((item, i) => (
          <GalleryItem
            key={`${item.alt}-${i}`}
            item={item}
            className={cn(three && !equal && i === 0 && "lg:col-span-2")}
          />
        ))}
      </div>
    </Reveal>
  );
}

function hasGallery(section: CaseSection): section is CaseSection & { gallery: CaseGallery } {
  const g = section.gallery;
  return !!g && g.enabled !== false && g.items.length >= 2;
}

function StorySection({ section }: { section: CaseSection }) {
  const gallery = hasGallery(section) ? <StoryGallery gallery={section.gallery} /> : null;

  if (section.align === "center") {
    return (
      <article id={section.id} className="scroll-mt-24">
        <Reveal>
          <StoryText section={section} centered />
        </Reveal>
        <Reveal delay={0.1} className="mt-12 sm:mt-16">
          <StoryVisual section={section} />
        </Reveal>
        {gallery}
      </article>
    );
  }

  const textFirst = section.align === "left";

  return (
    <article id={section.id} className="scroll-mt-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
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
      </div>
      {gallery}
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
