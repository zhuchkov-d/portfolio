import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FigmaIcon } from "@/components/icons";
import { PreviewFrame } from "@/components/preview-frame";
import { petProject } from "@/lib/content";

export function PetProjectCard() {
  return (
    <a
      href={petProject.href}
      target="_blank"
      rel="noreferrer"
      className="block rounded-[1.75rem] outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card className="group gap-0 rounded-[1.75rem] bg-foreground p-2.5 text-background shadow-none ring-0 sm:p-3">
        <PreviewFrame
          tone="inverted"
          src={petProject.preview}
          alt="Превью плагина Path Arrows"
          className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
        />

        <div className="grid gap-5 px-3 pt-6 pb-3 sm:px-4 sm:pt-7 sm:pb-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <FigmaIcon className="size-5 shrink-0 text-background/60" />
              <h3 className="text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
                {petProject.title}
              </h3>
            </div>
            <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-background/60 line-clamp-2">
              {petProject.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <Badge className="h-8 rounded-full bg-background/10 px-3.5 text-xs font-normal text-background/70">
              {petProject.category}
            </Badge>
            <Badge className="h-8 rounded-full bg-background px-3.5 text-xs font-medium text-foreground tabular-nums">
              {petProject.metric}
            </Badge>
            <span className="ml-1 inline-flex h-8 items-center gap-1.5 rounded-full bg-background/10 pr-2.5 pl-3.5 text-xs font-medium text-background transition-colors duration-300 group-hover:bg-background group-hover:text-foreground">
              Figma Community
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Card>
    </a>
  );
}
