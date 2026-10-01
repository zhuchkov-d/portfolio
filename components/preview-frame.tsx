import Image from "next/image";
import { cn } from "@/lib/utils";

type PreviewFrameProps = {
  src?: string;
  alt: string;
  tone?: "default" | "inverted";
  className?: string;
};

/**
 * Место под превью-скриншот. Пока нет изображения — показывает
 * нейтральную сетку с подписью. Масштабируется при наведении на карточку (group).
 */
export function PreviewFrame({
  src,
  alt,
  tone = "default",
  className,
}: PreviewFrameProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[1.25rem]",
        tone === "default" ? "preview-grid" : "preview-grid-inverted",
        className
      )}
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:scale-[1.02]">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1152px) 1104px, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span
              className={cn(
                "font-mono text-[11px] uppercase tracking-[0.2em]",
                tone === "default" ? "text-muted-foreground/60" : "text-background/40"
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
