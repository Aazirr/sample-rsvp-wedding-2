import { useEffect, useMemo, useRef, useState } from "react";

const navItems = [
  ["story", "Our Story"],
  ["schedule", "Schedule"],
  ["dress-code", "Dress Code"],
  ["entourage", "Entourage"],
  ["sponsors", "Sponsors"],
  ["photos", "Photos"],
  ["rsvp", "RSVP"],
];

const couple = {
  names: "Amelia & Theo",
  firstNames: ["Amelia", "Theo"],
  date: "October 18, 2026",
  ceremonyTime: "3:30 PM",
  receptionTime: "5:30 PM",
  venue: "The Glasshouse at Alta Veranda",
  city: "Tagaytay City, Philippines",
  rsvpDeadline: "September 1, 2026",
  contact: "Mara Santos, +63 917 204 1886",
};

const schedule = [
  {
    time: "2:45 PM",
    title: "Guest Arrival",
    venue: "Garden Walk",
    address: "Alta Veranda, Tagaytay City",
    copy: "Please arrive early for a cool drink and a quiet seat beneath the trees.",
  },
  {
    time: "3:30 PM",
    title: "Ceremony",
    venue: "The Glasshouse Chapel",
    address: "Alta Veranda, Tagaytay City",
    copy: "Vows, music, and a brief family blessing in the garden chapel.",
  },
  {
    time: "4:30 PM",
    title: "Cocktail Hour",
    venue: "Orchid Courtyard",
    address: "Steps from the chapel",
    copy: "Passed canapes, portraits, and a few minutes to breathe before dinner.",
  },
  {
    time: "5:30 PM",
    title: "Reception",
    venue: "The Glasshouse Pavilion",
    address: "Alta Veranda, Tagaytay City",
    copy: "Dinner, toasts, first dance, cake cutting, and an acoustic after-party.",
  },
];

const dressSwatches = [
  ["#F1C8CA", "Blush"],
  ["#B8C5AE", "Sage"],
  ["#D9C79C", "Champagne"],
  ["#D8DCE1", "Mist"],
  ["#C9A7A0", "Rose clay"],
];

const entourageGroups = [
  {
    role: "Parents of the Bride",
    icon: "family",
    members: ["Roberto and Elena Villanueva"],
  },
  {
    role: "Parents of the Groom",
    icon: "family",
    members: ["Antonio and Marissa Dela Cruz"],
  },
  {
    role: "Maid of Honor",
    icon: "couple",
    members: ["Isabelle Camille Reyes"],
  },
  {
    role: "Best Man",
    icon: "couple",
    members: ["Miguel Lorenzo Garcia"],
  },
  {
    role: "Bridesmaids",
    icon: "petals",
    members: ["Sofia Mendoza", "Patricia Anne Lim", "Bianca Torres", "Katrina Navarro"],
  },
  {
    role: "Groomsmen",
    icon: "ring",
    members: ["Rafael Santos", "Jerome Castillo", "Adrian Morales", "Paolo Fernandez"],
  },
  {
    role: "Bearers",
    icon: "ring",
    members: ["Lucas Mateo Cruz", "Noah Gabriel Reyes", "Elias Joaquin Tan"],
  },
  {
    role: "Flower Girls",
    icon: "petals",
    members: ["Lia Isabelle Tan", "Mikaela Joy Santos", "Amelia Grace Ramos"],
  },
];

const sponsors = {
  principal: [
    "Mr. and Mrs. Eduardo Sy",
    "Atty. Celeste Navarro",
    "Dr. Benjamin Co",
    "Mr. and Mrs. Ricardo Lim",
    "Mrs. Helena Bautista",
    "Mr. Samuel Chua",
    "Mr. and Mrs. Victor Tan",
    "Ms. Lourdes Rivera",
  ],
  secondary: [
    { role: "Candle Sponsors", icon: "candle", members: ["Jasmine Lopez", "Carlo Rivera"] },
    { role: "Veil Sponsors", icon: "veil", members: ["Andrea Santos", "Francis Torres"] },
    { role: "Cord Sponsors", icon: "cord", members: ["Michelle Garcia", "Joseph Reyes"] },
  ],
};

const galleryPhotos = [
  { src: "/photos/1.jpg", alt: "Amelia and Theo holding each other in the Tagaytay garden" },
  { src: "/photos/2.jpg", alt: "Close portrait of Amelia and Theo during their engagement shoot" },
  { src: "/photos/3.jpg", alt: "The couple walking hand in hand outdoors" },
  { src: "/photos/4.jpg", alt: "Amelia and Theo posing together among greenery" },
  { src: "/photos/5.jpg", alt: "A quiet candid engagement portrait" },
  { src: "/photos/6.jpg", alt: "The couple smiling together in soft daylight" },
  { src: "/photos/7.jpg", alt: "Amelia and Theo standing beside tall trees" },
  { src: "/photos/9.jpg", alt: "A romantic candid photo from the engagement session" },
];

// --- Guest invitations (client-side demo) ---
// In production this is backed by the admin: the couple adds each guest, the
// system mints an unguessable token, and that token becomes the guest's
// personal invite link. Here it runs entirely in the browser with localStorage
// so the sample can demonstrate the full flow without a backend.
const GUESTS_KEY = "ameliaTheoGuests";

// The invite shown by default when a visitor arrives without a personal link.
const DEMO_TOKEN = "demo-amelia-theo";

const initialGuests = [
  { id: "g-demo", name: "Isabella Reyes", token: DEMO_TOKEN, seats: 2, attending: 2, status: "pending", respondedAt: null },
  { id: "g-navarro", name: "The Navarro Family", token: "aG7kQ2mZ", seats: 4, attending: 4, status: "accepted", respondedAt: "2026-07-02T09:20:00Z" },
  { id: "g-cruz", name: "Sofia & Marco Cruz", token: "Bn3Rw8Qe", seats: 2, attending: 2, status: "accepted", respondedAt: "2026-07-05T18:40:00Z" },
  { id: "g-lim", name: "Daniel Lim", token: "9xVt4Lp1", seats: 1, attending: 0, status: "declined", respondedAt: "2026-07-03T14:05:00Z" },
  { id: "g-tan", name: "Katrina Tan", token: "Up5Yc1Da", seats: 1, attending: 1, status: "pending", respondedAt: null },
];

const TOKEN_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";

function generateToken(length = 8) {
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += TOKEN_ALPHABET[Math.floor(Math.random() * TOKEN_ALPHABET.length)];
  }
  return out;
}

function loadGuests() {
  if (typeof window === "undefined") return initialGuests;
  try {
    const raw = localStorage.getItem(GUESTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch {
    /* ignore malformed storage and fall back to the seed list */
  }
  return initialGuests;
}

function getInviteTokenFromUrl() {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("invite");
}

function inviteUrl(token) {
  if (typeof window === "undefined") return `?invite=${token}`;
  const { origin, pathname } = window.location;
  return `${origin}${pathname}?invite=${token}#rsvp`;
}

function formatRespondedAt(value) {
  if (!value) return null;
  try {
    return new Date(value).toLocaleDateString("en-PH", { month: "short", day: "numeric" });
  } catch {
    return null;
  }
}

// Ceremony start — October 18, 2026, 3:30 PM Philippine time (UTC+8).
const WEDDING_DATE = new Date("2026-10-18T15:30:00+08:00");

const countdownUnits = [
  ["days", "Days"],
  ["hours", "Hours"],
  ["minutes", "Minutes"],
  ["seconds", "Seconds"],
];

function getTimeLeft(target) {
  const total = target.getTime() - Date.now();
  if (total <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(WEDDING_DATE));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(WEDDING_DATE)), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="countdown-band" aria-label="Countdown to the wedding day">
      <div className="countdown-inner">
        <p className="script-note countdown-note">Counting down to</p>
        <h2 className="countdown-title">Forever begins in</h2>
        {timeLeft.total <= 0 ? (
          <p className="countdown-live">Today is the day. Welcome, with all our love.</p>
        ) : (
          <div className="countdown-grid" role="timer" aria-live="off">
            {countdownUnits.map(([key, label]) => (
              <div className="countdown-unit" key={key}>
                <span className="countdown-value">{String(timeLeft[key]).padStart(2, "0")}</span>
                <span className="countdown-label">{label}</span>
              </div>
            ))}
          </div>
        )}
        <p className="countdown-date">{couple.date} · {couple.ceremonyTime}</p>
      </div>
    </section>
  );
}

function Icon({ name, className = "" }) {
  return (
    <svg className={`icon ${className}`} aria-hidden="true">
      <use href={`/assets/icons/icon-${name}.svg#icon`} />
    </svg>
  );
}

function Divider() {
  return (
    <div className="section-divider" aria-hidden="true">
      <img src="/assets/divider-leaf.svg" alt="" />
    </div>
  );
}

function createCalendarFile() {
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SunSpire Studios//Wedding RSVP//EN",
    "BEGIN:VEVENT",
    "UID:amelia-theo-20261018@s unspire.local".replace(" ", ""),
    "DTSTAMP:20260619T000000Z",
    "DTSTART:20261018T073000Z",
    "DTEND:20261018T133000Z",
    `SUMMARY:${couple.names} Wedding`,
    `LOCATION:${couple.venue}, ${couple.city}`,
    "DESCRIPTION:Ceremony, cocktail hour, and reception.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([body], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "amelia-theo-wedding.ics";
  link.click();
  URL.revokeObjectURL(url);
}

function InvitationCard({ guest, isDemo, onRespond }) {
  const [editing, setEditing] = useState(false);
  const [seats, setSeats] = useState(1);

  useEffect(() => {
    setEditing(false);
    if (guest) setSeats(guest.attending || guest.seats || 1);
  }, [guest]);

  if (!guest) {
    return (
      <div className="invite-card invite-card-invalid" role="alert">
        <span className="invite-mark" aria-hidden="true">✦</span>
        <h3>This invitation could not be found</h3>
        <p>
          The link may be mistyped or expired. Please reach out to the couple and
          they will send a fresh invitation.
        </p>
      </div>
    );
  }

  const responded = (guest.status === "accepted" || guest.status === "declined") && !editing;

  const accept = () => onRespond(guest.token, "accepted", Math.min(Math.max(seats, 1), guest.seats));
  const decline = () => onRespond(guest.token, "declined", 0);

  return (
    <div className="invite-card">
      {isDemo && <span className="invite-demo-tag">Demo invitation</span>}
      <img className="invite-monogram" src="/assets/monogram.png" alt="" />
      <p className="invite-eyebrow">You are cordially invited</p>

      <p className="invite-welcome-label">Welcome,</p>
      <p className="invite-name">{guest.name}</p>

      <p className="invite-body">
        to witness the marriage of
        <span className="invite-couple">{couple.names}</span>
        <span className="invite-when">{couple.date} · {couple.ceremonyTime}</span>
      </p>

      <p className="invite-note">
        <strong>Please note:</strong> this invitation is personal to the named guest and admits{" "}
        {guest.seats === 1 ? "one seat" : `up to ${guest.seats} seats`}. We are unable to
        accommodate additional guests beyond your reserved seats.
      </p>

      {responded ? (
        <div className="invite-confirmed" role="status">
          <span className={`invite-status-mark ${guest.status}`} aria-hidden="true">
            {guest.status === "accepted" ? "✓" : "✕"}
          </span>
          <p className="invite-status-line">
            {guest.status === "accepted"
              ? `Joyfully accepted${guest.attending > 1 ? ` — ${guest.attending} of you` : ""}. We can't wait to celebrate with you.`
              : "Regretfully declined. You will be dearly missed."}
          </p>
          <button className="invite-change" type="button" onClick={() => setEditing(true)}>
            Change response
          </button>
        </div>
      ) : (
        <div className="invite-respond">
          {guest.seats > 1 && (
            <label className="invite-seats">
              <span>How many will attend?</span>
              <select value={seats} onChange={(e) => setSeats(Number(e.target.value))}>
                {Array.from({ length: guest.seats }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
          )}
          <p className="invite-prompt">Will you join us?</p>
          <div className="invite-actions">
            <button className="primary-button" type="button" onClick={accept}>Joyfully Accept</button>
            <button className="secondary-button" type="button" onClick={decline}>Regretfully Decline</button>
          </div>
        </div>
      )}
    </div>
  );
}

function GuestManager({ guests, onAdd, onDelete, onOpenInvite }) {
  const [name, setName] = useState("");
  const [seats, setSeats] = useState("2");
  const [copiedId, setCopiedId] = useState(null);
  const [created, setCreated] = useState(null);

  const stats = useMemo(() => {
    const base = { total: guests.length, accepted: 0, declined: 0, pending: 0, seats: 0 };
    guests.forEach((g) => {
      base[g.status] = (base[g.status] || 0) + 1;
      if (g.status === "accepted") base.seats += g.attending || 0;
    });
    return base;
  }, [guests]);

  const copyLink = (token, id) => {
    const url = inviteUrl(token);
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1800);
      });
    }
  };

  const addGuest = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const guest = onAdd(trimmed, Number(seats) || 1);
    setCreated(guest);
    setName("");
    setSeats("2");
  };

  return (
    <div className="guest-manager">
      <div className="gm-banner">
        <strong>Guest Manager</strong> — the couple's private view. Add a guest to mint a
        unique invite link; each link opens that guest's personal invitation.
      </div>

      <div className="gm-stats">
        {[
          ["Invited", stats.total],
          ["Accepted", stats.accepted],
          ["Declined", stats.declined],
          ["Pending", stats.pending],
        ].map(([label, value]) => (
          <div className="gm-stat" key={label}>
            <span className="gm-stat-value">{value}</span>
            <span className="gm-stat-label">{label}</span>
          </div>
        ))}
      </div>
      <p className="gm-seats-note">{stats.seats} seat{stats.seats === 1 ? "" : "s"} confirmed so far.</p>

      <div className="gm-add">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addGuest()}
          placeholder="Guest or family name"
          aria-label="Guest name"
        />
        <select value={seats} onChange={(e) => setSeats(e.target.value)} aria-label="Seats">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>{n} seat{n === 1 ? "" : "s"}</option>
          ))}
        </select>
        <button className="primary-button" type="button" onClick={addGuest}>Create Invite</button>
      </div>

      {created && (
        <div className="gm-created">
          <span className="gm-created-label">Invite link for {created.name}</span>
          <div className="gm-created-row">
            <code>{inviteUrl(created.token)}</code>
            <button className="secondary-button" type="button" onClick={() => copyLink(created.token, "created")}>
              {copiedId === "created" ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}

      <ul className="gm-list">
        {guests.map((g) => {
          const responded = formatRespondedAt(g.respondedAt);
          return (
            <li className="gm-guest" key={g.id}>
              <div className="gm-guest-main">
                <span className="gm-guest-name">{g.name}</span>
                <span className={`gm-badge ${g.status}`}>{g.status}</span>
              </div>
              <p className="gm-guest-meta">
                {g.seats} seat{g.seats === 1 ? "" : "s"}
                {g.status === "accepted" && ` · ${g.attending} attending`}
                {responded ? ` · responded ${responded}` : " · awaiting reply"}
              </p>
              <div className="gm-guest-actions">
                <button type="button" onClick={() => onOpenInvite(g.token)}>Preview</button>
                <button type="button" onClick={() => copyLink(g.token, g.id)}>
                  {copiedId === g.id ? "Copied ✓" : "Copy link"}
                </button>
                <button type="button" className="gm-delete" onClick={() => onDelete(g.id)}>Remove</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("story");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const galleryRailRef = useRef(null);

  const [guests, setGuests] = useState(loadGuests);
  const [rsvpView, setRsvpView] = useState("invite");
  const [activeToken, setActiveToken] = useState(() => getInviteTokenFromUrl() || DEMO_TOKEN);

  const urlToken = getInviteTokenFromUrl();
  const activeGuest = guests.find((g) => g.token === activeToken) || null;
  const isDemoInvite = !urlToken && activeToken === DEMO_TOKEN;

  const selectedPhoto = lightboxIndex === null ? null : galleryPhotos[lightboxIndex];

  const scrollGallery = (direction) => {
    const rail = galleryRailRef.current;
    if (!rail) return;

    const distance = Math.round(rail.clientWidth * 0.84);
    rail.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  const googleCalendarUrl = useMemo(() => {
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: `${couple.names} Wedding`,
      dates: "20261018T073000Z/20261018T133000Z",
      location: `${couple.venue}, ${couple.city}`,
      details: "Ceremony, cocktail hour, and reception.",
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }, []);

  const mapsUrl = useMemo(() => {
    const query = encodeURIComponent(`${couple.venue}, ${couple.city}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-42% 0px -50% 0px", threshold: 0.01 }
    );

    navItems.forEach(([id]) => {
      const target = document.getElementById(id);
      if (target) observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (lightboxIndex === null) return;
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") setLightboxIndex((lightboxIndex + 1) % galleryPhotos.length);
      if (event.key === "ArrowLeft") setLightboxIndex((lightboxIndex - 1 + galleryPhotos.length) % galleryPhotos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  useEffect(() => {
    try {
      localStorage.setItem(GUESTS_KEY, JSON.stringify(guests));
    } catch {
      /* storage may be unavailable (private mode); demo still works in-memory */
    }
  }, [guests]);

  // A guest arriving via their personal link lands directly on their invitation.
  useEffect(() => {
    if (urlToken) {
      setRsvpView("invite");
      document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const respondToInvite = (token, status, attending) => {
    setGuests((current) =>
      current.map((g) =>
        g.token === token
          ? { ...g, status, attending, respondedAt: new Date().toISOString() }
          : g
      )
    );
  };

  const addGuest = (name, seats) => {
    const guest = {
      id: `g-${generateToken(6)}`,
      name,
      token: generateToken(8),
      seats,
      attending: seats,
      status: "pending",
      respondedAt: null,
    };
    setGuests((current) => [...current, guest]);
    return guest;
  };

  const deleteGuest = (id) => {
    setGuests((current) => current.filter((g) => g.id !== id));
  };

  const openInvite = (token) => {
    setActiveToken(token);
    setRsvpView("invite");
  };

  return (
    <div className="site-shell">
      <header className="hero" id="top">
        <img className="hero-photo" src="/photos/1.jpg" alt="Amelia and Theo in a sunlit Tagaytay garden" />
        <div className="hero-shade" />
        <img className="hero-corner" src="/assets/floral-corner.png" alt="" aria-hidden="true" />
        <nav className="main-nav" aria-label="Wedding sections">
          <a className="nav-mark" href="#top" aria-label="Back to top">
            <img src="/assets/monogram.png" alt="" />
          </a>
          <div className="nav-links">
            {navItems.map(([id, label]) => (
              <a key={id} className={activeSection === id ? "is-active" : ""} href={`#${id}`}>
                {label}
              </a>
            ))}
          </div>
        </nav>

        <div className="hero-content">
          <img className="monogram" src="/assets/monogram.png" alt="" />
          <h1>
            <span>{couple.firstNames[0]}</span>
            <em>&</em>
            <span>{couple.firstNames[1]}</span>
          </h1>
          <p className="hero-date">{couple.date}</p>
          <p className="hero-line">We are getting married, and we would love for you to be there.</p>
          <a className="primary-link" href="#rsvp">Send RSVP</a>
        </div>

        <a className="scroll-cue" href="#story" aria-label="Scroll to our story">
          <img src="/assets/scroll-arrow.svg" alt="" />
        </a>
      </header>

      <main>
        <Countdown />

        <section className="section story-section" id="story">
          <div className="story-photo">
            <img src="/photos/6.jpg" alt="Amelia and Theo smiling during their engagement shoot" loading="lazy" />
          </div>
          <article className="letter-card">
            <img className="letter-corner" src="/assets/floral-corner.png" alt="" />
            <p className="script-note">A note from us</p>
            <h2>Our Story</h2>
            <p>
              We met on a rainy afternoon, became friends over coffee that always ran long,
              and slowly found our way into a love that felt steady and bright. This day is
              our chance to gather the people who have carried us, cheered for us, and made
              home feel bigger.
            </p>
            <p className="signature">With love, Amelia & Theo</p>
          </article>
        </section>

        <Divider />

        <section className="section schedule-section" id="schedule">
          <div className="section-heading">
            <h2>Schedule</h2>
            <p>{couple.venue} · {couple.city}</p>
          </div>
          <div className="timeline" aria-label="Wedding day schedule">
            {schedule.map((item) => (
              <article className="timeline-item" key={item.title}>
                <span className="timeline-rail" aria-hidden="true">
                  <span className="timeline-marker" aria-hidden="true" />
                </span>
                <div className="timeline-body">
                  <time>{item.time}</time>
                  <h3>{item.title}</h3>
                  <p className="venue">{item.venue}</p>
                  <p>{item.copy}</p>
                  <address>{item.address}</address>
                </div>
              </article>
            ))}
          </div>
          <div className="schedule-actions">
            <button className="secondary-button" type="button" onClick={createCalendarFile}>
              Download Calendar
            </button>
            <a className="text-link" href={googleCalendarUrl} target="_blank" rel="noreferrer">
              Open in Google Calendar
            </a>
          </div>
          <div className="venue-card">
            <div className="venue-map" aria-hidden="true">
              <span className="venue-pin">
                <Icon name="petals" />
              </span>
            </div>
            <div className="venue-details">
              <p className="script-note venue-eyebrow">Find your way</p>
              <h3>{couple.venue}</h3>
              <address>{couple.city}</address>
              <p>Set in the cool Tagaytay highlands, a short drive from the city — allow extra travel time for the afternoon ceremony.</p>
              <a className="secondary-button" href={mapsUrl} target="_blank" rel="noreferrer">
                Get Directions
              </a>
            </div>
          </div>
        </section>

        <Divider />

        <section className="section dress-section" id="dress-code">
          <div className="section-heading narrow">
            <h2>Garden Formal</h2>
            <p>
              Soft pastels, florals, and tailored garden pieces are welcome. Please avoid
              white, ivory, denim, and bright red.
            </p>
          </div>
          <div className="dress-layout">
            <div className="swatch-panel" aria-label="Suggested guest attire colors">
              {dressSwatches.map(([color, label]) => (
                <span key={label} style={{ "--swatch": color }}>
                  <i aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
            <div className="dress-copy">
              <h3>What to wear</h3>
              <ul>
                <li>Do choose soft fabrics, floral prints, light suits, or polished separates.</li>
                <li>Do bring a shawl or light layer for the evening garden breeze.</li>
                <li>Do not wear white, ivory, bridal lace, jeans, or neon tones.</li>
              </ul>
            </div>
          </div>
        </section>

        <Divider />

        <section className="section entourage-section" id="entourage">
          <div className="section-heading">
            <h2>Entourage</h2>
            <p>The family and friends walking nearest to our vows.</p>
          </div>
          <div className="entourage-grid">
            <div className="pair-row pair-row-two">
              <article className="entourage-card">
                <div className="card-head">
                  <Icon name="couple" />
                  <h3>Maid of Honor</h3>
                </div>
                <ul>
                  {entourageGroups.find((group) => group.role === "Maid of Honor").members.map((member) => (
                    <li key={member}>{member}</li>
                  ))}
                </ul>
              </article>
              <article className="entourage-card">
                <div className="card-head">
                  <Icon name="couple" />
                  <h3>Best Man</h3>
                </div>
                <ul>
                  {entourageGroups.find((group) => group.role === "Best Man").members.map((member) => (
                    <li key={member}>{member}</li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="pair-row pair-row-two">
              <article className="entourage-card">
                <div className="card-head">
                  <Icon name="family" />
                  <h3>Parents of the Bride</h3>
                </div>
                <ul>
                  {entourageGroups.find((group) => group.role === "Parents of the Bride").members.map((member) => (
                    <li key={member}>{member}</li>
                  ))}
                </ul>
              </article>
              <article className="entourage-card">
                <div className="card-head">
                  <Icon name="family" />
                  <h3>Parents of the Groom</h3>
                </div>
                <ul>
                  {entourageGroups.find((group) => group.role === "Parents of the Groom").members.map((member) => (
                    <li key={member}>{member}</li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="pair-row pair-row-two">
              <article className="entourage-card">
                <div className="card-head">
                  <Icon name="petals" />
                  <h3>Bridesmaids</h3>
                </div>
                <ul>
                  {entourageGroups.find((group) => group.role === "Bridesmaids").members.map((member) => (
                    <li key={member}>{member}</li>
                  ))}
                </ul>
              </article>
              <article className="entourage-card">
                <div className="card-head">
                  <Icon name="ring" />
                  <h3>Groomsmen</h3>
                </div>
                <ul>
                  {entourageGroups.find((group) => group.role === "Groomsmen").members.map((member) => (
                    <li key={member}>{member}</li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="pair-row pair-row-two">
              <article className="entourage-card">
                <div className="card-head">
                  <Icon name="ring" />
                  <h3>Bearers</h3>
                </div>
                <ul>
                  {entourageGroups.find((group) => group.role === "Bearers").members.map((member) => (
                    <li key={member}>{member}</li>
                  ))}
                </ul>
              </article>
              <article className="entourage-card">
                <div className="card-head">
                  <Icon name="petals" />
                  <h3>Flower Girls</h3>
                </div>
                <ul>
                  {entourageGroups.find((group) => group.role === "Flower Girls").members.map((member) => (
                    <li key={member}>{member}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <Divider />

        <section className="section sponsors-section" id="sponsors">
          <div className="section-heading">
            <h2>Sponsors</h2>
            <p>With gratitude to the witnesses who will bless and stand beside us.</p>
          </div>
          <div className="sponsor-layout">
            <article className="principal-list">
              <Icon name="witness" />
              <h3>Principal Sponsors</h3>
              <ul>
                {sponsors.principal.map((name) => <li key={name}>{name}</li>)}
              </ul>
            </article>
            <div className="secondary-list">
              {sponsors.secondary.map((group) => (
                <article key={group.role}>
                  <Icon name={group.icon} />
                  <h3>{group.role}</h3>
                  <p>{group.members.join(" and ")}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        <section className="section gallery-section" id="photos">
          <div className="section-heading narrow">
            <h2>Photos</h2>
            <p>A few frames from the afternoon we practiced being still long enough for forever.</p>
          </div>
          <div className="gallery-shell">
            <div className="gallery-mobile-controls" aria-label="Gallery navigation">
              <button className="gallery-nav-button" type="button" onClick={() => scrollGallery(-1)} aria-label="Previous photo">
                ‹
              </button>
              <button className="gallery-nav-button" type="button" onClick={() => scrollGallery(1)} aria-label="Next photo">
                ›
              </button>
            </div>
            <div className="gallery-grid" ref={galleryRailRef}>
            {galleryPhotos.map((photo, index) => (
              <button key={photo.src} className="gallery-tile" type="button" onClick={() => setLightboxIndex(index)}>
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              </button>
            ))}
            </div>
          </div>
        </section>

        <Divider />

        <section className="section rsvp-section" id="rsvp">
          <div className="rsvp-intro">
            <img src="/assets/monogram.png" alt="" />
            <p className="script-note">You're invited</p>
            <h2>RSVP</h2>
            <p>
              Each guest receives a personal invitation link — there is no open form, so
              seating stays exactly as planned. Kindly respond by {couple.rsvpDeadline}.
            </p>
            <div className="rsvp-toggle" role="tablist" aria-label="RSVP view">
              <button
                type="button"
                role="tab"
                aria-selected={rsvpView === "invite"}
                className={rsvpView === "invite" ? "is-active" : ""}
                onClick={() => setRsvpView("invite")}
              >
                Your Invitation
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={rsvpView === "manage"}
                className={rsvpView === "manage" ? "is-active" : ""}
                onClick={() => setRsvpView("manage")}
              >
                Guest Manager
              </button>
            </div>
            <p className="rsvp-demo-hint">
              Demo tip: open <strong>Guest Manager</strong> to see how the couple creates a
              unique invite link for every guest.
            </p>
          </div>

          <div className="rsvp-panel">
            {rsvpView === "invite" ? (
              <InvitationCard guest={activeGuest} isDemo={isDemoInvite} onRespond={respondToInvite} />
            ) : (
              <GuestManager
                guests={guests}
                onAdd={addGuest}
                onDelete={deleteGuest}
                onOpenInvite={openInvite}
              />
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <img src="/assets/monogram.png" alt="" />
        <p>Questions? Contact {couple.contact}</p>
        <small>With love, {couple.names} · #AmeliaAndTheo</small>
      </footer>

      {selectedPhoto && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo preview">
          <button className="lightbox-close" type="button" onClick={() => setLightboxIndex(null)}>Close</button>
          <button className="lightbox-nav prev" type="button" onClick={() => setLightboxIndex((lightboxIndex - 1 + galleryPhotos.length) % galleryPhotos.length)} aria-label="Previous photo">‹</button>
          <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
          <button className="lightbox-nav next" type="button" onClick={() => setLightboxIndex((lightboxIndex + 1) % galleryPhotos.length)} aria-label="Next photo">›</button>
        </div>
      )}
    </div>
  );
}
