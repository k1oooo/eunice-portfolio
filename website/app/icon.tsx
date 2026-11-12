import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const font = await readFile(
  join(process.cwd(), "public/fonts/GeneralSans-Medium.otf"),
);

/** Favicon: a lowercase "e", white on black. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#fff",
          fontSize: 52,
          lineHeight: 1,
          paddingBottom: 6,
          fontFamily: "General Sans",
        }}
      >
        e
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "General Sans", data: font, weight: 500, style: "normal" }],
    },
  );
}
