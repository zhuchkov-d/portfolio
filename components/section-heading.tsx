import { Reveal } from "@/components/reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  aside?: string;
};

export function SectionHeading({ eyebrow, title, aside }: SectionHeadingProps) {
  return (
    <Reveal className="mb-10 flex items-end justify-between gap-6 sm:mb-14">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
          {title}
        </h2>
      </div>
      {aside && (
        <p className="hidden max-w-xs text-right text-sm text-muted-foreground sm:block whitespace-pre-line">
          {aside}
        </p>
      )}
    </Reveal>
  );
}
