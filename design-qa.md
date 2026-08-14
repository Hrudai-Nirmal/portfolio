# Mission Control SVG Header Design QA

## Source truth

- Selected concept: Mission Control Rail (option 3)
- Reference image: `/Users/hrudainirmal/.codex/generated_images/019ff644-a64e-7702-b2a7-912b3b1d22e1/exec-a88fdcc5-2dcf-4e6c-bb45-258198ca0d04.png`
- Source pixels: 2128 × 739
- Implementation: interactive SVG in `/Users/hrudainirmal/Projects/Portfolio/src/components/SpaceshipHeader.tsx`; the reference image is not shipped or rendered by the site

## Comparison setup

- Local implementation: `http://127.0.0.1:3000/`
- CSS viewport: 1280 × 720 at 1× density
- Browser screenshots: `/tmp/mission-control-thrust-rest.png` and `/tmp/mission-control-thrust-max.png` (1274 × 717; browser scrollbar excluded)
- Rendered SVG bounds: 842.23 × 126.33 CSS pixels at x 215.88, y 12
- Compared state: hero at the top, menu closed, Shadow chat closed
- Normalization: reference focus crop resized to 842 × 140 and centered above the implementation's 1274 × 150 top region, matching the user-requested 70% rail scale
- Reference and control-state comparison: `/tmp/mission-control-thrust-comparison.png`
- Compact screenshot: `/tmp/mission-control-svg-compact.png` at a 390 × 844 CSS viewport
- A separate micro-crop was unnecessary because both normalized frames keep the name, navigation labels, Shadow display, status copy, screws, and hazard stripe legible

## Findings

- No actionable P0, P1, or P2 mismatches remain.
- The 70% desktop scale is an intentional user-directed refinement; the SVG rail remains centered while the detached compact menu owns the top-right after the handoff.
- The AUX THRUST control keeps the reference's yellow hardware accent and now exposes a real horizontal range, live percentage readout, and red-to-yellow knob state without changing the rail's silhouette.
- Maximum thrust visibly lengthens, brightens, and accelerates the Lightfall streaks while preserving the hero's content contrast and legibility.
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
8. **Post-fix evidence:** `/tmp/mission-control-thrust-comparison.png` shows the reference above and the resting/maximum implementation states below.

## Functional verification

- The four SVG navigation keys link to Home, Work, About, and Contact.
- Hovering each navigation key changes only its associated blue status light to yellow with a matching glow.
- The SVG Shadow screen opens and closes the chat panel with pointer and keyboard handling.
- The detached yellow menu control opens and closes the staggered menu after entering the top-right.
- AUX THRUST exposes `role="slider"`, a zero-to-100 range, a live value label, Arrow key adjustment, Home/End support, click positioning, and pointer dragging.
- Resting thrust preserves the original Lightfall parameters. Maximum thrust maps to speed 4.5, streak length 10, and glow 0.5, producing the visibly stronger warp field in `/tmp/mission-control-thrust-max.png`.
- Lightfall updates those three uniforms in place; browser verification kept exactly one hero canvas throughout the interaction.
- At desktop sizes, the header moves down 18px before accelerating to y -220 while the compact menu enters from y -112 over the first 240px of scroll.
- Forward and reverse samples at `scrollY: 120` produced identical rail and menu transform, opacity, and visibility values, confirming frame-exact reversal.
- At `scrollY: 240`, the rail is hidden above the viewport and the compact menu is visible at x 1202.41, y 20; it remains fixed through later sections.
- At 390 × 844, Ask Shadow occupies x 20–137.20 and the menu occupies x 312.41–370; they do not overlap, and the menu is in the higher stacking layer.
- Browser logs contain no error-level entries after keyboard, drag, maximum-thrust, and reset checks.
- TDD evidence: the thrust mapping, cross-component wiring, live-uniform, accessibility, and reliable-drag tests failed before their implementations, then passed after each behavior was added.

## Follow-up polish

- P3: the reference includes a more elaborate right-side lever and denser vent detailing. The SVG keeps those details simplified to protect clarity at the 1280px breakpoint.

final result: passed
