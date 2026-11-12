import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "./lib/site";

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = await readFile(
  join(process.cwd(), "public/fonts/GeneralSans-Medium.otf"),
);

/** Link preview: just her name and role. Also used for Twitter (see twitter-image). */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          background: "#fff",
          color: "#000",
          fontFamily: "General Sans",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 112,
            lineHeight: 1,
            letterSpacing: -5,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 44,
            letterSpacing: -1.5,
            color: "#6b6b6b",
          }}
        >
          {site.role}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "General Sans", data: font, weight: 500, style: "normal" }],
    },
  );
}
