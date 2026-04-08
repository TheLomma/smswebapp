import { useState, useEffect, createContext, useContext, useRef } from "react";

const fadeInStyle = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.sms-fadeinup { animation: fadeInUp 0.55s cubic-bezier(.22,1,.36,1) both; }
.sms-fadein   { animation: fadeIn 0.4s ease both; }
`;
if (typeof document !== 'undefined') {
  const s = document.createElement('style');
  s.textContent = fadeInStyle;
  document.head.appendChild(s);
}

const TRANSLATIONS = {
  de: {
    exclusive: "Exklusiver Bereich · Nur für Inner-Circle-Mitglieder",
    welcome: "Willkommen zurück",
    innerCircle: "Inner Circle",
    loginDesc: "Dieser Bereich ist ausschließlich für Mitglieder des Inner Circle. Melde dich mit deinem Secret Magic Store Konto an, um fortzufahren.",
    loginBtn: "Jetzt einloggen",
    loginHint: "Du wirst zum offiziellen Secret Magic Store weitergeleitet.",
    step: "Schritt 1 von 2",
    loginRequired: "Login erforderlich",
    loginDesc2: "Melde dich mit deinem Konto auf der offiziellen Secret Magic Store Website an. Danach kannst du hier bestätigen und alle Bereiche freischalten.",
    toLogin: "Zur Login-Seite",
    loginOpened: "Login-Seite geöffnet",
    loginReturn: "Kehre nach dem Login hierher zurück",
    loginConfirm: "✓ Ich bin eingeloggt – Weiter",
    back: "← Zurück",
    myAccount: "👤 Mein Konto",
    logout: "Ausloggen",
    yourArea: "Dein Bereich",
    welcomeDash: "Willkommen im Inner Circle",
    choosArea: "Wähle einen Bereich – er öffnet sich auf der Website.",
    newInShop: "Jetzt neu im Shop",
    discoverAll: "Alle Neuheiten entdecken",
    discoverSub: "Die neusten Zaubertricks und Bücher",
    discover: "Entdecken",
    footer: "© 2026 Secret Magic Store · Inner Circle · Nur für Mitglieder",
    soon: "BALD",
    open: "↗ ÖFFNEN",
  },
  en: {
    exclusive: "Exclusive Area · Members Only",
    welcome: "Welcome Back",
    innerCircle: "Inner Circle",
    loginDesc: "This area is exclusively for Inner Circle members. Log in with your Secret Magic Store account to continue.",
    loginBtn: "Log in now",
    loginHint: "You will be redirected to the official Secret Magic Store.",
    step: "Step 1 of 2",
    loginRequired: "Login required",
    loginDesc2: "Log in with your account on the official Secret Magic Store website. Then confirm here to unlock all areas.",
    toLogin: "Go to login page",
    loginOpened: "Login page opened",
    loginReturn: "Return here after logging in",
    loginConfirm: "✓ I'm logged in – Continue",
    back: "← Back",
    myAccount: "👤 My Account",
    logout: "Log out",
    yourArea: "Your Area",
    welcomeDash: "Welcome to the Inner Circle",
    choosArea: "Choose an area – it will open on the website.",
    newInShop: "New in the shop",
    discoverAll: "Discover all new arrivals",
    discoverSub: "The latest magic tricks and books",
    discover: "Discover",
    footer: "© 2026 Secret Magic Store · Inner Circle · Members Only",
    soon: "SOON",
    open: "↗ OPEN",
  },
};

const AppContext = createContext({});
const useApp = () => useContext(AppContext);

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

const DARK = {
  bg:      "#121212",
  white:   "#1e1e1e",
  border:  "#333",
  text:    "#f0f0f0",
  muted:   "#999",
  topbar:  "#0a0a0a",
  green:   "#3d6649",
  greenDk: "#2d5238",
};

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

};

const areas = [

  { id: "dachboden",    label: "Dachboden",            description: "Exklusive Inhalte & Überraschungen", url: "https://secret-magic-store.de/pages/dachboden-inner-circle",                                                         icon: "🏠" },
  { id: "wohnzimmer",   label: "Wohnzimmer",           description: "Der Inner Circle Blog",            url: "https://secret-magic-store.de/blogs/inner-circle",                                                          icon: "🛋️" },
  { id: "badezimmer",   label: "Badezimmer",           description: "Facebook Community",               url: "https://www.facebook.com/groups/531332315756823/",                                                           icon: "🚿" },
  { id: "kueche",       label: "Küche",               description: "Rezepte & mehr",                   url: "https://secret-magic-store.de/pages/kuche-inner-circle",                                                    icon: "🍳" },
  { id: "bibliothek",   label: "Bibliothek",           description: "Secret Magic Talk",                url: "https://secret-magic-store.de/pages/secret-magic-talk-inner-circle",                                        icon: "📚" },
  { id: "schlafzimmer", label: "Schlafzimmer",         description: "Top Secret Talk",                  url: "https://secret-magic-store.de/pages/top-secret-secret-magic-talk-inner-circle",                            icon: "🛏️" },
  { id: "spielzimmer",  label: "Spielzimmer",          description: "Spaß & exklusive Inhalte",         url: "https://secret-magic-store.de/blogs/appgehort",                                                             icon: "🎮" },
  { id: "gaestezimmer", label: "Gästezimmer",         description: "Für unsere Gäste",                  url: "https://secret-magic-store.de/blogs/gastezimmer",                                                           icon: "🛎️" },
  { id: "balkon",       label: "Balkon",               description: "Exklusive Produkte",               url: "https://secret-magic-store.de/collections/dachboden-inner-circle-1",                                       icon: "🌿" },
  { id: "keller",       label: "Keller",               description: "Demnächst verfügbar",              url: null, icon: "🔑", comingSoon: true },

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
    background: SMS_GOLD,
    margin: "16px auto",
    border: "none",
    borderRadius: "2px",
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
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { dark, setDark, lang, setLang, t } = useApp();
  return (
    <header style={{ background: dark ? DARK.green : SMS_GREEN, borderBottom: `1px solid ${dark ? DARK.greenDk : SMS_GREEN_DARK}`, padding: "0 24px", boxSizing: "border-box" }}>
      <div style={{ background: dark ? DARK.topbar : SMS_TOPBAR, textAlign: "center", padding: "7px", fontSize: "12px", fontWeight: "500", letterSpacing: "0.5px", color: "#ccc", margin: "0 -24px" }}>
        {t.exclusive}
      </div>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", flexWrap: "wrap", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img src={SMS_LOGO_SVG} alt="Secret Magic Store" style={{ height: "clamp(32px, 6vw, 48px)", width: "auto", objectFit: "contain", display: "block" }} />
          <div style={{ ...styles.label, color: "rgba(255,255,255,0.85)" }}>Inner Circle</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
          {/* Lang toggle */}
          <button onClick={() => setLang(lang === "de" ? "en" : "de")} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "4px", color: "#fff", fontSize: "12px", fontWeight: "700", padding: "5px 10px", cursor: "pointer", letterSpacing: "1px" }}>
            {lang === "de" ? "EN" : "DE"}
          </button>
          {/* Dark mode toggle */}
          <button onClick={() => setDark(d => !d)} title={dark ? "Light Mode" : "Dark Mode"} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "4px", color: "#fff", fontSize: "14px", padding: "5px 10px", cursor: "pointer" }}>
            {dark ? "☀️" : "🌙"}
          </button>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", letterSpacing: "0.5px" }}>v 2.3</span>
          {showLogout && (
            <a href={SHOPIFY_ACCOUNT_URL} target="_blank" rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", textDecoration: "none", whiteSpace: "nowrap" }}>
              {t.myAccount}
            </a>
          )}
          {showLogout && (
            <button onClick={() => setShowLogoutConfirm(true)} style={{ background: "transparent", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.4)", borderRadius: "3px", padding: "7px 14px", fontSize: "12px", cursor: "pointer", whiteSpace: "nowrap" }}>
              {t.logout}
            </button>
          )}
          {showLogoutConfirm && <LogoutConfirm onConfirm={() => { setShowLogoutConfirm(false); onLogout(); }} onCancel={() => setShowLogoutConfirm(false)} dark={dark} t={t} lang={lang} />}
        </div>
      </div>
    </header>
  );
}

function UpdateBanner() {
  const [show, setShow] = useState(false);
  const [newSW, setNewSW] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      setNewSW(e.detail);
      setShow(true);
    };
    window.addEventListener('swUpdateAvailable', handler);
    return () => window.removeEventListener('swUpdateAvailable', handler);
  }, []);

  const handleUpdate = () => {
    if (newSW) newSW.postMessage({ type: 'SKIP_WAITING' });
    if ('caches' in window) {
      caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
    }
    setTimeout(() => window.location.reload(true), 300);
  };

  if (!show) return null;
  return (
    <div style={{
      position: "fixed", bottom: "80px", left: "50%", transform: "translateX(-50%)",
      zIndex: 1100, background: "#1a3d28", border: `2px solid ${SMS_GOLD}`,
      borderRadius: "12px", padding: "16px 24px", boxShadow: `0 8px 32px rgba(0,0,0,0.35)`,
      display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap",
      maxWidth: "calc(100vw - 32px)", boxSizing: "border-box",
    }} className="sms-fadein">
      <div>
        <div style={{ color: SMS_GOLD, fontWeight: "800", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "3px" }}>🆕 Neue Version verfügbar</div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>Jetzt aktualisieren für die neuesten Funktionen.</div>
      </div>
      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        <button onClick={() => setShow(false)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.6)", borderRadius: "6px", padding: "8px 14px", fontSize: "12px", cursor: "pointer" }}>Später</button>
        <button onClick={handleUpdate} style={{ background: SMS_GOLD, border: "none", color: "#fff", borderRadius: "6px", padding: "8px 18px", fontSize: "12px", fontWeight: "800", cursor: "pointer", letterSpacing: "0.5px" }}>Jetzt aktualisieren ↻</button>
      </div>
    </div>
  );
}

function ScrollToTopBtn() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      title="Nach oben"
      style={{ position: "fixed", bottom: "28px", right: "24px", zIndex: 999, width: "44px", height: "44px", borderRadius: "50%", background: SMS_GOLD, color: "#fff", border: "none", fontSize: "20px", cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
      onMouseOver={e => e.currentTarget.style.background = "#b8922e"}
      onMouseOut={e => e.currentTarget.style.background = SMS_GOLD}
    >↑</button>
  );
}

function LogoutConfirm({ onConfirm, onCancel, dark, t, lang }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }} className="sms-fadein">
      <div style={{ background: dark ? DARK.white : SMS_WHITE, border: `1px solid ${dark ? DARK.border : SMS_BORDER}`, borderRadius: "12px", padding: "32px 28px", maxWidth: "340px", width: "100%", textAlign: "center", boxShadow: "0 8px 40px rgba(0,0,0,0.3)" }}>
        <div style={{ fontSize: "36px", marginBottom: "12px" }}>🚪</div>
        <h3 style={{ margin: "0 0 10px", fontWeight: "900", fontSize: "18px", color: dark ? DARK.text : SMS_TEXT, textTransform: "uppercase", letterSpacing: "1px" }}>{t.logout}?</h3>
        <p style={{ color: dark ? DARK.muted : SMS_MUTED, fontSize: "14px", marginBottom: "24px", lineHeight: 1.6 }}>{lang === "en" ? "Are you sure you want to log out?" : "Möchtest du dich wirklich ausloggen?"}</p>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={onCancel} style={{ flex: 1, padding: "11px", borderRadius: "6px", border: `1px solid ${dark ? DARK.border : SMS_BORDER}`, background: "transparent", color: dark ? DARK.muted : SMS_MUTED, fontWeight: "700", cursor: "pointer", fontSize: "13px" }}>{t.back}</button>
          <button onClick={onConfirm} style={{ flex: 1, padding: "11px", borderRadius: "6px", border: "none", background: SMS_GREEN, color: "#fff", fontWeight: "800", cursor: "pointer", fontSize: "13px", letterSpacing: "0.5px" }}>{t.logout}</button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const { dark, t } = useApp();
  return (
    <footer style={{ borderTop: `1px solid ${dark ? DARK.border : SMS_BORDER}`, padding: "24px", textAlign: "center", marginTop: "auto", background: dark ? DARK.bg : "transparent" }}>
      <p style={{ color: dark ? DARK.muted : SMS_MUTED, fontSize: "12px", margin: 0 }}>{t.footer}</p>
    </footer>
  );
}

// Neuheiten Slider – Produkte hier manuell pflegen
const NEUHEITEN = [
  { id: 1, title: "A.P.E.", author: "Craig Petty", img: "", url: "https://secret-magic-store.de/collections/alle-neuheiten", emoji: "🦍" },
  { id: 2, title: "Neuheit 2", author: "Künstler", img: "", url: "https://secret-magic-store.de/collections/alle-neuheiten", emoji: "🎩" },
  { id: 3, title: "Neuheit 3", author: "Künstler", img: "", url: "https://secret-magic-store.de/collections/alle-neuheiten", emoji: "✨" },
  { id: 4, title: "Neuheit 4", author: "Künstler", img: "", url: "https://secret-magic-store.de/collections/alle-neuheiten", emoji: "🃏" },
  { id: 5, title: "Neuheit 5", author: "Künstler", img: "", url: "https://secret-magic-store.de/collections/alle-neuheiten", emoji: "🔮" },
];

function NeuheitenSlider() {
  const { t } = useApp();
  return (
    <a
      href="https://secret-magic-store.de/collections/alle-neuheiten"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        textDecoration: "none",
        maxWidth: "960px",
        margin: "0 auto 28px",
        borderRadius: "14px",
        overflow: "hidden",
        background: `linear-gradient(135deg, #1a3d28 0%, ${SMS_GREEN} 50%, #2d5a3d 100%)`,
        border: `2px solid ${SMS_GOLD}`,
        boxShadow: `0 8px 40px ${SMS_GOLD}44`,
        position: "relative",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 16px 48px ${SMS_GOLD}66`; }}
      onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 8px 40px ${SMS_GOLD}44`; }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.07, backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, transparent, ${SMS_GOLD}, transparent)` }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "28px 36px", flexWrap: "wrap", gap: "20px", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: `radial-gradient(circle at 35% 35%, ${SMS_GOLD}cc, #8a5c10)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", flexShrink: 0, boxShadow: `0 4px 16px ${SMS_GOLD}66` }}>✨</div>
          <div>
            <div style={{ color: SMS_GOLD, fontWeight: "800", fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "6px" }}>{t.newInShop}</div>
            <div style={{ color: "#fff", fontWeight: "900", fontSize: "clamp(17px, 3vw, 24px)", letterSpacing: "1px", textTransform: "uppercase", lineHeight: 1.2 }}>{t.discoverAll}</div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", marginTop: "5px" }}>{t.discoverSub}</div>
          </div>
        </div>
        <div style={{ background: SMS_GOLD, color: "#fff", fontWeight: "900", fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", padding: "13px 26px", borderRadius: "8px", whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(0,0,0,0.25)", display: "flex", alignItems: "center", gap: "8px" }}>{t.discover} <span style={{ fontSize: "16px" }}>→</span></div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${SMS_GOLD}88, transparent)` }} />
    </a>
  );
}
function NeuheitenSliderDELETED() {
  return (
    <div style={{ maxWidth: "960px", margin: "0 auto 28px", textAlign: "center" }}>
      <a
        href="https://secret-magic-store.de/collections/alle-neuheiten"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          background: SMS_GOLD,
          color: "#fff",
          fontWeight: "800",
          fontSize: "15px",
          letterSpacing: "1px",
          textTransform: "uppercase",
          padding: "14px 32px",
          borderRadius: "6px",
          textDecoration: "none",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        }}
        onMouseOver={e => e.currentTarget.style.background = "#b8922e"}
        onMouseOut={e => e.currentTarget.style.background = SMS_GOLD}
      >
        🆕 Alle Neuheiten entdecken →
      </a>
    </div>
  );
}
function NeuheitenSliderOLD() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % NEUHEITEN.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const current = NEUHEITEN[active];

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto 28px", borderRadius: "12px", overflow: "hidden", border: `2px solid ${SMS_GOLD}`, boxShadow: `0 8px 32px ${SMS_GOLD}33`, position: "relative", background: "#1a3d28" }}>
      {/* Hauptbild */}
      <a href={current.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", position: "relative" }}>
        <div style={{ width: "100%", height: "clamp(180px, 35vw, 320px)", overflow: "hidden", position: "relative" }}>
          {current.img ? (
            <img src={current.img} alt={current.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "opacity 0.4s" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${SMS_GREEN} 0%, #1a3d28 60%, #0d2a1a 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
              <div style={{ fontSize: "64px", lineHeight: 1 }}>{current.emoji || "🌟"}</div>
              <div style={{ color: SMS_GOLD, fontWeight: "900", fontSize: "clamp(18px, 3vw, 28px)", letterSpacing: "2px", textTransform: "uppercase", textAlign: "center", padding: "0 20px" }}>{current.title}</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>{current.author}</div>
            </div>
          )}
          {/* Dunkler Gradient über dem Bild */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />
          {/* Titel unten links */}
          <div style={{ position: "absolute", bottom: "16px", left: "20px" }}>
            <div style={{ color: SMS_GOLD, fontSize: "11px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px" }}>🆕 Neu im Shop</div>
            <div style={{ color: "#fff", fontSize: "clamp(16px, 3vw, 24px)", fontWeight: "900", letterSpacing: "1px" }}>{current.title}</div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px" }}>{current.author}</div>
          </div>
          {/* Pfeil rechts */}
          <div style={{ position: "absolute", top: "50%", right: "16px", transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", color: "#fff", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", cursor: "pointer" }}
            onClick={e => { e.preventDefault(); setActive(prev => (prev + 1) % NEUHEITEN.length); }}>
            ›
          </div>
          <div style={{ position: "absolute", top: "50%", left: "16px", transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", color: "#fff", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", cursor: "pointer" }}
            onClick={e => { e.preventDefault(); setActive(prev => (prev - 1 + NEUHEITEN.length) % NEUHEITEN.length); }}>
            ‹
          </div>
        </div>
      </a>
      {/* Thumbnail-Leiste */}
      <div style={{ display: "flex", gap: "8px", padding: "12px 16px", background: "rgba(0,0,0,0.4)", overflowX: "auto" }}>
        {NEUHEITEN.map((p, i) => (
          <div key={p.id} onClick={() => setActive(i)}
            style={{ width: "52px", height: "52px", flexShrink: 0, borderRadius: "6px", overflow: "hidden", cursor: "pointer", border: i === active ? `2px solid ${SMS_GOLD}` : "2px solid transparent", transition: "border 0.2s", background: `${SMS_GREEN}88` }}>
            {p.img ? (
              <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", background: `linear-gradient(135deg, ${SMS_GREEN}, #1a3d28)` }}>{p.emoji || "🌟"}</div>
            )}
          </div>
        ))}
        <a href="https://secret-magic-store.de/collections/alle-neuheiten" target="_blank" rel="noopener noreferrer"
          style={{ marginLeft: "auto", alignSelf: "center", background: SMS_GOLD, color: "#fff", fontWeight: "800", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", padding: "8px 16px", borderRadius: "6px", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}>
          Alle Neuheiten →
        </a>
      </div>
    </div>
  );
}

function NeuheitenBanner() {
  return (
    <a
      href="https://secret-magic-store.de/collections/alle-neuheiten"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        textDecoration: "none",
        background: `linear-gradient(135deg, ${SMS_GREEN} 0%, #2d5a3d 60%, #1a3d28 100%)`,
        border: `2px solid ${SMS_GOLD}`,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: `0 8px 32px ${SMS_GOLD}33`,
        maxWidth: "960px",
        margin: "0 auto 28px",
        position: "relative",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${SMS_GOLD}55`; }}
      onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 8px 32px ${SMS_GOLD}33`; }}
    >
      {/* Dekoratives Muster */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "28px 36px", flexWrap: "wrap", gap: "20px", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ fontSize: "48px", lineHeight: 1 }}>🌟</div>
          <div>
            <div style={{ color: SMS_GOLD, fontWeight: "800", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "6px" }}>Jetzt neu im Shop</div>
            <div style={{ color: "#fff", fontWeight: "900", fontSize: "clamp(18px, 3vw, 26px)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>Alle Neuheiten entdecken</div>
            <div style={{ color: "rgba(255,255,255,0)" }}> hinzugefügten Artikel im Secret Magic Store</div>
          </div>
        </div>
        <div style={{
          background: SMS_GOLD,
          color: "#fff",
          fontWeight: "800",
          fontSize: "13px",
          letterSpacing: "1px",
          textTransform: "uppercase",
          padding: "12px 24px",
          borderRadius: "6px",
          whiteSpace: "nowrap",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}>Jetzt entdecken →</div>
      </div>
    </a>
  );
}

function AreaCard({ area }) {
  const { dark, t } = useApp();
  return (
    <a
      href={area.comingSoon ? undefined : area.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={e => area.comingSoon && e.preventDefault()}
      style={{
        background: dark ? DARK.white : SMS_WHITE,
        border: area.highlight ? `2px solid ${SMS_GOLD}` : `1px solid ${dark ? DARK.border : SMS_BORDER}`,
        borderRadius: "8px",
        overflow: "hidden",
        cursor: area.comingSoon ? "default" : "pointer",
        opacity: area.comingSoon ? 0.55 : 1,
        textDecoration: "none",
        display: "block",
        boxShadow: area.highlight ? `0 4px 20px ${SMS_GOLD}44` : "0 2px 8px rgba(0,0,0,0.06)",
        transition: "border-color 0.15s, box-shadow 0.15s, transform 0.15s",
        gridColumn: area.highlight ? "1 / -1" : undefined,
      }}
      onMouseOver={e => { if (!area.comingSoon) { e.currentTarget.style.borderColor = area.highlight ? SMS_GOLD : SMS_GREEN; e.currentTarget.style.boxShadow = `0 4px 16px ${area.highlight ? SMS_GOLD : SMS_GREEN}33`; e.currentTarget.style.transform = "scale(1.02)"; }}}
      onMouseOut={e => { e.currentTarget.style.borderColor = dark ? DARK.border : SMS_BORDER; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "scale(1)"; }}
    >
      <div style={{ width: "100%", height: "140px", overflow: "hidden", background: `${SMS_GREEN}15`, position: "relative" }}>
        {IMAGES[area.id] ? (
          <img src={IMAGES[area.id]} alt={area.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "40px" }}>{area.icon}</div>
        )}
        {area.comingSoon ? (
          <div style={{ position: "absolute", top: 8, right: 8, background: SMS_TOPBAR, color: "#fff", fontSize: "10px", fontWeight: "700", letterSpacing: "1px", padding: "3px 8px", borderRadius: "3px" }}>{t.soon}</div>
        ) : (
          <div style={{ position: "absolute", top: 8, right: 8, background: area.highlight ? SMS_GOLD : "rgba(0,0,0,0.45)", color: "#fff", fontSize: "10px", fontWeight: "700", letterSpacing: "1px", padding: "3px 8px", borderRadius: "3px" }}>{area.highlight ? "🆕 NEU IM SHOP" : t.open}</div>
        )}
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontWeight: "800", textTransform: "uppercase", fontSize: "13px", letterSpacing: "1px", marginBottom: "3px", color: area.comingSoon ? "#aaa" : area.highlight ? SMS_GOLD : (dark ? DARK.text : SMS_TEXT) }}>{area.label}</div>
        <div style={{ color: dark ? DARK.muted : SMS_MUTED, fontSize: "12px" }}>{area.description}</div>
      </div>
    </a>
  );
}

function LandingPage({ onEnter }) {
  const { dark, t } = useApp();
  return (
    <div style={{ ...styles.page, background: dark ? DARK.bg : SMS_BG }} className="sms-fadeinup">
      <Header showLogout={false} />
      <div style={{ background: dark ? `linear-gradient(to bottom, ${DARK.green}44, ${DARK.bg})` : `linear-gradient(to bottom, ${SMS_GREEN}22, ${SMS_BG})`, textAlign: "center", padding: "clamp(32px, 8vw, 80px) 16px clamp(24px, 6vw, 60px)", borderBottom: `1px solid ${dark ? DARK.border : SMS_BORDER}`, color: dark ? DARK.text : SMS_TEXT }}>
        <div style={styles.label}>{t.welcome}</div>
        <hr style={styles.divider} />
        <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: "900", color: dark ? DARK.text : SMS_TEXT, letterSpacing: "2px", margin: "0 0 16px", textTransform: "uppercase" }}>{t.innerCircle}</h1>
        <p style={{ color: dark ? DARK.muted : SMS_MUTED, fontSize: "16px", maxWidth: "480px", margin: "0 auto 40px", lineHeight: 1.7 }}>{t.loginDesc}</p>
        <div style={{ maxWidth: "340px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>
          <button style={styles.redBtn} onClick={onEnter}
            onMouseOver={e => e.currentTarget.style.background = SMS_GREEN_DARK}
            onMouseOut={e => e.currentTarget.style.background = SMS_GREEN}>
            {t.loginBtn}
          </button>
          <p style={{ color: dark ? DARK.muted : "#555", fontSize: "12px", margin: 0 }}>{t.loginHint}</p>
        </div>
      </div>
      <div style={{ maxWidth: "960px", margin: "24px auto 0", padding: "0 16px" }}>
        <NeuheitenSlider />
      </div>
      <ScrollToTopBtn />
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
        {areas.map(area => <AreaCard key={area.id} area={area} />)}
      </div>
      <Footer />
    </div>
  );
}

function LoginRedirectPage({ onConfirm, onBack }) {
  const { t } = useApp();
  const [waiting, setWaiting] = useState(false);
  const handleRedirect = () => { setWaiting(true); window.open(SHOPIFY_LOGIN_URL, "_blank"); };
  return (
    <div style={styles.page}>
      <Header showLogout={false} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 120px)", padding: "40px 24px" }} className="sms-fadeinup">
        <div style={{ ...styles.card, width: "100%", maxWidth: "440px" }}>
          <div style={{ textAlign: "center", marginBottom: "32px", color: SMS_TEXT }}>
            <div style={styles.label}>{t.step}</div>
            <hr style={styles.divider} />
            <h2 style={{ fontSize: "22px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 12px", color: SMS_TEXT }}>{t.loginRequired}</h2>
            <p style={{ color: SMS_MUTED, fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{t.loginDesc2}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {!waiting ? (
              <button style={styles.redBtn} onClick={handleRedirect}
                onMouseOver={e => e.currentTarget.style.background = SMS_GREEN_DARK}
                onMouseOut={e => e.currentTarget.style.background = SMS_GREEN}>
                {t.toLogin}
              </button>
            ) : (
              <div style={{ background: "#f0f7f3", border: `1px solid ${SMS_GREEN}44`, borderRadius: "4px", padding: "16px", textAlign: "center" }}>
                <p style={{ color: SMS_GREEN, fontSize: "13px", fontWeight: "700", margin: "0 0 4px" }}>{t.loginOpened}</p>
                <p style={{ color: "#555", fontSize: "12px", margin: 0 }}>{t.loginReturn}</p>
              </div>
            )}
            {waiting && (
              <button style={styles.redBtn} onClick={onConfirm}
                onMouseOver={e => e.currentTarget.style.background = SMS_GREEN_DARK}
                onMouseOut={e => e.currentTarget.style.background = SMS_GREEN}>
                {t.loginConfirm}
              </button>
            )}
            <button style={styles.outlineBtn} onClick={onBack}>{t.back}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ onLogout }) {
  const { dark, t } = useApp();
  return (
    <div style={{ ...styles.page, background: dark ? DARK.bg : SMS_BG, display: "flex", flexDirection: "column" }} className="sms-fadeinup">
      <Header showLogout onLogout={onLogout} />
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", flex: 1, padding: "0 24px", boxSizing: "border-box" }}>
        <main style={{ padding: "32px 0" }}>
          <div style={{ textAlign: "center", paddingTop: "20px" }}>
            <div style={styles.label}>{t.yourArea}</div>
            <hr style={styles.divider} />
            <h2 style={{ fontSize: "clamp(18px, 5vw, 26px)", fontWeight: "900", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px", color: dark ? DARK.text : SMS_TEXT }}>{t.welcomeDash}</h2>
            <p style={{ color: dark ? DARK.muted : SMS_MUTED, fontSize: "15px", marginBottom: "32px" }}>{t.choosArea}</p>
            <NeuheitenSlider />
            <ScrollToTopBtn />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", maxWidth: "960px", margin: "0 auto", textAlign: "left" }}>
              {areas.filter(a => !a.highlight).map(area => <AreaCard key={area.id} area={area} />)}
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
  const [dark, setDark] = useState(() => localStorage.getItem("sms_dark") === "true");
  const [lang, setLang] = useState(() => localStorage.getItem("sms_lang") || "de");
  const t = TRANSLATIONS[lang];

  useEffect(() => { localStorage.setItem("sms_dark", dark); }, [dark]);
  useEffect(() => { localStorage.setItem("sms_lang", lang); }, [lang]);

  useEffect(() => {
    const saved = localStorage.getItem("sms_inner_circle_auth");
    const ts = localStorage.getItem("sms_inner_circle_auth_ts");
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 Tage
    if (saved === "true" && ts && Date.now() - parseInt(ts) < maxAge) {
      setScreen("dashboard");
    } else {
      localStorage.removeItem("sms_inner_circle_auth");
      localStorage.removeItem("sms_inner_circle_auth_ts");
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("sms_inner_circle_auth", "true");
    localStorage.setItem("sms_inner_circle_auth_ts", Date.now().toString());
    setScreen("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("sms_inner_circle_auth");
    localStorage.removeItem("sms_inner_circle_auth_ts");
    // Service Worker Cache leeren und neu laden
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_CACHE' });
    }
    // Caches direkt leeren
    if ('caches' in window) {
      caches.keys().then(keys => keys.forEach(key => caches.delete(key)));
    }
    setScreen("landing");
    // Hard reload nach kurzer Verzögerung
    setTimeout(() => window.location.reload(true), 150);
  };

  const ctx = { dark, setDark, lang, setLang, t };

  if (screen === "landing") return <AppContext.Provider value={ctx}><UpdateBanner /><LandingPage onEnter={() => setScreen("login")} /></AppContext.Provider>;
  if (screen === "login") return <AppContext.Provider value={ctx}><UpdateBanner /><LoginRedirectPage onConfirm={handleConfirm} onBack={() => setScreen("landing")} /></AppContext.Provider>;
  return <AppContext.Provider value={ctx}><UpdateBanner /><Dashboard onLogout={handleLogout} /></AppContext.Provider>;
}
