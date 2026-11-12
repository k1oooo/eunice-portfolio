"use client";

import { useSyncExternalStore } from "react";

const format = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kuala_Lumpur",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

// Returns a string, so React only re-renders when the minute actually changes.
const now = () => format.format(new Date());

/** Live Kuala Lumpur time, e.g. "09:45 PM". Empty on the server, filled on mount. */
export default function Clock({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, now, () => "");

  return (
    <span
      className={`inline-block min-w-[5.5ch] tabular-nums ${className ?? ""}`}
      aria-hidden
    >
      {time}
    </span>
  );
}
