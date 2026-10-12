# Gujarat — Beyond the Horizon

Palette: `#F9E6A8`, `#F2A900`, `#CC6F00`, `#4D2A00`. Natural photography and documentary video retain their original colors.

An independent, responsive travel editorial built with Next.js App Router, TypeScript, Tailwind CSS, React Three Fiber / Drei, GSAP ScrollTrigger and Lenis.

## Run locally

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev
```

Open the printed localhost URL. For a production static export:

```bash
npm run typecheck
npm run lint
npm run build
```

The deployable website is in `out/`. It needs no server credentials or external API. Serve this folder with a static HTTP server; do not open index.html directly from disk.

## Structure

- `lib/data.ts`: destination facts and regional itinerary rules.
- `components/Journey.tsx`: accessible HTML, dialogs, filters, map and local planner.
- `components/Scene.tsx`: one lazy-loaded procedural canvas with instanced geometry, smooth rising/sinking chapter transitions, scroll-driven camera travel, desktop parallax and animated water.
- `components/VideoChapter.tsx`: intersection-activated Kutch and Garba documentary backgrounds with pause controls, off-screen/hidden-tab pausing and reduced-motion stills.
- `app/globals.css`: responsive editorial design and print/reduced-motion layouts.
- `public/art`: original SVG landscape and textile interpretations.
- `public/photos` and `lib/photo-credits.json`: local Wikimedia photography and source/license records.

## Behaviour

Destination cards and map markers open native modal dialogs, with Escape closing and focus restoration. Desktop destination browsing is scroll-linked; small screens and reduced-motion preferences use a normal grid. Lenis feeds the GSAP ticker and cleans up on unmount. 3D is disabled for reduced motion and unavailable WebGL; the background illustration remains visible. Device pixel ratio is capped, and rendering pauses for hidden tabs.

The planner keeps routes within a regional cluster, uses interests to select local activity suggestions, and includes buffer time. It deliberately does not promise bookings, schedules or sightings. Save/load uses browser localStorage, with recoverable errors. Print produces only the itinerary and planning caveats. No analytics, newsletter or booking integration is implied.

## Content and limitations

The map is schematic with geographically approximate marker positions, not a navigation map. Procedural scenes and SVGs are artistic interpretations, not accurate monument replicas. Check the visible image credits for any Wikimedia photography used. Official tourism and attraction portals are linked for current access information. Festival dates, prices and opening schedules are intentionally not asserted.

Routes are planning suggestions, not a routing engine. Three-day routes stay close to their starting region. Routes may be one-way; return travel is not silently assumed. Check transport and access before booking.

## Validation

Production build, TypeScript and ESLint checks pass. Tested 24 regional route combinations and interest-sensitive output. Browser checks covered desktop/mobile layouts, category filtering, map selection, dialog Escape/focus restoration, mobile navigation and saved itinerary restoration. Print styling and reduced-motion/WebGL fallbacks are implemented; native printer output and physical mobile GPU performance were not device-tested.

Video credits are listed on the site and in `lib/video-credits.json`. Locally hosted WebM files use Wikimedia’s compact 480p derivatives to keep page weight manageable. Browsers that block autoplay show a play control; unsupported video formats retain the poster. Video source credits retain CC BY-SA 4.0. The project has no tracking or external video embeds.
