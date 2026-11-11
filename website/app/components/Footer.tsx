import Link from "next/link";

const nav = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Single-letter column labels, as in the reference; full words for screen readers. */
function Column({
  letter,
  word,
  className,
  children,
}: {
  letter: string;
  word: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex gap-6 ${className ?? ""}`}>
      <span aria-hidden className="w-3 shrink-0 text-mute">
        {letter}
      </span>
      <div>
        <span className="sr-only">{word}</span>
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="page mt-24 border-t border-line pt-8 pb-6 text-[0.9375rem] sm:mt-40">
      <div className="grid-12 gap-y-8">
        <Column letter="N" word="Navigate" className="col-span-6 md:col-span-3">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="#top" className="link">
                Back to top
              </a>
            </li>
          </ul>
        </Column>

        <Column letter="L" word="Location" className="col-span-6 md:col-span-3">
          <p>
            Kuala Lumpur
            <br />
            Malaysia
          </p>
        </Column>

        <Column letter="P" word="Phone" className="col-span-6 md:col-span-3">
          <a href="tel:+60177288268" className="link">
            +6017-7288268
          </a>
        </Column>

        <Column letter="E" word="Email" className="col-span-6 md:col-span-3">
          <a href="mailto:eunice.moh00@gmail.com" className="link break-all">
            eunice.moh00@gmail.com
          </a>
        </Column>
      </div>

      <p className="mt-16 text-mute sm:mt-24">
        Site content © Eunice Moh. All rights reserved.
      </p>
    </footer>
  );
}
