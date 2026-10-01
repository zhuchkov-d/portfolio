import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CV_URL } from "@/lib/content";

function OnlineStatus() {
  return (
    <Badge
      variant="outline"
      className="h-7 gap-2 rounded-full border-border/70 bg-background/60 px-3 text-xs font-normal text-muted-foreground"
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
      </span>
      <span className="hidden sm:inline">Открыт к новым проектам</span>
      <span className="sm:hidden">Открыт к проектам</span>
    </Badge>
  );
}

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6">
        <a
          href="#hero"
          className="justify-self-start text-sm font-medium tracking-tight transition-opacity hover:opacity-60"
        >
          Daniel Zhuchkov
        </a>

        <OnlineStatus />

        <Button
          asChild
          size="sm"
          variant="outline"
          className="group justify-self-end rounded-full px-3.5 shadow-none"
        >
          <a href={CV_URL} download>
            <span className="hidden sm:inline">Скачать CV</span>
            <span className="sm:hidden">CV</span>
            <Download
              data-icon="inline-end"
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </a>
        </Button>
      </div>
    </header>
  );
}
