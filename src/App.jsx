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

const mealOptions = ["Chicken", "Beef", "Vegetarian", "Vegan", "Child's Meal"];

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

export default function App() {
  const [activeSection, setActiveSection] = useState("story");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const galleryRailRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    attendance: "",
    guests: "1",
    meal: "Chicken",
    honeypot: "",
  });

  const selectedPhoto = lightboxIndex === null ? null : galleryPhotos[lightboxIndex];
  const attending = formData.attendance === "yes";

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

  const updateForm = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const submitRsvp = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (formData.honeypot) return;
    if (!formData.fullName.trim()) nextErrors.fullName = "Please share the name we should look for on the guest list.";
    if (!formData.attendance) nextErrors.attendance = "Please let us know whether you can join us.";
    if (attending && !formData.meal) nextErrors.meal = "Please choose a meal so we can prepare properly.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    localStorage.setItem("ameliaTheoRsvp", JSON.stringify({ ...formData, submittedAt: new Date().toISOString() }));
    setSubmitted(true);
  };

  return (
    <div className="site-shell">
      <header className="hero" id="top">
        <img className="hero-photo" src="/photos/1.jpg" alt="Amelia and Theo in a sunlit Tagaytay garden" />
        <div className="hero-shade" />
        <img className="hero-corner" src="/assets/floral-corner.svg" alt="" aria-hidden="true" />
        <nav className="main-nav" aria-label="Wedding sections">
          <a className="nav-mark" href="#top" aria-label="Back to top">
            <img src="/assets/monogram.svg" alt="" />
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
          <img className="monogram" src="/assets/monogram.svg" alt="" />
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
        <section className="section story-section" id="story">
          <div className="story-photo">
            <img src="/photos/6.jpg" alt="Amelia and Theo smiling during their engagement shoot" loading="lazy" />
          </div>
          <article className="letter-card">
            <img className="letter-corner" src="/assets/floral-corner.svg" alt="" />
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
                <span className="timeline-marker" aria-hidden="true" />
                <time>{item.time}</time>
                <h3>{item.title}</h3>
                <p className="venue">{item.venue}</p>
                <p>{item.copy}</p>
                <address>{item.address}</address>
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
          <div className="map-placeholder" role="img" aria-label="Map placeholder for Alta Veranda in Tagaytay City">
            <span>Map placeholder</span>
            <strong>Alta Veranda, Tagaytay City</strong>
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

        <section className="section people-split" id="entourage">
          <div className="people-split-heading section-heading">
            <h2>Entourage & Sponsors</h2>
            <p>The names nearest to the vows, set side by side for family to scan easily.</p>
          </div>

          <div className="people-split-grid">
            <article className="people-panel" id="people-entourage">
              <div className="panel-head">
                <h3>Entourage</h3>
                <p>The family and friends walking nearest to our vows.</p>
              </div>
              <div className="people-grid">
                {entourageGroups.map((group) => (
                  <article className="people-card" key={group.role}>
                    <Icon name={group.icon} />
                    <h4>{group.role}</h4>
                    <ul>
                      {group.members.map((member) => <li key={member}>{member}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </article>

            <article className="people-panel" id="people-sponsors">
              <div className="panel-head">
                <h3>Sponsors</h3>
                <p>With gratitude to the witnesses who will bless and stand beside us.</p>
              </div>
              <div className="sponsor-layout">
                <article className="principal-list">
                  <Icon name="witness" />
                  <h4>Principal Sponsors</h4>
                  <ul>
                    {sponsors.principal.map((name) => <li key={name}>{name}</li>)}
                  </ul>
                </article>
                <div className="secondary-list">
                  {sponsors.secondary.map((group) => (
                    <article key={group.role}>
                      <Icon name={group.icon} />
                      <h4>{group.role}</h4>
                      <p>{group.members.join(" and ")}</p>
                    </article>
                  ))}
                </div>
              </div>
            </article>
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
            <img src="/assets/monogram.svg" alt="" />
            <h2>RSVP</h2>
            <p>Kindly respond by {couple.rsvpDeadline}.</p>
          </div>

          <div className="rsvp-card">
            {submitted ? (
              <div className="thank-you" role="status">
                <img src="/assets/monogram.svg" alt="" />
                <h3>Thank you.</h3>
                <p>
                  Your response has been saved for this demo. In production, this form can
                  connect to Google Sheets, Airtable, or a database endpoint.
                </p>
              </div>
            ) : (
              <form onSubmit={submitRsvp} noValidate>
                <label className="honeypot">
                  Leave this blank
                  <input name="honeypot" value={formData.honeypot} onChange={updateForm} tabIndex="-1" autoComplete="off" />
                </label>

                <label>
                  <span>Full Name</span>
                  <input name="fullName" value={formData.fullName} onChange={updateForm} required autoComplete="name" />
                  {errors.fullName && <small>{errors.fullName}</small>}
                </label>

                <fieldset>
                  <legend>Attendance</legend>
                  <div className="attendance-toggle">
                    <label>
                      <input type="radio" name="attendance" value="yes" checked={formData.attendance === "yes"} onChange={updateForm} />
                      <span>Joyfully Accepts</span>
                    </label>
                    <label>
                      <input type="radio" name="attendance" value="no" checked={formData.attendance === "no"} onChange={updateForm} />
                      <span>Regretfully Declines</span>
                    </label>
                  </div>
                  {errors.attendance && <small>{errors.attendance}</small>}
                </fieldset>

                {attending && (
                  <div className="conditional-fields">
                    <label>
                      <span>Number of Guests</span>
                      <select name="guests" value={formData.guests} onChange={updateForm}>
                        {[1, 2, 3, 4].map((count) => <option key={count}>{count}</option>)}
                      </select>
                    </label>
                    <label>
                      <span>Meal Choice</span>
                      <select name="meal" value={formData.meal} onChange={updateForm}>
                        {mealOptions.map((meal) => <option key={meal}>{meal}</option>)}
                      </select>
                      {errors.meal && <small>{errors.meal}</small>}
                    </label>
                  </div>
                )}

                <label className="consent">
                  <input type="checkbox" required />
                  <span>I understand this is a demo RSVP and production storage is a TODO.</span>
                </label>

                <button className="primary-button" type="submit">Send Response</button>
                <p className="form-note">TODO: replace local demo storage with POST /api/rsvp.</p>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <img src="/assets/monogram.svg" alt="" />
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
