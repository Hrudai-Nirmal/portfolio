# Mission Control Rail Design QA

## Source truth

- Selected concept: Mission Control Rail (option 3)
- Original source: `/Users/hrudainirmal/.codex/generated_images/019ff644-a64e-7702-b2a7-912b3b1d22e1/exec-a88fdcc5-2dcf-4e6c-bb45-258198ca0d04.png`
- Production crop: `/Users/hrudainirmal/Projects/Portfolio/public/mission-control-rail.png`
- Source pixels: 2128 × 739; production crop: 2088 × 500

## Comparison setup

- Local implementation: `http://127.0.0.1:3000/`
- CSS viewport: 1280 × 720 at 1× density
- Browser screenshot: `/tmp/mission-control-rail-live-v2.png` (1274 × 717; browser scrollbar excluded)
- Compared state: hero at the top, menu closed, Shadow chat closed
- Normalization: the 2088 × 500 production source was resized to 1274 × 305; the implementation's top 1274 × 305 region was captured at the same density
- Full-view comparison evidence: `/tmp/mission-control-rail-comparison-v3.png`
- Focused comparison: not required because the rail itself fills both normalized frames and its small labels, icons, screws, cables, borders, and shadows remain readable

## Findings

- No actionable P0, P1, or P2 mismatches remain.
- Fonts and typography: the visible type is retained directly from the selected artwork, including the condensed navigation labels, blue engineering subtitle, and pixel-style Shadow display.
- Spacing and layout rhythm: the identity, four-key navigation bank, and command module retain their original proportions. The implementation intentionally leaves a 2vw responsive safety margin around the fixed rail.
- Colors and visual tokens: cream, charcoal, black, electric blue, purple, and safety yellow are pixel-identical to the selected artwork.
- Image quality and asset fidelity: the selected generated artwork is used directly rather than approximated with CSS shapes; it remains sharp at the verified desktop size.
- Copy and content: Hrudai Nirmal, SOFTWARE ENGINEER · BANGALORE, HOME, WORK, ABOUT, CONTACT, ASK SHADOW, and PRIMARY ACTION match the reference.

## Comparison history

1. **P1 — approximate web-card recreation:** The prior implementation translated the concept into clean HTML cards and omitted the demo's antenna, vents, screws, hazard striping, cables, and illustrated casing. Fix: replaced the approximation with a responsive crop of the selected artwork and mapped semantic controls over the depicted buttons.
2. **P1 — disappearing header:** The prior navigation listened to scroll position and faded/slid the rail away. Fix: removed the scroll listener and hidden state; the rail now remains fixed with its top edge at `0px`, including at `scrollY: 720`.
3. **Post-fix evidence:** `/tmp/mission-control-rail-comparison-v3.png` shows the source above and browser implementation below with matching artwork, proportions, typography, palette, and mechanical detail.

## Functional verification

- Home, Work, About, and Contact are semantic anchor hit areas aligned to the four depicted control keys.
- The purple Ask Shadow screen opens and closes the chat panel.
- The yellow menu plate opens and closes the staggered menu while staying fixed at the top-right of the rail.
- At `scrollY: 720`, the rail remains visible at `top: 0px`.
- Browser logs contain no error-level entries after the navigation, chat, and menu interaction checks.
- TDD evidence: the persistence/configuration tests failed before implementation and passed after the scroll collapse was removed and the selected asset was wired in.

## Follow-up polish

- P3: the 2vw responsive safety margin makes the live rail slightly narrower than an edge-to-edge source crop; this prevents mechanical edge details from being clipped by the viewport.

final result: passed
