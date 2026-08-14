# Mission Control SVG Header Design QA

## Source truth

- Selected concept: Mission Control Rail (option 3)
- Reference image: `/Users/hrudainirmal/.codex/generated_images/019ff644-a64e-7702-b2a7-912b3b1d22e1/exec-a88fdcc5-2dcf-4e6c-bb45-258198ca0d04.png`
- Source pixels: 2128 × 739
- Implementation: interactive SVG in `/Users/hrudainirmal/Projects/Portfolio/src/components/SpaceshipHeader.tsx`; the reference image is not shipped or rendered by the site

## Comparison setup

- Local implementation: `http://127.0.0.1:3000/`
- CSS viewport: 1280 × 720 at 1× density
- Browser screenshots: `/tmp/mission-control-trigger-restored.png` and `/tmp/mission-control-trigger-menu.png` (1274 × 717; browser scrollbar excluded)
- Rendered SVG bounds: 842.23 × 126.33 CSS pixels at x 215.88, y 12
- Compared state: hero at the top, menu closed, Shadow chat closed
- Normalization: reference focus crop resized to 842 × 140 and centered above the implementation's 1274 × 150 top region, matching the user-requested 70% rail scale
- Reference and trigger-state comparison: `/tmp/mission-control-trigger-comparison.png`
- Compact screenshot: `/tmp/mission-control-svg-compact.png` at a 390 × 844 CSS viewport
- A separate micro-crop was unnecessary because both normalized frames keep the name, navigation labels, Shadow display, status copy, screws, and hazard stripe legible

## Findings

- No actionable P0, P1, or P2 mismatches remain.
- The 70% desktop scale is an intentional user-directed refinement; the SVG rail remains centered while the detached compact menu owns the top-right after the handoff.
- The AUX THRUST control keeps the reference's yellow hardware accent and now exposes a real horizontal range, live percentage readout, and red-to-yellow knob state without changing the rail's silhouette.
- Thrust changes only the rate of the existing Lightfall field. Streak length, glow, geometry, and hero contrast remain unchanged as requested.
- Fonts and typography: heavy sans-serif identity text, condensed monospace navigation labels, blue engineering subtitle, and purple terminal display preserve the reference hierarchy and optical weight.
- Spacing and layout rhythm: the identity, four-key navigation bank, and command housing retain the reference's three-module sequence, connected spine, thick chassis, inset panels, rounded corners, and fixed top placement.
- Colors and visual tokens: cream, near-black, charcoal, electric blue, purple, red, and safety yellow match the source art direction with high-contrast outlines and flat neo-brutalist shadows.
- Image quality and asset fidelity: at the user's explicit direction, the implementation is responsive vector markup rather than a raster image. It stays sharp at all desktop densities and exposes each control as a semantic target.
- Copy and content: Hrudai Nirmal, SOFTWARE ENGINEER · BANGALORE, HOME, WORK, ABOUT, CONTACT, ASK SHADOW, and PRIMARY ACTION preserve the selected reference; AUX THRUST and THRUSTER READY identify the requested replacement control.

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
10. **P2 — scrubbed header handoff:** Header/menu transforms previously followed every scroll pixel. Fix: crossing 160px now plays a 1.46-second timeline; crossing upward reverses it from its current position.
11. **Post-fix evidence:** `/tmp/mission-control-trigger-comparison.png` shows the selected reference above and the triggered header/menu states below.

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
- At 390 × 844, Ask Shadow occupies x 20–137.20 and the menu occupies x 312.41–370; they do not overlap, and the menu is in the higher stacking layer.
- Browser logs contain no error-level entries after thrust dragging and both directions of the trigger animation.
- TDD evidence: continuous-time, selection suppression, single-point trigger, slower timing, and reversible playback tests failed before their implementations, then passed after each behavior was added.

## Follow-up polish

- P3: the reference includes a more elaborate right-side lever and denser vent detailing. The SVG keeps those details simplified to protect clarity at the 1280px breakpoint.

final result: passed
