import { useState, useEffect } from "react";

const SHOPIFY_LOGIN_URL = "https://secret-magic-store.de/account/login";
const SHOPIFY_ACCOUNT_URL = "https://secret-magic-store.de/account";

const SMS_GREEN      = "#4e7d5b";
const SMS_GREEN_DARK = "#3d6649";
const SMS_GOLD       = "#c9a84c";
const SMS_BG         = "#f4f3ef";
const SMS_WHITE      = "#ffffff";
const SMS_BORDER     = "#ddd9d0";
const SMS_TEXT       = "#1a1a1a";
const SMS_MUTED      = "#6b6b6b";
const SMS_TOPBAR     = "#222222";

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
  { id: "dachboden",    label: "Dachboden",            description: "Exklusive Inhalte & Überraschungen", url: "https://secret-magic-store.de/pages/inner-circle",                                                         icon: "🏠" },
  { id: "wohnzimmer",   label: "Wohnzimmer",           description: "Der Inner Circle Blog",            url: "https://secret-magic-store.de/blogs/inner-circle",                                                          icon: "🛋️" },
  { id: "badezimmer",   label: "Badezimmer",           description: "Facebook Community",               url: "https://www.facebook.com/groups/531332315756823/",                                                           icon: "🚿" },
  { id: "kueche",       label: "Küche",               description: "Rezepte & mehr",                   url: "https://secret-magic-store.de/pages/kuche-inner-circle",                                                    icon: "🍳" },
  { id: "bibliothek",   label: "Bibliothek",           description: "Secret Magic Talk",                url: "https://secret-magic-store.de/pages/secret-magic-talk-inner-circle",                                        icon: "📚" },
  { id: "schlafzimmer", label: "Schlafzimmer",         description: "Top Secret Talk",                  url: "https://secret-magic-store.de/pages/top-secret-secret-magic-talk-inner-circle",                            icon: "🛏️" },
  { id: "spielzimmer",  label: "Spielzimmer",          description: "Spaß & exklusive Inhalte",         url: "https://secret-magic-store.de/blogs/appgehort",                                                             icon: "🎮" },
  { id: "gaestezimmer", label: "Gästezimmer",         description: "Für unsere Gäste",                  url: "https://secret-magic-store.de/blogs/gastezimmer",                                                           icon: "🛎️" },
  { id: "balkon",       label: "Balkon",               description: "Exklusive Produkte",               url: "https://secret-magic-store.de/collections/dachboden-inner-circle-1",                                       icon: "🌿" },
  { id: "keller",       label: "Keller",               description: "Demnächst verfügbar",              url: null, icon: "🔑", comingSoon: true },
  { id: "gewinnspiel",  label: "Gewinnspiel Ostern 2026", description: "Jetzt mitmachen!",             url: "https://secret-magic-store.de/pages/gewinnspiel-ostern-2026",                                              icon: "🐣" },
];

const styles = {
  page: {
    minHeight: "100vh",
    background: SMS_BG,
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

function Header({ showLogout, onLogout }) {
  return (
    <header style={{ background: SMS_GREEN, borderBottom: `1px solid ${SMS_GREEN_DARK}`, padding: "0 24px", boxSizing: "border-box" }}>
      <div style={{ background: SMS_TOPBAR, textAlign: "center", padding: "7px", fontSize: "12px", fontWeight: "500", letterSpacing: "0.5px", color: "#ccc", margin: "0 -24px" }}>
        Exklusiver Bereich · Nur für Inner-Circle-Mitglieder
      </div>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", flexWrap: "wrap", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img src={SMS_LOGO_SVG} alt="Secret Magic Store" style={{ height: "clamp(32px, 6vw, 48px)", width: "auto", objectFit: "contain", display: "block" }} />
          <div style={{ ...styles.label, color: "rgba(255,255,255,0.85)" }}>Inner Circle</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", letterSpacing: "0.5px" }}>v 1.3</span>
          {showLogout && (
            <a href={SHOPIFY_ACCOUNT_URL} target="_blank" rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", textDecoration: "none", whiteSpace: "nowrap" }}>
              👤 Mein Konto
            </a>
          )}
          {showLogout && (
            <button onClick={onLogout} style={{ background: "transparent", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.4)", borderRadius: "3px", padding: "7px 14px", fontSize: "12px", cursor: "pointer", whiteSpace: "nowrap" }}>
              Ausloggen
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${SMS_BORDER}`, padding: "24px", textAlign: "center", marginTop: "auto" }}>
      <p style={{ color: SMS_MUTED, fontSize: "12px", margin: 0 }}>
        © 2026 Secret Magic Store · Inner Circle · Nur für Mitglieder
      </p>
    </footer>
  );
}

function AreaCard({ area }) {
  return (
    <a
      href={area.comingSoon ? undefined : area.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={e => area.comingSoon && e.preventDefault()}
      style={{
        background: SMS_WHITE,
        border: `1px solid ${SMS_BORDER}`,
        borderRadius: "8px",
        overflow: "hidden",
        cursor: area.comingSoon ? "default" : "pointer",
        opacity: area.comingSoon ? 0.55 : 1,
        textDecoration: "none",
        display: "block",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
      onMouseOver={e => { if (!area.comingSoon) { e.currentTarget.style.borderColor = SMS_GREEN; e.currentTarget.style.boxShadow = `0 4px 16px ${SMS_GREEN}22`; }}}
      onMouseOut={e => { e.currentTarget.style.borderColor = SMS_BORDER; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
    >
      <div style={{ width: "100%", height: "140px", overflow: "hidden", background: `${SMS_GREEN}15`, position: "relative" }}>
        {IMAGES[area.id] ? (
          <img src={IMAGES[area.id]} alt={area.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "40px" }}>{area.icon}</div>
        )}
        {area.comingSoon ? (
          <div style={{ position: "absolute", top: 8, right: 8, background: SMS_TOPBAR, color: "#fff", fontSize: "10px", fontWeight: "700", letterSpacing: "1px", padding: "3px 8px", borderRadius: "3px" }}>BALD</div>
        ) : (
          <div style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.45)", color: "#fff", fontSize: "10px", fontWeight: "700", letterSpacing: "1px", padding: "3px 8px", borderRadius: "3px" }}>↗ ÖFFNEN</div>
        )}
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontWeight: "800", textTransform: "uppercase", fontSize: "13px", letterSpacing: "1px", marginBottom: "3px", color: area.comingSoon ? "#aaa" : SMS_TEXT }}>{area.label}</div>
        <div style={{ color: SMS_MUTED, fontSize: "12px" }}>{area.description}</div>
      </div>
    </a>
  );
}

function LandingPage({ onEnter }) {
  return (
    <div style={styles.page}>
      <Header showLogout={false} />
      <div style={{ background: `linear-gradient(to bottom, ${SMS_GREEN}22, ${SMS_BG})`, textAlign: "center", padding: "clamp(32px, 8vw, 80px) 16px clamp(24px, 6vw, 60px)", borderBottom: `1px solid ${SMS_BORDER}`, color: SMS_TEXT }}>
        <div style={styles.label}>Willkommen zurück</div>
        <hr style={styles.divider} />
        <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: "900", color: SMS_TEXT, letterSpacing: "2px", margin: "0 0 16px", textTransform: "uppercase" }}>Inner Circle</h1>
        <p style={{ color: SMS_MUTED, fontSize: "16px", maxWidth: "480px", margin: "0 auto 40px", lineHeight: 1.7 }}>
          Dieser Bereich ist ausschließlich für Mitglieder des Inner Circle.
          Melde dich mit deinem Secret Magic Store Konto an, um fortzufahren.
        </p>
        <div style={{ maxWidth: "340px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>
          <button style={styles.redBtn} onClick={onEnter}
            onMouseOver={e => e.currentTarget.style.background = SMS_GREEN_DARK}
            onMouseOut={e => e.currentTarget.style.background = SMS_GREEN}>
            JETZT EINLOGGEN
          </button>
          <p style={{ color: "#555", fontSize: "12px", margin: 0 }}>Du wirst zum offiziellen Secret Magic Store weitergeleitet.</p>
        </div>
      </div>
      <div style={{ maxWidth: "1100px", margin: "32px auto", padding: "0 16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
        {areas.map(area => <AreaCard key={area.id} area={area} />)}
      </div>
      <Footer />
    </div>
  );
}

function LoginRedirectPage({ onConfirm, onBack }) {
  const [waiting, setWaiting] = useState(false);
  const handleRedirect = () => { setWaiting(true); window.open(SHOPIFY_LOGIN_URL, "_blank"); };
  return (
    <div style={styles.page}>
      <Header showLogout={false} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 120px)", padding: "40px 24px" }}>
        <div style={{ ...styles.card, width: "100%", maxWidth: "440px" }}>
          <div style={{ textAlign: "center", marginBottom: "32px", color: SMS_TEXT }}>
            <div style={styles.label}>Schritt 1 von 2</div>
            <hr style={styles.divider} />
            <h2 style={{ fontSize: "22px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 12px", color: SMS_TEXT }}>Login erforderlich</h2>
            <p style={{ color: SMS_MUTED, fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
              Melde dich mit deinem Konto auf der offiziellen Secret Magic Store Website an.
              Danach kannst du hier bestätigen und alle Bereiche freischalten.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {!waiting ? (
              <button style={styles.redBtn} onClick={handleRedirect}
                onMouseOver={e => e.currentTarget.style.background = SMS_GREEN_DARK}
                onMouseOut={e => e.currentTarget.style.background = SMS_GREEN}>
                ZUR LOGIN-SEITE
              </button>
            ) : (
              <div style={{ background: "#f0f7f3", border: `1px solid ${SMS_GREEN}44`, borderRadius: "4px", padding: "16px", textAlign: "center" }}>
                <p style={{ color: SMS_GREEN, fontSize: "13px", fontWeight: "700", margin: "0 0 4px" }}>LOGIN-SEITE GEÖFFNET</p>
                <p style={{ color: "#555", fontSize: "12px", margin: 0 }}>Kehre nach dem Login hierher zurück</p>
              </div>
            )}
            {waiting && (
              <button style={styles.redBtn} onClick={onConfirm}
                onMouseOver={e => e.currentTarget.style.background = SMS_GREEN_DARK}
                onMouseOut={e => e.currentTarget.style.background = SMS_GREEN}>
                ✓ ICH BIN EINGELOGGT – WEITER
              </button>
            )}
            <button style={styles.outlineBtn} onClick={onBack}>← Zurück</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ onLogout }) {
  return (
    <div style={{ ...styles.page, display: "flex", flexDirection: "column" }}>
      <Header showLogout onLogout={onLogout} />
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", flex: 1, padding: "0 24px", boxSizing: "border-box" }}>
        <main style={{ padding: "32px 0" }}>
          <div style={{ textAlign: "center", paddingTop: "20px" }}>
            <div style={styles.label}>Dein Bereich</div>
            <hr style={styles.divider} />
            <h2 style={{ fontSize: "clamp(18px, 5vw, 26px)", fontWeight: "900", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px", color: SMS_TEXT }}>Willkommen im Inner Circle</h2>
            <p style={{ color: SMS_MUTED, fontSize: "15px", marginBottom: "40px" }}>Wähle einen Bereich – er öffnet sich auf der Website.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", maxWidth: "960px", margin: "0 auto", textAlign: "left" }}>
              {areas.map(area => <AreaCard key={area.id} area={area} />)}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("landing");

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
    setScreen("landing");
  };

  if (screen === "landing") return <LandingPage onEnter={() => setScreen("login")} />;
  if (screen === "login") return <LoginRedirectPage onConfirm={handleConfirm} onBack={() => setScreen("landing")} />;
  return <Dashboard onLogout={handleLogout} />;
}
