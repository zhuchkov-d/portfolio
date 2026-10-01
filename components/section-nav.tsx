"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { sections, type SectionId } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SectionNav() {
  const [active, setActive] = useState<SectionId>(sections[0].id);

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    // Активен раздел, пересекающий горизонтальную линию чуть выше центра экрана
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -55% 0px", threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));

    // Последний раздел может быть короче половины экрана — подсвечиваем его у нижней границы страницы
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) setActive(sections[sections.length - 1].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Разделы страницы"
      className="group fixed bottom-6 left-6 z-50 hidden md:block"
    >
      <ul className="flex flex-col gap-0.5 rounded-2xl border border-border/70 bg-background/80 p-1.5 shadow-xs backdrop-blur-xl">
        {sections.map((s) => {
          const isActive = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative flex h-8 items-center rounded-xl px-2.5 text-sm outline-none transition-colors duration-300 focus-visible:ring-3 focus-visible:ring-ring/50",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="section-nav-active"
                    className="absolute inset-0 rounded-xl bg-muted"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <span
                  className={cn(
                    "relative size-1.5 shrink-0 rounded-full transition-[background-color,transform] duration-300",
                    isActive
                      ? "scale-125 bg-foreground"
                      : "bg-muted-foreground/40 group-hover:bg-muted-foreground/70"
                  )}
                />
                <span className="relative grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:grid-cols-[1fr] group-focus-within:grid-cols-[1fr]">
                  <span className="overflow-hidden whitespace-nowrap pl-0 opacity-0 transition-[opacity,padding] duration-300 group-hover:pl-3 group-hover:opacity-100 group-focus-within:pl-3 group-focus-within:opacity-100">
                    {s.label}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
