"use client";

import { useState } from "react";
import RollText from "./RollText";

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable (e.g. insecure context): fail silently.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? `Copied ${value}` : `Copy ${value}`}
      className="shrink-0 text-[0.9375rem] opacity-55 transition-opacity hover:opacity-100"
    >
      <RollText>{copied ? "Copied" : "Copy"}</RollText>
    </button>
  );
}
