import { Reveal } from "@/components/motion";

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-sun">
      <div
        aria-hidden
        className="float-slow pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border-2 border-ink/15"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-28">
        <Reveal as="span" className="eyebrow block">
          {eyebrow}
        </Reveal>
        <Reveal delay={120} from="left">
          <h1 className="mt-5 max-w-4xl text-5xl sm:text-6xl md:text-8xl">{title}</h1>
        </Reveal>
        <Reveal delay={260} className="mt-6 max-w-2xl text-lg font-medium text-ink/80">
          {intro}
        </Reveal>
      </div>
    </section>
  );
}
