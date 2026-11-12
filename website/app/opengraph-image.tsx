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

/**
 * Link preview: just her name and role. Apps like WhatsApp crop this wide image
 * to a centred square, so the text is stacked in a narrow block in the middle
 * (x 340 to 860 of 1200) and stays fully visible either way.
 */
export default function Image() {
  const line = { display: "flex" } as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          color: "#000",
          fontFamily: "General Sans",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 520 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 100,
              lineHeight: 1,
              letterSpacing: -4.5,
            }}
          >
            <div style={line}>Eunice Moh</div>
            <div style={line}>Hau Yan</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 32,
              fontSize: 40,
              lineHeight: 1.15,
              letterSpacing: -1.4,
              color: "#6b6b6b",
            }}
          >
            <div style={line}>Assistant Architect</div>
            <div style={line}>&amp; Interior Designer</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "General Sans", data: font, weight: 500, style: "normal" }],
    },
  );
}
