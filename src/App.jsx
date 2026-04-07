import { useState, useEffect } from "react";

const SHOPIFY_LOGIN_URL = "https://secret-magic-store.de/account/login";
const SHOPIFY_ACCOUNT_URL = "https://secret-magic-store.de/account";

// Exakte Farben aus dem Secret Magic Store Logo & Website
const SMS_GREEN      = "#4e7d5b";  // Exaktes Header-/Logo-Grün aus dem Original
const SMS_GREEN_DARK = "#3d6649";  // Dunkleres Grün (Hover-States)
const SMS_GREEN_LIGHT= "#5a8f68";  // Helleres Grün (Akzente, Gradients)
const SMS_GOLD       = "#c9a84c";  // Gold aus dem Logo-Hintergrund
const SMS_BG         = "#f4f3ef";  // Heller cremiger Seitenhintergrund
const SMS_WHITE      = "#ffffff";
const SMS_CARD       = "#ffffff";
const SMS_BORDER     = "#ddd9d0";
const SMS_TEXT       = "#1a1a1a";
const SMS_MUTED      = "#6b6b6b";
const SMS_TOPBAR     = "#222222";  // Sehr dunkle Top-Info-Bar

const IMAGES = {
  dachboden:    "/images/dachboden.png",
  wohnzimmer:   "/images/wohnzimmer.png",
  badezimmer:   "/images/badezimmer.png",
  kueche:       "/images/kueche.png",
  bibliothek:   "/images/bibliothek.png",
  schlafzimmer: "/images/schlafzimmer.png",
  spielzimmer:  "/images/spielzimmer.png",
  gaestezimmer: "/images/gaestezimmer.png",
  balkon:       "/images/balkon.png",
  keller:       "/images/keller.png",
  gewinnspiel:  "/images/gewinnspiel.png",
};

const areas = [
  {
    id: "dachboden",
    label: "Dachboden",
    description: "Exklusive Inhalte & Überraschungen",
    url: "https://secret-magic-store.de/pages/inner-circle",
    icon: "🏠",
  },
  {
    id: "wohnzimmer",
    label: "Wohnzimmer",
    description: "Der Inner Circle Blog",
    url: "https://secret-magic-store.de/blogs/inner-circle",
    icon: "🛋️",
  },
  {
    id: "badezimmer",
    label: "Badezimmer",
    description: "Facebook Community",
    url: "https://www.facebook.com/groups/531332315756823/?ref=share&mibextid=K35XfP&rdid=HlvkjpokI0jv6Ux2&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fg%2FZ7Qidi2ThbGuYGK1%2F%3Fmibextid%3DK35XfP#",
    icon: "🚿",
    external: true,
  },
  {
    id: "kueche",
    label: "Küche",
    description: "Rezepte & mehr",
    url: "https://secret-magic-store.de/pages/kuche-inner-circle",
    icon: "🍳",
  },
  {
    id: "bibliothek",
    label: "Bibliothek",
    description: "Secret Magic Talk",
    url: "https://secret-magic-store.de/pages/secret-magic-talk-inner-circle",
    icon: "📚",
  },
  {
    id: "schlafzimmer",
    label: "Schlafzimmer",
    description: "Top Secret Talk",
    url: "https://secret-magic-store.de/pages/top-secret-secret-magic-talk-inner-circle",
    icon: "🛏️",
  },
  {
    id: "spielzimmer",
    label: "Spielzimmer",
    description: "Spaß & exklusive Inhalte",
    url: "https://secret-magic-store.de/blogs/appgehort",
    icon: "🎮",
  },
  {
    id: "gaestezimmer",
    label: "Gästezimmer",
    description: "Für unsere Gäste",
    url: "https://secret-magic-store.de/blogs/gastezimmer",
    icon: "🛎️",
  },
  {
    id: "balkon",
    label: "Balkon",
    description: "Exklusive Produkte",
    url: "https://secret-magic-store.de/collections/dachboden-inner-circle-1",
    icon: "🌿",
  },
  {
    id: "keller",
    label: "Keller",
    description: "Demnächst verfügbar",
    url: null,
    icon: "🔑",
    comingSoon: true,
  },
  {
    id: "gewinnspiel",
    label: "Gewinnspiel Ostern 2026",
    description: "Jetzt mitmachen!",
    url: "https://secret-magic-store.de/pages/gewinnspiel-ostern-2026",
    icon: "🐣",
  },
];

const styles = {
  page: {
    minHeight: "100vh",
    background: SMS_BG,
    color: "#fff",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
  redBtn: {
    background: SMS_GREEN,
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    padding: "14px 28px",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
    letterSpacing: "0.5px",
    width: "100%",
    transition: "background 0.2s",
  },
  outlineBtn: {
    background: "transparent",
    color: SMS_MUTED,
    border: `1px solid ${SMS_BORDER}`,
    borderRadius: "3px",
    padding: "12px 28px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    width: "100%",
    transition: "border-color 0.2s, color 0.2s",
  },
  card: {
    background: SMS_WHITE,
    border: `1px solid ${SMS_BORDER}`,
    borderRadius: "6px",
    padding: "36px 32px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },
  label: {
    color: SMS_GOLD,
    fontWeight: "700",
    letterSpacing: "3px",
    fontSize: "11px",
    textTransform: "uppercase",
  },
  divider: {
    width: "48px",
    height: "3px",
    background: SMS_GREEN,
    margin: "16px auto",
    border: "none",
  },
};

// Logo als SVG – nachgebaut nach dem hochgeladenen Original-Logo
// Original: weißer Serif-Text "SECRET MAGIC" groß, darunter Trennlinien + "STORE" kleiner
const SMS_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 70" width="220" height="70">
  <text x="110" y="30" text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="22" font-weight="bold" letter-spacing="3"
    fill="white">SECRET MAGIC</text>
  <line x1="18" y1="40" x2="82" y2="40" stroke="white" stroke-width="0.8" opacity="0.9"/>
  <text x="110" y="52" text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="11" font-weight="normal" letter-spacing="6"
    fill="white">STORE</text>
  <line x1="138" y1="40" x2="202" y2="40" stroke="white" stroke-width="0.8" opacity="0.9"/>
</svg>
`)}`;

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ showLogout, onLogout }) {
  return (
    <header style={{
      background: SMS_GREEN,
      borderBottom: `1px solid ${SMS_GREEN_DARK}`,
      padding: "0 24px",
    }}>
      {/* Top bar */}
      <div style={{
        background: SMS_TOPBAR,
        textAlign: "center",
        padding: "7px",
        fontSize: "12px",
        fontWeight: "500",
        letterSpacing: "0.5px",
        color: "#ccc",
        margin: "0 -24px",
      }}>
        Exklusiver Bereich · Nur für Inner-Circle-Mitglieder
      </div>

      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 0",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img
            src={SMS_LOGO_SVG}
            alt="Secret Magic Store"
            style={{ height: "48px", width: "auto", objectFit: "contain", display: "block" }}
          />
          <div style={{ width: "1px", height: "36px", background: SMS_BORDER }} />
          <div style={{ ...styles.label, color: "rgba(255,255,255,0.85)" }}>Inner Circle</div>
        </div>

        {/* Nav right */}
        {showLogout && (
          <button
            onClick={onLogout}
            style={{
              background: "transparent",
              color: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: "3px",
              padding: "8px 18px",
              fontSize: "13px",
              cursor: "pointer",
              letterSpacing: "0.3px",
            }}
          >
            Ausloggen
          </button>
        )}
      </div>
    </header>
  );
}

// ─── Landing Page ──────────────────────────────────────────────────────────────
function LandingPage({ onEnter }) {
  return (
    <div style={styles.page}>
      <Header showLogout={false} />

      {/* Hero */}
      <div style={{
        background: `linear-gradient(to bottom, ${SMS_GREEN}22, ${SMS_BG})`,
        textAlign: "center",
        padding: "80px 24px 60px",
        borderBottom: `1px solid ${SMS_BORDER}`,
        color: SMS_TEXT,
      }}>
        <div style={styles.label}>Willkommen zurück</div>
        <hr style={styles.divider} />
        <h1 style={{
          fontSize: "clamp(28px, 5vw, 44px)",
          fontWeight: "900",
          color: SMS_TEXT,
          letterSpacing: "2px",
          margin: "0 0 16px",
          textTransform: "uppercase",
        }}>
          Inner Circle
        </h1>
        <p style={{ color: SMS_MUTED, fontSize: "16px", maxWidth: "480px", margin: "0 auto 40px", lineHeight: 1.7, color: SMS_MUTED }}>
          Dieser Bereich ist ausschließlich für Mitglieder des Inner Circle.
          Melde dich mit deinem Secret Magic Store Konto an, um fortzufahren.
        </p>

        <div style={{ maxWidth: "340px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>
          <button style={styles.redBtn} onClick={onEnter}
            onMouseOver={e => e.currentTarget.style.background = SMS_GREEN_DARK}
            onMouseOut={e => e.currentTarget.style.background = SMS_GREEN}
          >
            JETZT EINLOGGEN
          </button>
          <p style={{ color: "#555", fontSize: "12px", margin: 0 }}>
            Du wirst zum offiziellen Secret Magic Store weitergeleitet.
          </p>
        </div>
      </div>

      {/* Feature boxes */}
      <div style={{
        maxWidth: "1100px",
        margin: "60px auto",
        padding: "0 24px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "24px",
      }}>
        {areas.map(area => (
          <div key={area.id} style={{
            background: SMS_WHITE,
            border: `1px solid ${SMS_BORDER}`,
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            opacity: area.comingSoon ? 0.6 : 1,
            position: "relative",
          }}>
            <div style={{ width: "100%", height: "160px", overflow: "hidden", background: `${SMS_GREEN}22`, position: "relative" }}>
              {IMAGES[area.id] ? (
                <img src={IMAGES[area.id]} alt={area.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "48px" }}>{area.icon}</div>
              )}
              {area.comingSoon && (
                <div style={{
                  position: "absolute", top: 8, right: 8,
                  background: SMS_TOPBAR, color: "#fff",
                  fontSize: "10px", fontWeight: "700", letterSpacing: "1px",
                  padding: "3px 8px", borderRadius: "3px",
                }}>BALD</div>
              )}
              {area.external && (
                <div style={{
                  position: "absolute", top: 8, right: 8,
                  background: SMS_GOLD, color: "#fff",
                  fontSize: "10px", fontWeight: "700", letterSpacing: "1px",
                  padding: "3px 8px", borderRadius: "3px",
                }}>↗ EXTERN</div>
              )}
            </div>
            <div style={{ padding: "16px 18px" }}>
              <div style={{ fontWeight: "800", fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px", color: SMS_TEXT }}>{area.label}</div>
              <div style={{ color: SMS_MUTED, fontSize: "12px" }}>{area.description}</div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

// ─── Login Redirect Page ───────────────────────────────────────────────────────
function LoginRedirectPage({ onConfirm, onBack }) {
  const [waiting, setWaiting] = useState(false);

  const handleRedirect = () => {
    setWaiting(true);
    window.open(SHOPIFY_LOGIN_URL, "_blank");
  };

  return (
    <div style={styles.page}>
      <Header showLogout={false} />

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 120px)",
        padding: "40px 24px",
      }}>
        <div style={{ ...styles.card, width: "100%", maxWidth: "440px" }}>
          <div style={{ textAlign: "center", marginBottom: "32px", color: SMS_TEXT }}>
            <div style={styles.label}>Schritt 1 von 2</div>
            <hr style={styles.divider} />
            <h2 style={{ fontSize: "22px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 12px", color: SMS_TEXT }}>
              Login erforderlich
            </h2>
            <p style={{ color: SMS_MUTED, fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
              Melde dich mit deinem Konto auf der offiziellen Secret Magic Store Website an.
              Danach kannst du hier bestätigen und alle Bereiche freischalten.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {!waiting ? (
              <button
                style={styles.redBtn}
                onClick={handleRedirect}
                onMouseOver={e => e.currentTarget.style.background = SMS_GREEN_DARK}
                onMouseOut={e => e.currentTarget.style.background = SMS_GREEN}
              >
                ZUR LOGIN-SEITE
              </button>
            ) : (
              <div style={{
                background: "#161616",
                border: `1px solid ${SMS_GREEN}44`,
                borderRadius: "4px",
                padding: "16px",
                textAlign: "center",
              }}>
                <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "8px" }}>
                  {[0, 150, 300].map(d => (
                    <div key={d} style={{
                      width: "7px", height: "7px",
                      background: SMS_GREEN,
                      borderRadius: "50%",
                      animation: `bounce 1s ${d}ms infinite`,
                    }} />
                  ))}
                </div>
                <p style={{ color: SMS_GREEN, fontSize: "13px", fontWeight: "700", margin: "0 0 4px", letterSpacing: "0.5px" }}>
                  LOGIN-SEITE GEÖFFNET
                </p>
                <p style={{ color: "#555", fontSize: "12px", margin: 0 }}>Kehre nach dem Login hierher zurück</p>
              </div>
            )}

            {waiting && (
              <button
                style={styles.redBtn}
                onClick={onConfirm}
                onMouseOver={e => e.currentTarget.style.background = SMS_GREEN_DARK}
                onMouseOut={e => e.currentTarget.style.background = SMS_GREEN}
              >
                ✓ ICH BIN EINGELOGGT – WEITER
              </button>
            )}

            <button
              style={styles.outlineBtn}
              onClick={onBack}
              onMouseOver={e => { e.currentTarget.style.borderColor = "#555"; e.currentTarget.style.color = "#fff"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = SMS_BORDER; e.currentTarget.style.color = "#ccc"; }}
            >
              ← Zurück
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ onAreaSelect, activeArea, onLogout }) {
  return (
    <div style={{ ...styles.page, display: "flex", flexDirection: "column" }}>
      <Header showLogout onLogout={onLogout} />

      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        width: "100%",
        display: "flex",
        flex: 1,
        padding: "0 24px",
        gap: "0",
      }}>
        {/* Sidebar */}
        <aside style={{
          width: "220px",
          borderRight: `1px solid ${SMS_BORDER}`,
          padding: "32px 0",
          flexShrink: 0,
        }}>
          <div style={{
            ...styles.label,
            paddingLeft: "8px",
            marginBottom: "16px",
            display: "block",
          }}>Bereiche</div>

          {areas.map(area => {
            const isActive = activeArea?.id === area.id;
            return (
              <button
                key={area.id}
                onClick={() => onAreaSelect(area)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: isActive ? `${SMS_GREEN}18` : "transparent",
                  border: "none",
                  borderLeft: isActive ? `3px solid ${SMS_GREEN}` : "3px solid transparent",
                  color: isActive ? SMS_TEXT : SMS_MUTED,
                  padding: "12px 16px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: isActive ? "700" : "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "all 0.15s",
                  letterSpacing: "0.3px",
                }}
                onMouseOver={e => { if (!isActive) { e.currentTarget.style.color = SMS_TEXT; e.currentTarget.style.background = `${SMS_GREEN}10`; }}}
                onMouseOut={e => { if (!isActive) { e.currentTarget.style.color = SMS_MUTED; e.currentTarget.style.background = "transparent"; }}}
              >
                <span style={{ fontSize: "18px" }}>{area.icon}</span>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>{area.label}</div>
                  <div style={{ fontSize: "11px", color: "#555", marginTop: "2px" }}>{area.description}</div>
                </div>
              </button>
            );
          })}

          <div style={{ borderTop: `1px solid ${SMS_BORDER}`, marginTop: "24px", paddingTop: "16px" }}>
            <a
              href={SHOPIFY_ACCOUNT_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                color: "#555",
                textDecoration: "none",
                fontSize: "13px",
                transition: "color 0.15s",
              }}
              onMouseOver={e => e.currentTarget.style.color = "#ccc"}
              onMouseOut={e => e.currentTarget.style.color = "#555"}
            >
              <span>👤</span> Mein Konto
            </a>
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: "32px 0 32px 32px", display: "flex", flexDirection: "column" }}>
          {!activeArea ? (
            <div style={{ textAlign: "center", paddingTop: "40px" }}>
              <div style={styles.label}>Dein Bereich</div>
              <hr style={styles.divider} />
              <h2 style={{ fontSize: "26px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px", color: SMS_TEXT }}>
                Willkommen im Inner Circle
              </h2>
              <p style={{ color: SMS_MUTED, fontSize: "15px", marginBottom: "48px" }}>
                Wähle einen Bereich auf der linken Seite.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px", maxWidth: "580px", margin: "0 auto", textAlign: "left" }}>
                {areas.map(area => (
                  <button
                    key={area.id}
                    onClick={() => !area.comingSoon && onAreaSelect(area)}
                    style={{
                      background: SMS_WHITE,
                      border: `1px solid ${SMS_BORDER}`,
                      borderRadius: "6px",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      gap: "0",
                      cursor: area.comingSoon ? "default" : "pointer",
                      transition: "border-color 0.15s, box-shadow 0.15s",
                      color: area.comingSoon ? "#aaa" : SMS_TEXT,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      opacity: area.comingSoon ? 0.55 : 1,
                      textAlign: "left",
                    }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = SMS_GREEN; e.currentTarget.style.boxShadow = `0 4px 16px ${SMS_GREEN}22`; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = SMS_BORDER; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
                  >
                    <span style={{
                      fontSize: "28px",
                      width: "52px",
                      height: "52px",
                      background: `${SMS_GREEN}15`,
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>{area.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "800", textTransform: "uppercase", fontSize: "14px", letterSpacing: "1px", marginBottom: "4px" }}>
                        {area.label}
                      </div>
                      <div style={{ color: SMS_MUTED, fontSize: "13px" }}>{area.description}</div>
                    </div>
                    <span style={{ color: SMS_GREEN, fontSize: "18px" }}>›</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Bereich-Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "24px" }}>{activeArea.icon}</span>
                  <div>
                    <div style={{ fontWeight: "900", textTransform: "uppercase", fontSize: "16px", letterSpacing: "1.5px", color: SMS_TEXT }}>{activeArea.label}</div>
                    <div style={{ color: SMS_MUTED, fontSize: "12px" }}>{activeArea.description}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <a
                    href={activeArea.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "transparent",
                      border: `1px solid ${SMS_BORDER}`,
                      color: SMS_MUTED,
                      borderRadius: "4px",
                      padding: "8px 16px",
                      fontSize: "13px",
                      textDecoration: "none",
                      fontWeight: "600",
                      letterSpacing: "0.3px",
                    }}
                  >
                    ↗ In neuem Tab öffnen
                  </a>
                  <button
                    onClick={() => onAreaSelect(null)}
                    style={{
                      background: "transparent",
                      border: `1px solid ${SMS_BORDER}`,
                      color: SMS_MUTED,
                      borderRadius: "3px",
                      padding: "8px 14px",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Iframe */}
              <div style={{
                flex: 1,
                background: SMS_CARD,
                border: `1px solid ${SMS_BORDER}`,
                borderRadius: "6px",
                overflow: "hidden",
                minHeight: "560px",
              }}>
                <iframe
                  src={activeArea.url}
                  title={activeArea.label}
                  style={{ width: "100%", height: "100%", minHeight: "560px", border: "none", display: "block" }}
                  allow="fullscreen"
                />
              </div>

              {/* Hinweis */}
              <div style={{
                background: "#161616",
                border: `1px solid ${SMS_BORDER}`,
                borderRadius: "4px",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "12px",
              }}>
                <span style={{ color: SMS_GREEN }}>!</span>
                <span style={{ color: SMS_MUTED }}>Falls der Inhalt nicht angezeigt wird, bitte direkt auf der Website öffnen. Du bist bereits eingeloggt.</span>
                <a
                  href={activeArea.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: "auto", color: SMS_GREEN, fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap" }}
                >
                  Direkt öffnen →
                </a>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid ${SMS_BORDER}`,
      padding: "24px",
      textAlign: "center",
      marginTop: "auto",
    }}>
      <p style={{ color: SMS_MUTED, fontSize: "12px", margin: 0 }}>
        © 2026 Secret Magic Store · Inner Circle · Nur für Mitglieder
      </p>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [activeArea, setActiveArea] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("sms_inner_circle_auth");
    if (saved === "true") setScreen("dashboard");
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("sms_inner_circle_auth", "true");
    setScreen("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("sms_inner_circle_auth");
    setActiveArea(null);
    setScreen("landing");
  };

  if (screen === "landing") return <LandingPage onEnter={() => setScreen("login")} />;
  if (screen === "login") return <LoginRedirectPage onConfirm={handleConfirm} onBack={() => setScreen("landing")} />;
  return <Dashboard onAreaSelect={setActiveArea} activeArea={activeArea} onLogout={handleLogout} />;
}
