"use client";

export default function Hero() {
  return (
    <section style={{ padding: "1rem 0" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Contained hero box */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "calc(100vh - 14rem)",
            borderRadius: 20,
            overflow: "hidden",
            background: "#0a0a0a",
          }}
        >
          {/* Video background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>

          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.70) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Watermark cover — bottom-right corner */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 220,
              height: 60,
              background: "linear-gradient(to top left, rgba(0,0,0,0.85) 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Bottom content row */}
          <div
            className="px-5 pb-7 md:px-9 md:pb-9"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 24,
            }}
          >
            {/* Left: big name */}
            <h1
              style={{
                fontFamily: "'Manrope', ui-sans-serif, system-ui, sans-serif",
                fontSize: "clamp(48px, 7.5vw, 116px)",
                fontWeight: 800,
                color: "#f0ece3",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              Will<br />Booth
            </h1>

            {/* Right: tagline + CTA */}
            <div
              className="flex"
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 12,
                maxWidth: 260,
                flexShrink: 0,
              }}
            >
              <p
                className="text-[11px] md:text-sm"
                style={{
                  fontFamily: "'Manrope', ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.78)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Senior Product Manager.<br />Leading with AI. Building products people love.
              </p>
              <a
                href="https://mail.google.com/mail/?view=cm&to=wpb665@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 text-[11px] md:text-[13px]"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "'Manrope', ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 600,
                  color: "#1c1c1e",
                  background: "#f0ece3",
                  borderRadius: 9999,
                  padding: "8px 14px",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                  transition: "opacity 150ms",
                  whiteSpace: "nowrap",
                }}
              >
                Get in touch <span style={{ fontSize: 13 }}>→</span>
              </a>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
