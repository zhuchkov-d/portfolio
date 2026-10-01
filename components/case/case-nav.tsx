import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { HoverCard } from "@/components/case/hover-card";
import { PreviewFrame } from "@/components/preview-frame";
import { Reveal } from "@/components/reveal";
import { caseHref, getProjectForCase, type CaseStudy } from "@/lib/cases";
import { cn } from "@/lib/utils";

type Direction = "prev" | "next";

function NavCard({ study, direction }: { study: CaseStudy; direction: Direction }) {
  const project = getProjectForCase(study.slug);
  const isNext = direction === "next";
  const Icon = isNext ? ArrowRight : ArrowLeft;

  return (
    <Link
      href={caseHref(study.slug)}
      rel={direction}
      className="block rounded-[1.5rem] outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <HoverCard className="h-full">
        <div
          className={cn(
            "flex h-full flex-col gap-8 p-6 sm:flex-row sm:items-stretch sm:gap-8 sm:p-7",
            isNext ? "sm:text-right" : ""
          )}
        >
          <div
            className={cn(
              "flex min-w-0 flex-1 flex-col justify-between gap-10",
              isNext && "sm:order-2 sm:items-end"
            )}
          >
            <p
              className={cn(
                "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
                isNext && "sm:flex-row-reverse"
              )}
            >
              <Icon
                className={cn(
                  "size-3.5 transition-transform duration-300",
                  isNext ? "group-hover:translate-x-0.5" : "group-hover:-translate-x-0.5"
                )}
              />
              {isNext ? "Следующий кейс" : "Предыдущий кейс"}
            </p>
            <div>
              <h3 className="text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
                {study.title}
              </h3>
              {project && (
                <p className="mt-2 text-sm text-muted-foreground">{project.category}</p>
              )}
            </div>
          </div>

          <div className={cn("w-full shrink-0 sm:w-36", isNext && "sm:order-1")}>
            <PreviewFrame
              src={study.cover.src}
              alt={`Превью кейса ${study.title}`}
              className="aspect-[16/10] rounded-2xl sm:aspect-[4/5] sm:h-full"
            />
          </div>
        </div>
      </HoverCard>
    </Link>
  );
}

export function CaseNav({ prev, next }: { prev: CaseStudy; next: CaseStudy }) {
  return (
    <section id="nav" aria-label="Другие кейсы" className="scroll-mt-24 pb-24 sm:pb-32">
      <div className="grid gap-4 sm:grid-cols-2">
        <Reveal>
          <NavCard study={prev} direction="prev" />
        </Reveal>
        <Reveal delay={0.08}>
          <NavCard study={next} direction="next" />
        </Reveal>
      </div>
    </section>
  );
}
