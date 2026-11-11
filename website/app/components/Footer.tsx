import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-4 px-6 py-8 sm:flex-row sm:items-start sm:justify-between sm:px-10">
      <p className="text-sm uppercase leading-tight tracking-wide sm:text-base">
        Site Content © Eunice Moh
        <br />
        All Rights Reserved
      </p>

      <div className="flex flex-col text-sm tracking-wide sm:items-end sm:text-base">
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
