# Package Two Wedding Sample

A Vite + React single-page wedding invitation and RSVP website for Amelia and Theo, reimagined from the package-one sample with custom floral SVG assets and the existing `/public/photos` engagement images.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- RSVP submissions are demo-only and saved to `localStorage`.
- Production storage is marked in code as `POST /api/rsvp` TODO.
- Content data lives near the top of `src/App.jsx` for easy replacement.
