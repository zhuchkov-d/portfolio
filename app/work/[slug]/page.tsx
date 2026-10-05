import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseConstraints } from "@/components/case/case-constraints";
import { CaseHeader } from "@/components/case/case-header";
import { CaseHero } from "@/components/case/case-hero";
import { CaseNav } from "@/components/case/case-nav";
import { CaseResults } from "@/components/case/case-results";
import { CaseStory } from "@/components/case/case-story";
import { CaseSummary } from "@/components/case/case-summary";
import { ScrollProgress } from "@/components/case/scroll-progress";
import { caseStudies, getAdjacentCases, getCaseStudy } from "@/lib/cases";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.title} — кейс · Daniel Zhuchkov`,
    description: study.subtitle,
  };
}

export default async function CasePage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const { prev, next } = getAdjacentCases(slug);

  return (
    <>
      <CaseHeader title={study.title} next={next} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6">
        <CaseHero study={study} />
        <CaseSummary summary={study.summary} />
        <CaseStory sections={study.sections} />
        <CaseConstraints items={study.constraints} />
        <CaseResults results={study.results} />
        <CaseNav prev={prev} next={next} />
      </main>

      <footer>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 pb-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
          <span>© 2026 Daniel Zhuchkov</span>
          <span>Product design</span>
        </div>
      </footer>

      <ScrollProgress />
    </>
  );
}
