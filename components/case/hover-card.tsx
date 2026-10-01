"use client";

import { useRef, type ComponentProps, type MouseEvent } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type HoverCardProps = ComponentProps<"div">;

/**
 * Карточка с реакцией на наведение: мягкий подъём, осветление поверхности
 * и «прожектор», следующий за курсором. Без обводок — различие тоном, как на главной.
 */
export function HoverCard({ className, children, onMouseMove, ...props }: HoverCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(e);
    const el = ref.current;
    if (!el || reduced) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-[1.5rem] bg-card",
        "transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.21,0.47,0.32,0.98)]",
        "hover:-translate-y-1 hover:bg-[color-mix(in_oklch,var(--card),var(--foreground)_3%)]",
        "motion-reduce:hover:translate-y-0",
        className
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(360px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklch, var(--foreground) 6%, transparent), transparent 60%)",
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
