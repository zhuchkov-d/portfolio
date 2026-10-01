"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";

/**
 * Вертикальный прогресс чтения. Стоит там же, где меню разделов на главной —
 * слева внизу. Заполняется сверху вниз по мере пролистывания страницы.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const [percent, setPercent] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => setPercent(Math.round(v * 100)));

  return (
    <div
      role="progressbar"
      aria-label="Прогресс чтения кейса"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className="group fixed bottom-6 left-6 z-50 hidden md:block"
    >
      <div className="flex items-end gap-3 rounded-2xl p-3 transition-colors duration-300 group-hover:bg-background/70 group-hover:backdrop-blur-xl">
        <div className="relative h-32 w-px overflow-hidden rounded-full bg-muted-foreground/25">
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute inset-0 bg-foreground"
          />
        </div>

        <div className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-400 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:grid-cols-[1fr]">
          <div className="flex flex-col gap-1 overflow-hidden whitespace-nowrap opacity-0 transition-opacity duration-400 group-hover:opacity-100">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
              Прочитано
            </span>
            <span className="text-xl font-medium tracking-[-0.02em] tabular-nums">
              {percent}
              <span className="text-muted-foreground">%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
