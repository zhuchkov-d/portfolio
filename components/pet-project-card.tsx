import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FigmaIcon } from "@/components/icons";
import { PreviewFrame } from "@/components/preview-frame";
import { petProject } from "@/lib/content";

export function PetProjectCard() {
  return (
    <Card className="group rounded-[1.75rem] bg-foreground text-background shadow-none ring-0 [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)] lg:[--card-spacing:--spacing(10)]">
      <div className="grid gap-10 px-(--card-spacing) lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-14">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-background/60">
            <FigmaIcon className="size-4" />
            <span>{petProject.category}</span>
          </div>

          <h3 className="mt-6 text-4xl font-medium tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            {petProject.title}
          </h3>

          <p className="mt-5 max-w-md text-base leading-relaxed text-background/70">
            {petProject.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Badge className="h-9 rounded-full bg-background px-4 text-sm font-medium text-foreground tabular-nums">
              {petProject.metric}
            </Badge>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="h-9 rounded-full px-4 text-background hover:bg-background/10 hover:text-background"
            >
              <a href={petProject.href} target="_blank" rel="noreferrer">
                Открыть в Figma Community
                <ArrowUpRight
                  data-icon="inline-end"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Button>
          </div>
        </div>

        <PreviewFrame tone="dark" alt="Превью плагина Path Arrows" />
      </div>
    </Card>
  );
}
