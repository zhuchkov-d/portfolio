import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PreviewFrame } from "@/components/preview-frame";
import type { Project } from "@/lib/content";

type ProjectCardProps = {
  project: Project;
  index: number;
  total: number;
};

export function ProjectCard({ project, index, total }: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <Card className="group rounded-[1.75rem] bg-card shadow-none ring-foreground/8 transition-[box-shadow,--tw-ring-color] duration-500 hover:ring-foreground/20 [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)] lg:[--card-spacing:--spacing(10)]">
      <div className="grid gap-10 px-(--card-spacing) lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-14">
        <div className="flex flex-col">
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span>{project.category}</span>
            <span className="tabular-nums">
              {number}&thinsp;/&thinsp;{String(total).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mt-6 text-4xl font-medium tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            {project.title}
          </h3>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
            <Badge className="h-9 rounded-full px-4 text-sm font-medium tabular-nums">
              {project.metric}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {project.metricLabel}
            </span>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-border/70 pt-5 text-sm">
            <span className="text-muted-foreground tabular-nums">{project.year}</span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              Смотреть кейс
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>

        <PreviewFrame src={project.preview} alt={`Превью проекта ${project.title}`} />
      </div>
    </Card>
  );
}
