# Watchpath 🎬

Watchpath is an adaptive movie & TV marathon planner that recalculates your remaining schedule as your watching progress changes.

**Live demo:** https://watchpath-rho.vercel.app

## Features

- Adaptive Doomsday marathon dashboard and countdown
- Movie and TV-series progress tracking
- Expandable seasons and episode-level completion
- Smart date-based schedule that recalculates from remaining progress
- Search and filters for movies, series, watched and unwatched titles
- Six interface languages: Turkish, English, German, Spanish, French and Japanese
- Local-first progress storage with no account required
- QR / transfer-link progress migration between devices
- Responsive desktop and mobile interface
- PWA foundation and offline service-worker support

## Tech stack

- Next.js
- React
- TypeScript
- Lucide React
- Vercel

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

For a production build:

```bash
npm run build
npm start
```

## Project structure

- `app/page.tsx` — marathon data, progress, schedule, search and filters
- `app/i18n.ts` — all supported UI translations
- `app/client-tools.tsx` — language selector, device transfer and creator card
- `app/globals.css` — responsive UI and motion system
- `public/sw.js` — service-worker foundation

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

When adding interface copy, update every supported language in `app/i18n.ts` rather than manipulating rendered DOM text.

## Roadmap

- Complete the Marvel / X-Men / multiverse dataset
- Improve workload balancing for movie and episode sessions
- Add installable PWA icons and stronger offline behavior
- Add more marathon packs
- Optional cloud sync if the project eventually needs automatic multi-device syncing

## License

Watchpath source code is released under the [MIT License](LICENSE).

## Disclaimer

Watchpath is an independent fan-made/open-source project and is not affiliated with Marvel, Disney, TMDB, or any streaming service. Movie and series names, poster artwork and related trademarks belong to their respective rights holders. Poster imagery is used only to identify titles in the demo experience.

Crafted by **BUREMİYE**.
