import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="col-span-2">
          <p className="font-display text-4xl uppercase leading-none md:text-6xl">
            Boots on Ground
          </p>
          <p className="mt-4 max-w-sm text-sm text-cream/70">
            Community outreach focused on the immediate needs of the community.{" "}
            <span className="font-semibold text-sun">By Us for Us.</span>
          </p>
        </div>
        <div>
          <h4 className="eyebrow text-sun">Saturdays</h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li>8:00 AM, every week</li>
            <li>149th St &amp; 3rd Ave</li>
            <li>Roberto Clemente Plaza</li>
            <li>Mott Haven, Bronx NY</li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow text-sun">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: "/about", label: "Our Story" },
              { to: "/programs", label: "What We Do" },
              { to: "/get-involved", label: "Get Involved" },
              { to: "/donate", label: "Donate" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link href={l.to} className="hover:text-sun">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/15 px-5 py-6 text-xs leading-relaxed text-cream/50 md:px-8">
        <a
          href="https://www.mcmathmatics.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-sun"
        >
          Powered by Simplemcmathematics
        </a>
      </div>
    </footer>
  );
}
