import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PreviewFrame } from "@/components/preview-frame";
import { caseHref } from "@/lib/cases";
import type { Project } from "@/lib/content";

type ProjectCardProps = {
  project: Project;
  index: number;
  total: number;
};

export function ProjectCard({ project, index, total }: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={caseHref(project.id)}
      aria-label={`Открыть кейс ${project.title}`}
      className="group block rounded-[1.75rem] outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card className="gap-0 rounded-[1.75rem] bg-card p-2.5 shadow-none ring-0 transition-colors duration-500 group-hover:bg-[color-mix(in_oklch,var(--card),var(--foreground)_3%)] sm:p-3">
        <PreviewFrame
          src={project.preview}
          alt={`Превью проекта ${project.title}`}
          className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
        />

        <div className="grid gap-5 px-3 pt-6 pb-3 sm:px-4 sm:pt-7 sm:pb-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10">
          <div className="min-w-0">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground tabular-nums">
                {number}&thinsp;/&thinsp;{String(total).padStart(2, "0")}
              </span>
              <h3 className="text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
                {project.title}
              </h3>
            </div>
            <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <Badge
              variant="secondary"
              className="h-8 rounded-full px-3.5 text-xs font-normal text-muted-foreground"
            >
              {project.category}
            </Badge>
            <Badge
              variant="secondary"
              className="h-8 rounded-full px-3.5 text-xs font-normal text-muted-foreground tabular-nums"
            >
              {project.year}
            </Badge>
            <Badge
              className="h-8 rounded-full px-3.5 text-xs font-medium tabular-nums"
              title={project.metricLabel}
            >
              {project.metric}
            </Badge>
            <span className="ml-1 inline-flex size-8 items-center justify-center rounded-full bg-secondary text-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
