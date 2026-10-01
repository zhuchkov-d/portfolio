"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Анимировать сразу при монтировании, а не при появлении во вьюпорте */
  immediate?: boolean;
};

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export function Reveal({
  delay = 0,
  immediate = false,
  children,
  ...props
}: RevealProps) {
  const reduced = useReducedMotion();

  const hidden = reduced ? { opacity: 0 } : { opacity: 0, y: 28, filter: "blur(6px)" };
  const visible = reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <motion.div
      initial={hidden}
      {...(immediate ? { animate: visible } : { whileInView: visible })}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
