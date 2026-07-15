# Design

## Style

Soft floral wedding invitation with a cinematic photo-led hero, invitation-paper section treatments, botanical line art, and a restrained keepsake tone.

## Colors

- `--ivory`: `oklch(0.977 0.011 78)` for the page base.
- `--cream`: `oklch(0.949 0.023 74)` for warm invitation paper.
- `--white`: `oklch(0.998 0.003 78)` for elevated paper surfaces.
- `--ink`: `oklch(0.25 0.014 45)` for primary text.
- `--muted`: `oklch(0.43 0.018 72)` for body support text.
- `--blush`: `oklch(0.82 0.07 19)` and `--blush-deep`: `oklch(0.61 0.096 20)` for romantic accents.
- `--sage`: `oklch(0.67 0.055 138)` and `--sage-deep`: `oklch(0.48 0.057 138)` for controls and calm structure.
- `--gold`: `oklch(0.72 0.09 83)` for fine ornamental details.

## Typography

- Display: `Bodoni Moda`, Georgia, serif. Used for couple names, section titles, and sentimental note/signature moments.
- Body/UI: `Manrope`, Segoe UI, sans-serif. Used for navigation, paragraphs, forms, and lists.
- Heading tracking stays modest at `-0.02em` or looser; body text uses comfortable line height around `1.7`.

## Components

- Fixed translucent cream navigation with monogram mark and active section state.
- Full-bleed hero with real couple photography, monogram, floral corner, and scroll cue.
- Deep-botanical countdown band (live days/hours/minutes/seconds to the ceremony) placed between the hero and story to break the light-neutral section rhythm with a single dark, high-contrast moment.
- Letter card for the story section with a restrained floral corner.
- Timeline schedule with floral-dot markers and calendar actions.
- Venue card with a stylized decorative map, floral map pin, and a "Get Directions" link to Google Maps (replaces the earlier dashed map placeholder).
- Dress-code swatches separated from the UI palette.
- Entourage and sponsor cards with local SVG line icons.
- Responsive photo gallery: a clean, uniform 4×5 aspect grid (4 columns → 2 columns → mobile snap-slider) with a cream-tinted lightbox. Uniform tiles replace the earlier ragged masonry to keep the grid gap-free at any photo count.
- Invitation-based RSVP with two views toggled from the intro:
  - **Your Invitation** — a personalized invitation card that greets the guest by name ("Welcome, [Name]"), states their seat allowance, and offers **Joyfully Accept / Regretfully Decline**. Responses are changeable, and a graceful themed "invitation could not be found" state handles unknown/expired links.
  - **Guest Manager** — the couple's admin demo: response stats (invited / accepted / declined / pending), an add-guest field that mints a unique invite link per guest, and a guest list with status badges, copy-link, preview, and remove.

## RSVP invitation model

The RSVP is invite-only, mirroring the reference system in `Family/Clyde/wedding-invitation`: the couple creates each guest, the app mints an unguessable token, and that token is the guest's personal link (`?invite=<token>`). There is no open form, so seating stays controlled and duplicates are structurally impossible. This sample runs the whole flow client-side — a seeded guest list, `localStorage` persistence, and a default "Demo invitation" shown when no personal link is present — so the experience is demonstrable without a backend. In production this maps to the admin + database + `/invite/[token]` routes of the reference implementation.

## Section rhythm

Sections are mostly light (ivory/cream) to let photography lead. To avoid an "all sections feel identical" beige page, the layout uses one deliberate dark contrast band (the deep-green countdown) near the top, full-width cream bands behind Entourage and Sponsors, and the framed dress-code and venue treatments as secondary accents.

## Assets

Generated concept reference: `docs/visual-concept.png`.

Local ornamental assets live in `public/assets/` and use `currentColor` where practical:

- `monogram.svg`
- `floral-corner.svg`
- `divider-leaf.svg`
- `pattern-botanical.svg`
- `scroll-arrow.svg`
- `frame-rsvp.svg`
- `icons/icon-*.svg`

Photos are reused from `public/photos`.

## Motion

Hero photography has a slow load drift and the hero typography rises in gently. The scroll cue moves subtly. Gallery tiles lift and darken slightly on hover. The countdown ticks once per second (live data, not decorative animation). `prefers-reduced-motion` disables animation and smooth scrolling.
