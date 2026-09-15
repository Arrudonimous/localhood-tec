import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site-config";

export const runtime = "edge";
export const alt = `${siteConfig.name} — Websites e Automações que Geram Resultados`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)",
          color: "#f5f5f5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: 4,
            color: "#f5f5f5",
          }}
        >
          {siteConfig.name.toUpperCase()}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            color: "#d4af37",
          }}
        >
          Websites e Automações que Geram Resultados
        </div>
      </div>
    ),
    { ...size },
  );
}
