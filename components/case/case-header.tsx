import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CaseStudy } from "@/lib/cases";
import { caseHref } from "@/lib/cases";

type CaseHeaderProps = {
  title: string;
  next: CaseStudy;
};

export function CaseHeader({ title, next }: CaseHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/70 backdrop-blur-xl [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 justify-self-start text-sm font-medium tracking-tight transition-opacity hover:opacity-60"
        >
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span className="hidden sm:inline">Все проекты</span>
          <span className="sm:hidden">Назад</span>
        </Link>

        <span className="truncate font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {title}
        </span>

        <Button
          asChild
          size="sm"
          variant="secondary"
          className="group justify-self-end rounded-full bg-secondary/70 px-3.5 shadow-none has-data-[icon=inline-end]:pr-3.5"
        >
          <Link href={caseHref(next.slug)}>
            <span className="hidden sm:inline">Следующий кейс</span>
            <span className="sm:hidden">Далее</span>
            <ArrowRight
              data-icon="inline-end"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </Button>
      </div>
    </header>
  );
}
