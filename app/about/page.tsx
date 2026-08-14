import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Madeline “Maddie” Marinez — Bronx-born, US Army veteran, in recovery since July 2024 — started Boots On Ground with a shopping cart of hot oatmeal and croissants.",
};

const values = [
  {
    t: "Dignity, No Conditions",
    d: "“Everybody deserves a hot meal regardless of what the situation is.” No questions, just pure love and nourishment.",
  },
  {
    t: "Lived Experience",
    d: "“I was out here too before, and I know how much this community needs this.” The person serving has been in the line.",
  },
  {
    t: "Showing Up",
    d: "Every Saturday — rain, hail, sleet or snow. Not one missed since the first cart went out.",
  },
  {
    t: "By Us For Us",
    d: "Funded entirely by community donations and run by volunteers. No institutional or government money.",
  },
];

const timeline = [
  {
    y: "2021",
    t: "Incorporated",
    d: "Boots On Ground Inc is filed as a New York State not-for-profit corporation in February. The work on the street is still three years away.",
  },
  {
    y: "2024",
    t: "Recovery, and a shopping cart",
    d: "Maddie enters recovery in July after fourteen years in active addiction. She starts pushing hot oatmeal and fresh croissants down 3rd Avenue and calls them free cups of love.",
  },
  {
    y: "2025",
    t: "ThanksHOOD Giving",
    d: "A Thanksgiving block takeover of 149th and 3rd. The same month, News 12 covers the breakfast line as SNAP benefits stall, and LaGuardia Community College tells her story.",
  },
  {
    y: "2025",
    t: "LaGuardia '25",
    d: "She finishes an A.A. in Human Services: Mental Health — the first in her family to attend college — with a plan to transfer to Hunter for a BSW.",
  },
  {
    y: "2026",
    t: "On NY1",
    d: "A full sit-down with Cheryl Wills on “In Focus” about recovery, homelessness, and building B.O.G. from nothing.",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="These are my people"
        intro="Boots On Ground is one woman, two daughters, and a corner in the South Bronx — built by someone who needed it before she ran it."
      />

      <section className="border-b-2 border-ink bg-cream">
        <div className="mx-auto grid max-w-7xl gap-0 md:grid-cols-2">
          <div className="border-b-2 border-ink p-8 md:border-b-0 md:border-r-2 md:p-14">
            <h2 className="text-4xl md:text-5xl">Maddie</h2>
            <p className="mt-6 text-ink/75">
              Madeline &ldquo;Maddie&rdquo; Marinez is Bronx-born and Dominican American. She served
              in Afghanistan from 2013 to 2014 as a diesel engine mechanic and a member of the Quick
              Response Team. She was a teen mom, then a single mom, to two daughters who now work
              the line beside her every Saturday morning.
            </p>
            <p className="mt-4 text-ink/75">
              She spent fourteen years in active addiction, moved through the NYC shelter system,
              and has been in recovery since July 2024.
            </p>
            <blockquote className="mt-8 border-l-4 border-sun pl-5 text-lg italic text-ink/85">
              &ldquo;I created Boots On Ground because some of my hungriest and loneliest times was
              during active substance use. I&apos;ve been all over the NYC shelter system and I know
              the pain and struggle all too well.&rdquo;
            </blockquote>
            <p className="mt-6 text-ink/75">
              She is not a visitor to this block. That is the entire difference, and it is why
              neighbors trust the table.
            </p>
          </div>
          <div className="relative min-h-[320px]">
            <Image
              src="/photos/rally.jpg"
              alt="Community members gathered in the Bronx"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-sun">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <h2 className="text-5xl md:text-7xl">What we hold to</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 110} from="up">
                <div className="h-full border-2 border-ink bg-cream p-6">
                  <h3 className="text-2xl">{v.t}</h3>
                  <p className="mt-3 text-sm text-ink/70">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
          <div>
            <h2 className="text-5xl md:text-6xl">How it happened</h2>
            <ul className="mt-10 space-y-8">
              {timeline.map((t, i) => (
                <Reveal as="li" key={t.t} delay={i * 90} from="left" className="border-l-2 border-ink pl-6">
                  <p className="font-display text-4xl">{t.y}</p>
                  <p className="mt-1 font-semibold">{t.t}</p>
                  <p className="mt-1 text-sm text-ink/70">{t.d}</p>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[400px] border-2 border-ink">
            <Image
              src="/photos/meeting.jpg"
              alt="A community gathering in the South Bronx"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
