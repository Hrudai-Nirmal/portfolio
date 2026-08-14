# Project Context

## Project
- Name: `Portfolio`
- Stack: Next.js (App Router), React, TypeScript, Tailwind CSS
- Primary sections: Home, About, Work, Why Work With Me, Contact

## Source of Truth
- Main README reviewed: `README.md`
- Project descriptions reviewed: `/Users/hrudainirmal/Projects/KnowledgeBases/Projects/project_descriptions.md`

## Latest Update (2026-05-24)
- Added `Cortana Personal AI Agent` to the Work section in `src/components/Projects.tsx`.
- Replaced the About photo placeholder with the provided image in `src/components/About.tsx`.
- Added image asset to `public/asdSDFs.jpeg`.
- Added downloadable resume asset at `public/Hrudai_Nirmal_Resume.pdf`.
- Wired the Contact section `Download CV` button to `href="/Hrudai_Nirmal_Resume.pdf"` in `src/components/Contact.tsx`.
- Added `Phone` contact action in `src/components/Contact.tsx` that copies `+91 7799934399` to clipboard on click.

## Latest Update (2026-05-25)
- Replaced About section copy in `src/components/About.tsx` with updated full-stack + AI engineering narrative provided by user.

## Latest Update (2026-05-26)
- Documented model selection guidance request: compared GPT-5.5 vs GPT-5.4 vs GPT-5.3-codex for coding workflows.

## Latest Update (2026-08-12)
- Added `Cortex Enterprise RAG` and `Meridian AI Workflow Control Room` to the Work section so every project in the maintained descriptions source is represented.
- Moved project-card content into `src/content/projects.ts` so completeness can be tested independently from JSX rendering.
- Added `tests/projects.test.ts` to guard project coverage, title uniqueness, and required card content.
- Rebuilt the hero around the React Bits `Lightfall` OGL background using the supplied parameters, a looping role headline, and Bangalore-focused positioning copy.
- Replaced the legacy dropdown navigation with the React Bits `StaggeredMenu` animation while keeping Ask Shadow accessible as a separate control.
- Moved Work directly after the hero and made it a GSAP-pinned horizontal story on desktop, with reversible scroll-scrubbed `StrokeText` and project entrances. The first three projects are Meridian, Cortex, and Cortana; mobile uses the same order in a vertical flow.
- Kept About later in the page so its existing personal context remains available without interrupting the hero-to-work transition.
- Restored the desktop header-to-menu transition: the full header is visible at the top, collapses after 64px of scroll, and reveals the supplied SVG hamburger animation. The button is white while closed and dark when the staggered menu is open; mobile keeps the compact control visible.
- Replaced the nested desktop Work card ScrollTriggers with one reversible pinned GSAP timeline to remove reverse-scroll catch-up around Cortex. Doubled the `My Work` stroke draw duration to 3.2 seconds, added GPU transform hints, centered the header with staggered right-edge exits, expanded fluid type scales for large displays, and blended the hero into Work with an upward-transparent black gradient.
- Corrected the scrubbed `My Work` pacing by doubling its actual scroll range from 52vh to 104vh; timeline duration alone does not control the speed of a scroll-scrubbed animation.
- Extended the `My Work` scrub range again to 208vh for a deliberately slower draw and fill progression.
- Kept the pinned Work track stationary for the same 208vh intro phase, so horizontal project movement begins only after the `My Work` stroke sequence has completed; card reveals share that offset and remain reversible.
- Restored the `My Work` scrub range to 104vh and replaced the fixed horizontal hold with a measured handoff based on the title trigger's remaining travel. Removed ScrollTrigger's velocity-completion heuristic so forward and reverse motion stay directly coupled to scroll without a dead zone after Meridian.
- Fixed the remaining reverse-scroll frame contention at its rendering source: Lightfall now caps its WebGL DPR at 1.5 and skips shader rendering while the hero is offscreen or the document is hidden, preserving the exact visual parameters while freeing GPU time for the Work transform.
- Rebuilt the expanded navigation from the selected Mission Control Rail mock: modular cream/charcoal neo-brutalist panels, tactile section keys, a purple Ask Shadow co-pilot control, and a yellow command-menu module, while retaining the existing collapse and staggered-menu behavior.
- Replaced the rejected full-header raster shortcut with a responsive, interactive SVG reconstruction. The identity chassis, four linked navigation keys, Shadow command screen, cabling, indicators, screws, and hazard details are vector elements; the menu remains a real animated input rather than part of the SVG.
- Scaled the desktop rail to 70%, removed the yellow markings from its red alert indicator, and made each navigation key's blue status light turn yellow on that key's hover state. At compact breakpoints, the menu owns the top-right position in a higher stacking layer while Ask Shadow stays top-left.
- Replaced the desktop rail's embedded menu control with an AUX THRUST module. Across the first 240px of scroll, the rail dips 18px before slinging above the viewport while the detached compact menu slings into the top-right; the scrubbed timeline retraces the same frames in reverse. The menu remains fixed after the handoff, while compact layouts keep their always-visible menu behavior.
- AUX THRUST is now an accessible pointer-and-keyboard slider connected to the hero's live WebGL uniforms. Its resting position preserves the supplied Lightfall values (`speed: 0.5`, `streakLength: 3`, `glow: 0.2`); maximum thrust raises them to `4.5`, `10`, and `0.5` without recreating the canvas, producing a denser warp-speed effect while the control remains responsive.
