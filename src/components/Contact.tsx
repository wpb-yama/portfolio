export default function Contact() {
  return (
    <section style={{ padding: "1rem 0 2rem" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem" }}>

        <div
          style={{
            borderRadius: 20,
            border: "1px solid #EBEBEB",
            background: "#FAFAFA",
            padding: "56px 24px 48px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 0,
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid #1a1a1a",
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              marginBottom: 28,
              flexShrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about_carousel/will2.jpg"
              alt="Will Booth"
              style={{
                width: "120%",
                height: "120%",
                objectFit: "cover",
                objectPosition: "20% 65%",
                display: "block",
                marginLeft: "0%",
                marginTop: "-10%",
              }}
            />
          </div>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "'Manrope', ui-sans-serif, system-ui, sans-serif",
              fontSize: "clamp(22px, 4vw, 32px)",
              fontWeight: 700,
              color: "#1C1C1C",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              margin: "0 0 28px",
            }}
          >
            Feel free to say hello.
          </h2>

          {/* CTA button */}
          <a
            href="https://mail.google.com/mail/?view=cm&to=wpb665@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'Manrope', ui-sans-serif, system-ui, sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              background: "#1C1C1C",
              borderRadius: 9999,
              padding: "12px 28px",
              textDecoration: "none",
              letterSpacing: "-0.01em",
              transition: "opacity 150ms",
              marginBottom: 40,
            }}
            className="hover:opacity-75"
          >
            Get in touch →
          </a>

          {/* Divider */}
          <div style={{ width: "100%", height: 1, background: "#EBEBEB", marginBottom: 24 }} />

          {/* Footer line */}
          <p
            style={{
              fontFamily: "'Manrope', ui-sans-serif, system-ui, sans-serif",
              fontSize: 12,
              color: "#AAA",
              margin: 0,
              letterSpacing: "0.01em",
            }}
          >
            Based in England &nbsp;·&nbsp; wpb665@gmail.com
          </p>
        </div>

      </div>
    </section>
  );
}
