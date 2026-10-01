import { Contacts } from "@/components/contacts";
import { Hero } from "@/components/hero";
import { PetProjectCard } from "@/components/pet-project-card";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SectionNav } from "@/components/section-nav";
import { SiteHeader } from "@/components/site-header";
import { projects } from "@/lib/content";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6">
        <Hero />

        <section id="work" aria-label="Проекты" className="scroll-mt-24 pb-28 sm:pb-36">
          <SectionHeading
            eyebrow="Избранные проекты"
            title="Три продукта, три разных контекста"
            aside="Мобайл, веб‑маркетплейс и тяжёлый B2B. Везде — измеримый результат."
          />
          <div className="flex flex-col gap-6">
            {projects.map((p, i) => (
              <Reveal key={p.id}>
                <ProjectCard project={p} index={i} total={projects.length} />
              </Reveal>
            ))}
          </div>
        </section>

        <section id="pet" aria-label="Pet-project" className="scroll-mt-24 pb-28 sm:pb-36">
          <SectionHeading
            eyebrow="Pet‑project"
            title="Когда инструмента нет — делаю сам"
            aside="Плагин для Figma, которым пользуюсь каждый день и которым делюсь с сообществом."
          />
          <Reveal>
            <PetProjectCard />
          </Reveal>
        </section>

        <section id="contacts" aria-label="Контакты" className="scroll-mt-24 pb-24 sm:pb-32">
          <SectionHeading
            eyebrow="Контакты"
            title="Открыт к новым проектам"
            aside="Отвечаю в течение дня. Удобнее всего — в Telegram."
          />
          <Contacts />
        </section>
      </main>

      <footer>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 pb-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
          <span>© 2026 Daniel Zhuchkov</span>
          <span>Product design</span>
        </div>
      </footer>

      <SectionNav />
    </>
  );
}
