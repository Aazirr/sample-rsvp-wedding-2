Build a beautiful, responsive, single-page wedding website with a soft, romantic floral theme. The site should feel elegant and cinematic, like a digital wedding invitation that doubles as a keepsake. Use modern web standards (HTML5, CSS3, vanilla JavaScript or React — your choice based on what's already in this project) and prioritize clean, semantic, accessible code.

lets copy C:\Users\Franz Jason Dolores\Documents\Work\Projects\SunSpire\Package-one-sample
and reimagine the website use assets-integration-plan.md so we can have assets on the website. use the photos on /public/photos

1. Overall Aesthetic


Theme: Soft floral wedding invitation — romantic, airy, elegant, not cluttered.
Color palette:

Blush pink: #F3D9D5 / #E8B4B8 (primary accent)
Sage green: #A8B5A0 / #8A9A82 (secondary accent)
Cream / ivory background: #FBF7F0 / #F5EFE6
Warm white: #FFFDFB
Charcoal/soft black for text: #3A3A3A (avoid pure black, it feels harsh against cream)
Optional metallic accent: muted gold #C9A86A for small details (dividers, icons)



Typography:

Headings: an elegant serif or calligraphy-style font (e.g., "Playfair Display," "Cormorant Garamond," or "Great Vibes" for the couple's names)
Body text: a clean, readable sans-serif or light serif (e.g., "Lato," "Lora," or "EB Garamond") for good legibility
Generous letter-spacing on headings; comfortable line-height (1.6–1.8) on body copy



Visual motifs:

Hand-painted watercolor-style floral illustrations (roses, peonies, eucalyptus, baby's breath) as corner accents, section dividers, and a subtle background border frame
Thin floral vine/wreath illustrations framing the couple's names and key section headers
Soft drop shadows, rounded corners (12–20px) on cards
Subtle fade-in and gentle scroll/parallax animations (delicate, not playful)
Plenty of white/cream space; avoid visual clutter
Consistent floral motif repeated as a section divider between every major section, so scrolling feels like turning pages in an invitation suite





2. Page Structure & Sections

A. Cinematic Hero


Full-viewport-height, immersive opening section — this is the most important first impression, so give it extra polish
Full-bleed background: a softly blurred/overlaid floral watercolor scene, or a placeholder for a couple's photo/video with a translucent cream-to-transparent gradient overlay so text stays readable
If video is available, support a muted, looping cinematic background video (with a static image fallback for slow connections); include a subtle "sound on" toggle if audio is added
Couple's names in large script/serif font, animated with a gentle fade/letter-reveal on load (e.g., "Sofia & James")
Wedding date, elegantly formatted (e.g., "October 18, 2026")
Optional short tagline ("We're getting married — and we'd love for you to be there")
A floral divider element beneath the names
Animated scroll-down indicator (e.g., a slowly bouncing petal or chevron) inviting the visitor into the rest of the site
Parallax effect on the floral background elements as the user scrolls (subtle, performance-friendly)


B. Our Story


A short, warm "note from the couple" — a placeholder paragraph (2–4 sentences) written in first person ("we"), framed like a handwritten note
Styled with a soft card or framed-letter treatment: cream paper texture or soft border, a small floral wax-seal or monogram icon, optionally a slightly rotated/imperfect alignment to feel personal and handwritten
Optional small couple photo placeholder with a floral frame overlay
Keep this section short — it's a sentimental pause, not a full biography


C. Schedule


Timeline-style layout (vertical on mobile, can be horizontal on desktop) showing the day's events in order, for example:

Ceremony — time, venue name, address
Cocktail hour — time, location
Reception — time, venue name, address
Program highlights (optional) — e.g., toasts, first dance, cake cutting



Each timeline entry in a small card with a floral icon marker (e.g., a small flower bullet connecting each point on the timeline)
Add-to-calendar button (generates an .ics file or Google Calendar link) near the ceremony/reception details
Embedded map placeholder or clearly marked spot for a Google Maps embed for the main venue


D. Dress Code


Clearly state the dress code theme (e.g., "Garden Formal," "Semi-Formal Floral") as a placeholder label that's easy to edit
Visual color palette swatches showing the suggested guest attire colors (a small row of soft circular or square swatches matching the wedding's palette, separate from the site's own UI palette so it's easy for the couple to customize)
Short do's/don'ts copy block (e.g., "Soft pastels and florals are welcome. Please avoid white, ivory, and bright red.") as editable placeholder text
Optional small illustrative icons or placeholder mood-board image showing example outfit inspiration


E. Entourage


A elegant directory of the wedding party, grouped by role, for example:

Parents of the Bride / Parents of the Groom
Best Man / Maid of Honor
Groomsmen / Bridesmaids
Secondary sponsors (if not placed in the Sponsors section)
Bearers (ring bearer, coin bearer, bible bearer) and Flower Girls



Display as a clean grid of name cards, each with a small floral corner accent; allow for an optional circular photo placeholder per person
Group headers styled in the heading serif font with a thin floral divider under each group title
Make the data structure easy to extend (e.g., an array/object of entourage members per role) since the names will change per couple


F. Sponsors


Split into two clearly labeled groups, common in many wedding traditions:

Principal Sponsors (Ninong/Ninang or godparents) — larger, more prominent list
Secondary Sponsors — typically tied to specific ceremony roles (e.g., candle, veil, cord sponsors)



Present each group as an elegant two-column (desktop) / single-column (mobile) list of names with a small decorative floral bullet or divider between names
Keep typography refined and slightly more formal here than the rest of the site (this section is often read carefully by family)
Make names easy to edit via a simple data array/JSON object


G. Photoshoot / Gallery


A tasteful photo gallery section for pre-wedding/engagement shoot images
Responsive grid or masonry layout with consistent spacing and soft rounded corners on each photo
Lightbox/modal behavior on click: clicking a thumbnail opens a larger view with next/previous navigation and a dimmed cream-tinted overlay background (not harsh black)
Lazy-load images for performance
Optional subtle hover effect (gentle zoom or a thin gold border fade-in) on each thumbnail
Include placeholder images/alt text clearly marked so real photos can be swapped in easily


H. RSVP Section

Build a clean, single card-style form, centered, with floral accents in the corners. Fields:


Full Name — text input, required
Attendance — Yes/No toggle or radio buttons styled as elegant buttons ("Joyfully Accepts" / "Regretfully Declines"), required
Number of Guests — number stepper or dropdown (1–4), only shown/required if attendance = Yes
Meal Choice — dropdown or radio cards, only shown if attendance = Yes. Options: "Chicken," "Beef," "Vegetarian," "Vegan," "Child's Meal" — easy to edit/extend
Submit button — styled as a floral-accented button with hover animation (e.g., a small leaf or petal that animates on hover)


Form behavior:


Client-side validation with friendly, non-jarring error messages (no harsh red boxes — use the sage/blush palette for error states)
On submit, show a graceful "Thank You" confirmation state (replace the form with a thank-you message and a floral illustration) rather than just an alert
If a backend/database isn't specified elsewhere in this project, store submissions in a simple JSON file, local database, or a placeholder API call (POST /api/rsvp) clearly marked with a TODO comment for connecting to a real backend (e.g., Google Sheets, Airtable, or a database)
Include basic spam protection consideration (honeypot field or simple checkbox)
Add an RSVP deadline date displayed above the form (e.g., "Kindly respond by September 1, 2026")


I. Footer


Small repeated floral motif
Couple's names or initials in a monogram style
Optional: contact info for questions, hashtag for the wedding
Optional: a closing line such as "With love, Sofia & James"


3. Navigation


A slim, sticky navigation bar (or floating floral-accented menu button on mobile) that appears after the hero, letting guests jump to: Our Story, Schedule, Dress Code, Entourage, Sponsors, Photos, RSVP
Nav background should stay translucent cream so it doesn't compete with the floral background
Smooth-scroll behavior when a nav link is clicked
Highlight the active section in the nav as the user scrolls


4. Technical Requirements


Fully responsive: looks polished on mobile (375px), tablet, and desktop
Semantic HTML5 (<header>, <main>, <section>, <nav>, <form>, etc.)
Accessible: proper labels on all form fields, sufficient color contrast for text, keyboard-navigable form and nav, ARIA attributes where appropriate
Fast-loading: optimize/lazy-load all floral illustrations and gallery photos; compress/lazy-load any hero video
Use CSS custom properties (variables) for the color palette and fonts so the theme is easy to adjust later
Organize code cleanly: separate concerns (structure/style/behavior), with comments explaining each major section
If using React or a framework, break the page into logical components (Hero, Story, Schedule, DressCode, Entourage, Sponsors, Gallery, RSVPForm, ThankYou, Nav, Footer)


5. Floral Illustration Assets


If working in an environment with image generation or an asset library, source/generate watercolor-style floral illustrations (transparent PNG or SVG) for: corner accents, a wreath/frame for the couple's names, and a small divider graphic repeated between sections
If no image generation is available, use CSS-drawn or SVG-based simple floral/leaf shapes as a tasteful fallback so the site still looks finished without external image dependencies
Keep all floral graphics in a consistent, soft watercolor or fine-line illustration style — don't mix illustration styles


6. Nice-to-Haves (only if time/scope allows)


Subtle background music toggle (off by default), pausing automatically if a hero video with sound is playing
Countdown timer to the wedding date, placed near the hero or schedule section
A simple guest list lookup (search by name to pre-fill the RSVP form) — note this requires a backend guest list
Light/no dark-mode toggle (this theme should stay light and airy; skip dark mode)


7. Deliverable

A complete, ready-to-run project (with clear setup instructions in a README if applicable) implementing all sections above — Cinematic Hero, Our Story, Schedule, Dress Code, Entourage, Sponsors, Photoshoot/Gallery, and RSVP — with the soft pastel floral wedding theme applied consistently throughout.