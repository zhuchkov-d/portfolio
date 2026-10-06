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
      {(Array.isArray(section.body) ? section.body : [section.body]).map((paragraph, i) => (
        <p
          key={i}
          className={cn(
            "text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg",
            i === 0 ? "mt-6" : "mt-4"
          )}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function StoryVisual({ visual }: { visual: CaseVisual }) {
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
 * Бенто‑сетка: 1 элемент — крупно, как основное изображение; 2 — поровну;
 * 3 — первый занимает две колонки на десктопе.
 * `layout: "equal"` — равные колонки, каждый элемент со своим соотношением сторон.
 * `layout: "lead"` — первый во всю ширину, остальные поровну под ним.
 */
function StoryGallery({ gallery, className }: { gallery: CaseGallery; className?: string }) {
  const items = gallery.items.slice(0, 3);
  const three = items.length === 3;
  const equal = gallery.layout === "equal";

  if (items.length === 1) {
    return (
      <Reveal delay={0.15} className={cn("mt-4 sm:mt-5", className)}>
        <StoryVisual visual={items[0]} />
      </Reveal>
    );
  }

  if (gallery.layout === "lead") {
    const [lead, ...rest] = items;
    return (
      <div className={cn("mt-4 sm:mt-5", className)}>
        <Reveal delay={0.15}>
          <StoryVisual visual={lead} />
        </Reveal>
        <Reveal delay={0.2} className="mt-4 sm:mt-5">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {rest.map((item, i) => (
              <GalleryItem key={`${item.alt}-${i}`} item={item} />
            ))}
          </div>
        </Reveal>
      </div>
    );
  }

  return (
    <Reveal delay={0.15} className={cn("mt-4 sm:mt-5", className)}>
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
  return !!g && g.enabled !== false && g.items.length >= 1;
}

function StorySection({ section }: { section: CaseSection }) {
  const { visual } = section;
  const gallery = hasGallery(section) ? (
    <StoryGallery gallery={section.gallery} className={cn(!visual && "mt-12 sm:mt-16")} />
  ) : null;

  if (section.align === "center") {
    return (
      <article id={section.id} className="scroll-mt-24">
        <Reveal>
          <StoryText section={section} centered />
        </Reveal>
        {visual && (
          <Reveal delay={0.1} className="mt-12 sm:mt-16">
            <StoryVisual visual={visual} />
          </Reveal>
        )}
        {gallery}
      </article>
    );
  }

  const textFirst = section.align === "left";

  if (!visual) {
    return (
      <article id={section.id} className="scroll-mt-24">
        <div className="grid lg:grid-cols-12">
          <Reveal className={cn("lg:col-span-8", !textFirst && "lg:col-start-5")}>
            <StoryText section={section} />
          </Reveal>
        </div>
        {gallery}
      </article>
    );
  }

  const half = section.textWidth === "half";
  const [textCols, visualCols] = {
    default: ["lg:col-span-5", "lg:col-span-7"],
    half: ["lg:col-span-6", "lg:col-span-6"],
    wide: ["lg:col-span-8", "lg:col-span-4"],
  }[section.textWidth ?? "default"];

  return (
    <article id={section.id} className="scroll-mt-24">
      {/* В режиме `half` отступ колонок совпадает с галереей ниже, чтобы края изображений сошлись */}
      <div
        className={cn(
          "grid gap-10 lg:grid-cols-12 lg:items-center",
          half ? "lg:gap-x-5" : "lg:gap-16"
        )}
      >
        <Reveal
          className={cn(
            textCols,
            textFirst ? "lg:order-1" : "lg:order-2",
            half && (textFirst ? "lg:pr-11" : "lg:pl-11")
          )}
        >
          <StoryText section={section} />
        </Reveal>
        <Reveal
          delay={0.1}
          className={cn(visualCols, textFirst ? "lg:order-2" : "lg:order-1")}
        >
          <StoryVisual visual={visual} />
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
