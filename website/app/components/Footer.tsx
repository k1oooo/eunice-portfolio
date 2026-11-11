import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="mt-16 flex flex-col gap-4 border-t border-solid border-ink px-4 py-8 sm:flex-row sm:items-start sm:justify-between sm:px-10"
      style={{ borderTopWidth: "var(--wall)" }}
    >
      <p className="text-sm leading-snug sm:text-base">
        Site content © Eunice Moh.
        <br />
        All rights reserved.
      </p>

      <div className="flex flex-col gap-1 text-sm sm:items-end sm:text-base">
        <a
          href="tel:+60177288268"
          className="flex items-center gap-2 underline-offset-4 hover:underline"
        >
          <Phone size={16} strokeWidth={2.5} />
          +6017-7288268
        </a>
        <a
          href="mailto:eunice.moh00@gmail.com"
          className="flex items-center gap-2 underline-offset-4 hover:underline"
        >
          <Mail size={16} strokeWidth={2.5} />
          eunice.moh00@gmail.com
        </a>
      </div>
    </footer>
  );
}
