import Image from "next/image";
import { cn } from "@/lib/utils";

type PreviewFrameProps = {
  src?: string;
  alt: string;
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Место под превью-скриншот. Пока нет изображения — показывает
 * нейтральную сетку с подписью. Масштабируется при наведении на карточку (group).
 */
export function PreviewFrame({
  src,
  alt,
  tone = "light",
  className,
}: PreviewFrameProps) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-2xl ring-1 ring-inset",
        tone === "light"
          ? "preview-grid ring-foreground/8"
          : "bg-white/5 ring-white/10 [background-image:radial-gradient(rgb(255_255_255/0.14)_1px,transparent_1px)] [background-size:20px_20px]",
        className
      )}
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:scale-[1.025]">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span
              className={cn(
                "font-mono text-[11px] uppercase tracking-[0.2em]",
                tone === "light" ? "text-muted-foreground/70" : "text-white/40"
              )}
            >
              Превью · скоро
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
