import { ArrowUpRight, Download, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LinkedInIcon, TelegramIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { CV_URL, contacts } from "@/lib/content";
import { cn } from "@/lib/utils";

const icons = {
  telegram: TelegramIcon,
  linkedin: LinkedInIcon,
  email: Mail,
} satisfies Record<(typeof contacts)[number]["id"], React.ElementType>;

const tileClass =
  "group relative flex aspect-square flex-col justify-between rounded-[1.5rem] p-6 shadow-none ring-0 transition-[background-color,transform] duration-500 sm:aspect-[4/3] lg:aspect-square";

export function Contacts() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {contacts.map((c, i) => {
        const Icon = icons[c.id];
        const external = !c.href.startsWith("mailto:");
        return (
          <Reveal key={c.id} delay={i * 0.08}>
            <a
              href={c.href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="block rounded-[1.5rem] outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Card
                className={cn(
                  tileClass,
                  "bg-card hover:-translate-y-0.5 hover:bg-[color-mix(in_oklch,var(--card),var(--foreground)_4%)]"
                )}
              >
                <div className="flex items-start justify-between">
                  <Icon className="size-5 text-foreground" />
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {c.label}
                  </p>
                  <p className="mt-1.5 truncate text-base font-medium tracking-tight">
                    {c.value}
                  </p>
                </div>
              </Card>
            </a>
          </Reveal>
        );
      })}

      <Reveal delay={contacts.length * 0.08}>
        <a
          href={CV_URL}
          download
          className="block rounded-[1.5rem] outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Card
            className={cn(
              tileClass,
              "bg-primary text-primary-foreground hover:-translate-y-0.5 hover:bg-primary/90"
            )}
          >
            <div className="flex items-start justify-between">
              <Download className="size-5 transition-transform duration-300 group-hover:translate-y-0.5" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary-foreground/60">
                PDF
              </span>
            </div>
            <div>
              <p className="text-2xl font-medium tracking-tight">Скачать CV</p>
              <p className="mt-1.5 text-sm text-primary-foreground/60">
                Обновлено · 2026
              </p>
            </div>
          </Card>
        </a>
      </Reveal>
    </div>
  );
}
