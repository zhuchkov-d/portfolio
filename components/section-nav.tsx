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
      <ul className="flex flex-col rounded-2xl p-2 transition-colors duration-300 group-hover:bg-background/70 group-hover:backdrop-blur-xl group-focus-within:bg-background/70 group-focus-within:backdrop-blur-xl">
        {sections.map((s, i) => {
          const isActive = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative flex h-9 items-center rounded-xl px-2 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground/70 hover:text-foreground"
                )}
              >
                {/* Статичная точка */}
                <span className="relative flex size-4 shrink-0 items-center justify-center">
                  <span
                    className={cn(
                      "size-1.5 rounded-full bg-muted-foreground/40 transition-colors duration-300",
                      !isActive && "group-hover:bg-muted-foreground/60"
                    )}
                  />
                  {/* Скользящий индикатор активного раздела */}
                  {isActive && (
                    <motion.span
                      layoutId="section-nav-dot"
                      className="absolute size-2 rounded-full bg-foreground"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </span>

                {/* Подпись — раскрывается при наведении, акцент на типографике */}
                <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-400 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:grid-cols-[1fr] group-focus-within:grid-cols-[1fr]">
                  <span className="flex items-baseline gap-2.5 overflow-hidden whitespace-nowrap pl-0 opacity-0 transition-[opacity,padding,transform] duration-400 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:pl-3 group-hover:opacity-100 group-focus-within:pl-3 group-focus-within:opacity-100">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground/60 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "text-xl tracking-[-0.02em] transition-colors duration-300",
                        isActive ? "font-medium" : "font-normal"
                      )}
                    >
                      {s.label}
                    </span>
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
