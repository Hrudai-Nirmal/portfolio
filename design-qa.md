# Mission Control Header and Shadow Comms Design QA

## Source truth

- Selected concept: Mission Control Rail (option 3)
- Reference image: `/Users/hrudainirmal/.codex/generated_images/019ff644-a64e-7702-b2a7-912b3b1d22e1/exec-a88fdcc5-2dcf-4e6c-bb45-258198ca0d04.png`
- Generated pilot avatar: `/Users/hrudainirmal/.codex/generated_images/019ff644-a64e-7702-b2a7-912b3b1d22e1/exec-48ee8082-c8ff-4874-87cf-7df5e2be3db1.png`
- Generated Shadow robot avatar: `/Users/hrudainirmal/.codex/generated_images/019ff644-a64e-7702-b2a7-912b3b1d22e1/exec-732f816a-5bf3-4318-8468-5c45e9d9c8b9.png`
- Source pixels: 2128 × 739
- Implementation: interactive SVG in `/Users/hrudainirmal/Projects/Portfolio/src/components/SpaceshipHeader.tsx` with a purpose-built CRT radar asset at `/Users/hrudainirmal/Projects/Portfolio/public/mission-radar.png`; the original reference image is not shipped or rendered by the site

## Comparison setup

- Local implementation: `http://127.0.0.1:3000/`
- CSS viewport: 1280 × 720 at 1× density
- Browser screenshots: `/tmp/mission-control-radar-header.png` and `/tmp/mission-control-radar-menu.png` (1274 × 717; browser scrollbar excluded)
- Latest retro header and chat screenshots: `/tmp/retro-console-header.png`, `/tmp/shadow-custom-chat.png`, and `/tmp/shadow-custom-chat-mobile.png`
- Icon-only animated-radar screenshot: `/tmp/icon-only-animated-radar-header.png`
- Rendered radar module bounds: 213.18 × 108.43 CSS pixels at x 233.80, y 8.84
- Compared state: hero at the top, menu closed, Shadow chat closed
- Normalization: reference focus crop resized to 842 × 140 and centered above the implementation's 1274 × 150 top region, matching the user-requested 70% rail scale
- Reference and final-state comparison: `/tmp/mission-control-radar-comparison.png`
- Latest three-state comparison: `/tmp/retro-console-shadow-comparison.png` (selected header reference, closed implementation, and active custom conversation)
- Label-removal comparison: `/tmp/icon-only-radar-comparison.png` (previous labeled keys above, icon-only keys and animated radar below)
- Compact screenshot: `/tmp/mission-control-svg-compact.png` at a 390 × 844 CSS viewport
- A separate micro-crop was unnecessary because the combined comparison keeps the radar route, navigation labels, Shadow display, status copy, screws, and thrust control legible

## Findings

- No actionable P0, P1, or P2 mismatches remain.
- The 70% desktop scale is an intentional user-directed refinement; the SVG rail remains centered while the detached compact menu owns the top-right after the handoff.
- The AUX THRUST control keeps the reference's yellow hardware accent and now exposes a real horizontal range, live percentage readout, and red-to-yellow knob state without changing the rail's silhouette.
- Thrust changes only the rate of the existing Lightfall field. Streak length, glow, geometry, and hero contrast remain unchanged as requested.
- The handoff keeps the same endpoints and trigger but now completes in 0.94 seconds, with a restrained sine dip, exponential header launch, and exponential menu drop.
- The left module keeps its original footprint and hardware but replaces personal copy with a monochrome-green CRT route display. The dotted trajectory, orbital rings, destination reticle, segmented progress bar, scanline texture, and phosphor glow remain legible at the rail's 70% scale.
- The four navigation keys now read as individual serviced spacecraft controls rather than generic app tiles: each has a chamfered inset face, inset top hardware plate, corner hardware, dashed seam, tactile hover/press response, and its existing status lamp.
- The final navigation pass removes every visible NAV/KEY and HOME/WORK/ABOUT/CONTACT label from the four key faces. Icons remain at their prior coordinates, while semantic link labels and SVG titles preserve keyboard and screen-reader meaning.
- A luminous dotted overlay follows the decorative map's existing route from x 114/y 127 to the planet target at x 354/y 108. Browser sampling confirmed dash offset changed from -14.12px to -29.18px over 420ms, while the origin beacon changed scale and opacity independently.
- Shadow Comms uses the same cream, charcoal, red, yellow, purple, blue, and green hardware palette as the rail. Its red title plate, secured-channel strip, rounded speech bubbles, thick outlines, and generated crewmate/robot portraits deliver the requested playful social-deduction-game chat energy without using franchise branding or assets.
- At 1280 × 720, the panel occupies x 810–1250, y 144–623.98, and exactly 479.98 pixels of height (two-thirds of the viewport). The rail ends above the panel, so the chat is not overlapped.
- At 390 × 844, the panel is 366.59 × 562.66 pixels, stays within the viewport, and wraps quick prompts rather than creating horizontal overflow.
- Fonts and typography: condensed monospace navigation labels, small green destination telemetry, and the purple terminal display preserve the reference hierarchy and optical weight.
- Spacing and layout rhythm: the identity, four-key navigation bank, and command housing retain the reference's three-module sequence, connected spine, thick chassis, inset panels, rounded corners, and fixed top placement.
- Colors and visual tokens: cream, near-black, charcoal, electric blue, purple, red, and safety yellow match the source art direction with high-contrast outlines and flat neo-brutalist shadows.
- Image quality and asset fidelity: the controls remain responsive vector markup, while the newly requested CRT artwork is a dedicated 3:1 raster asset rendered inside the existing SVG slot. At 1086 × 362 pixels it stays crisp at the displayed 213 × 108 CSS-pixel size without inflating layout dimensions.
- Copy and content: personal name and role details are absent from the rail. HOME, WORK, ABOUT, CONTACT, ASK SHADOW, PRIMARY ACTION, AUX THRUST, and DESTINATION 68% identify the remaining controls and navigation state.

## Comparison history

1. **P1 — full-header raster shortcut:** The prior implementation rendered the selected demo as a single image with invisible hit areas. Fix: removed the PNG from the public bundle and replaced it with an interactive SVG composed from vector chassis, panels, icons, labels, indicators, cabling, screws, and linked controls.
2. **P2 — copy and hazard-detail drift:** The first SVG pass displayed SYSTEM NOMINAL and lacked the selected menu plate's striped safety footer. Fix: changed the status to PRIMARY ACTION, added the striped footer, added the red hazard indicator, and enlarged the identity name.
3. **P2 — compact control collision:** The small-screen menu shared the left-aligned header row and a lower stacking layer with Ask Shadow. Fix: right-aligned the compact header and raised its stacking layer to 60, leaving Ask Shadow at the top-left with no overlap.
4. **P3 — indicator feedback:** Removed the yellow markings from the red alert indicator and added a yellow light state to each navigation key on hover.
5. **P2 — menu/header ownership:** The real desktop hamburger previously occupied the SVG rail's right module. Fix: replaced that module with a non-interactive spacecraft control and detached the hamburger into a scroll-revealed top-right control.
6. **P1 — inert thrust control:** The replacement bar looked adjustable but had no effect. Fix: promoted it to an accessible slider and mapped its range directly to the live Lightfall speed, streak length, and glow uniforms.
7. **P2 — pointer drag stopped at its initial value:** Pointer capture alone did not reliably report intermediate SVG drag movement. Fix: track the active drag explicitly and update from every captured pointer move; a full browser drag now reaches 99% thrust.
8. **P1 — speed changes sought through animation time:** The shader multiplied absolute time by the current speed, so a speed update instantly moved the field backward or forward. Fix: integrate frame deltas into continuous animation time and apply the current speed only to the next increment.
9. **P2 — thrust label text selection:** Dragging across the SVG could select AUX THRUST. Fix: suppress the pointer-down default after explicitly focusing the slider and apply `user-select: none` to the complete control.
10. **P2 — scrubbed header handoff:** Header/menu transforms previously followed every scroll pixel. Fix: crossing 160px now plays an autonomous timeline; crossing upward reverses it from its current position.
11. **P3 — handoff felt too linear and slow:** Fix: divided timings by approximately 1.3 and replaced the gentler power/back eases with `sine.inOut`, `expo.in`, and `expo.out` for a slower middle and sharper sling phases.
12. **P3 — handoff still felt slightly slow:** Fix: shortened the longest phases again, bringing the autonomous timeline from 1.12 to 0.94 seconds without changing its trigger, endpoints, or nonlinear easing.
13. **Requested identity-panel replacement:** Removed the visible name and role copy, then placed a generated green CRT destination radar in the same module footprint with a dotted route and 68% planet progress.
14. **Post-fix evidence:** `/tmp/mission-control-radar-comparison.png` shows the selected reference above and the final radar-equipped implementation below.
15. **P2 — generic navigation keys:** Added numbered service plates, chamfered faces, dashed maintenance seams, hardware screws, and tactile press states while preserving all four live links.
16. **P1 — iframe owned the full viewport and collided with the rail:** Replaced it with the custom two-thirds-height Shadow Comms panel and positioned its desktop entry point 27 pixels below the rendered header.
17. **P2 — missing chat identity:** Added distinct generated pilot and Shadow robot portraits to every message row and the comms title plate.
18. **P2 — mobile quick prompts overflowed:** Replaced the horizontal suggestion scroller with wrapped controls; the document and panel widths now remain below the 390-pixel viewport.
19. **Post-fix evidence:** `/tmp/retro-console-shadow-comparison.png` shows the selected header reference, closed retro-console implementation, and a completed custom Shadow exchange.
20. **Requested icon-only key faces:** Removed both layers of visible button copy while retaining the icons in their original positions, the retro hardware, hover lamps, live destinations, and accessible names.
21. **Requested safe radar motion:** Added a pointer-inert animated route overlay and pulsing origin beacon entirely inside the existing radar viewport. The raster map, module bounds, header layout, scroll handoff, and thrust control remain unchanged.
22. **Post-fix evidence:** `/tmp/icon-only-radar-comparison.png` shows the labeled and icon-only header states at the same 1280 × 720 viewport.

## Functional verification

- The four SVG navigation keys link to Home, Work, About, and Contact.
- Hovering each navigation key changes only its associated blue status light to yellow with a matching glow.
- The SVG Shadow screen opens and closes the chat panel with pointer and keyboard handling.
- The detached yellow menu control opens and closes the staggered menu after entering the top-right.
- AUX THRUST exposes `role="slider"`, a zero-to-100 range, a live value label, Arrow key adjustment, Home/End support, click positioning, and pointer dragging.
- Resting thrust preserves speed 0.5 and maximum thrust maps only speed to 4.5. Continuous delta-time integration guarantees that changing speed advances from the current field position instead of seeking.
- Browser drag reached 99% thrust, left `window.getSelection()` empty, and kept exactly one hero canvas mounted.
- At `scrollY: 120`, the rail remained at y 12 and the menu stayed hidden after a 700ms wait, confirming that transforms no longer scrub with scroll.
- Crossing to `scrollY: 170` first placed the rail at y 25.74 during its bounce, then completed autonomously with the rail at y -208 and menu at y 20.
- Crossing back to `scrollY: 150` reversed the active timeline and restored the rail to y 12 while hiding the menu.
- The latest pass completed both directions within a 1.1-second browser sampling window; the rail reached opacity zero and the menu reached opacity one after crossing downward, then returned to the inverse state after crossing upward.
- At 1280 × 720, the destination radar is visible inside a 213.18 × 108.43 CSS-pixel box, matching the previous identity module footprint without increasing the overall rail size.
- At 390 × 844, Ask Shadow occupies x 20–137.20 and the menu occupies x 312.41–370; they do not overlap, and the menu is in the higher stacking layer.
- Browser logs contain no error-level entries after loading the radar asset and exercising both directions of the trigger animation.
- TDD evidence: the radar replacement and shorter 0.68/0.65-second phase assertions failed before implementation, then passed after the asset and refined timeline were added.
- Custom chat verification: the old iframe is absent, the floating dialog opens and closes from both Shadow triggers, the quick mission prompt posts a user message, the server returns Meridian/Cortex/Cortana in local mode, and the status changes from UPLINK STANDBY to LOCAL NAV MODE.
- The `/api/shadow` route validates empty and oversized input, keeps the optional Dify chat key server-side, carries conversation IDs forward, surfaces upstream errors, and uses an explicit local-mode response when unconfigured.
- TDD evidence for this pass: retro-key structure, custom-chat dimensions and wiring, local query validation, mission-intent routing, and mobile wrapping assertions each failed before their corresponding implementation and passed afterward.
- Latest TDD and browser evidence: icon-only source assertions and radar motion/reduced-motion assertions failed before implementation, then passed; live computed styles confirmed both radar animations advance without console errors.

## Follow-up polish

- P3: the reference includes a more elaborate right-side lever and denser vent detailing. The SVG keeps those details simplified to protect clarity at the 1280px breakpoint.

final result: passed
