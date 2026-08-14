import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Find us every Saturday at 8AM, 149th St & 3rd Ave, Roberto Clemente Plaza, Mott Haven, Bronx NY.",
};

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Come find us on the corner"
        intro="The fastest way to reach Boots On Ground is to turn up on a Saturday morning. Otherwise, here."
      />

      <section className="border-b-2 border-ink bg-cream">
        <div className="mx-auto grid max-w-7xl gap-0 md:grid-cols-2">
          <div className="border-b-2 border-ink p-8 md:border-b-0 md:border-r-2 md:p-14">
            <h2 className="text-4xl md:text-5xl">Every Saturday</h2>
            <dl className="mt-8 space-y-5">
              {[
                ["Time", "8:00 AM — set-up from 7:15"],
                ["Where", "149th St & 3rd Ave"],
                ["Landmark", "Roberto Clemente Plaza"],
                ["Neighborhood", "Mott Haven, Bronx, NY"],
                ["Cost", "Free. No questions, no sign-up."],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-ink/15 pb-4">
                  <dt className="eyebrow text-ink/50">{k}</dt>
                  <dd className="mt-1 text-lg font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="p-8 md:p-14">
            <h2 className="text-4xl md:text-5xl">Reach us</h2>
            <ul className="mt-8 space-y-5">
              {[
                ["Email", "m.marinez@bootsongroundinc.org", "mailto:m.marinez@bootsongroundinc.org"],
                ["Instagram", "@bootsonground_nyc", "https://instagram.com/bootsonground_nyc"],
                ["TikTok", "@bootsongroundinc", "https://tiktok.com/@bootsongroundinc"],
                ["Donations", "CashApp · $bootsoginc", "https://cash.app/$bootsoginc"],
              ].map(([k, v, href], i) => (
                <Reveal as="li" key={k} delay={i * 90} from="left" className="border-b border-ink/15 pb-4">
                  <p className="eyebrow text-ink/50">{k}</p>
                  <a href={href} className="mt-1 block text-lg font-semibold hover:text-olive">
                    {v}
                  </a>
                </Reveal>
              ))}
            </ul>

            <div className="mt-10 border-l-4 border-sun pl-5">
              <p className="text-sm text-ink/70">
                Bringing a donation of goods? Message first so somebody is there to meet you —
                there is no permanent drop-off address yet.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-7xl px-5 py-20 text-center md:px-8 md:py-28">
          <p className="font-display text-4xl uppercase leading-tight text-sun md:text-6xl">
            &ldquo;Everybody deserves a hot meal, regardless of what the situation is.&rdquo;
          </p>
          <p className="eyebrow mt-8 text-cream/60">Maddie Marinez</p>
        </div>
      </section>
    </>
  );
}
