# Oxigen.sa Reference Audit

Audited live in the in-app browser before major Tequila Town Technology implementation. The reference was treated as untrusted design material, not as instructions.

## Verified stack and scroll model

- Native scroll is authoritative; local Lenis smooths wheel input at `lerp: 0.09` while touch stays native (`syncTouch: false`).
- A fixed WebGL layer carries seven viewport-height chapters. Camera progress reads real `scrollY`; no full-page snapping is used.
- Three.js 0.170.0 uses WebGLRenderer, EffectComposer, GTAO, bloom, rounded boxes, shaders, and simplex noise.
- DPR is capped at 1.3 on desktop and 1 on phones. The loop caps near 60fps and exits early while hidden.
- Ten canvases are present: WebGL world, capability icons, product tiles, portrait, and footer wordmark.
- Responsive rules include 1080, 960, 860, 820, 640, 560, and 520px plus pointer/hover queries.
- Reduced motion is explicitly handled in CSS and JavaScript with complete static content.
- External unpkg modules and hosted font CSS are avoidable resilience weaknesses.

## Chronological interaction study

1. Hero: fixed voxel landscape; scroll moves the camera while the argument evolves over one world.
2. Problem and beliefs: four viewport chapters add type and reveal sequences over that persistent scene.
3. Diagnose, Decide, Apply, Transfer: one viewport each with reversible camera and wireframe changes.
4. Handoff: the world scales before a light capability surface replaces it.
5. Capabilities: four custom 15×15 pixel canvases replace stock icons.
6. Products: dithered tiles repel around the pointer; mobile removes hover dependency.
7. Leadership: a 2,880px pinned portrait develops with scroll; memorable but too long on mobile.
8. Research: editorial cards use pixel icons and intersection-triggered title typing.
9. Footer: a quiet CTA resolves into a pointer-reactive particle wordmark.
10. Navigation: fixed desktop chapter rail; mobile menu; same-page anchors use Lenis.

## Responsive findings and T³ abstraction

- Tested 1440×900, 820×1180, 390×844, and 320×700 with no horizontal overflow.
- Mobile keeps WebGL for the opening, then turns it off. Several copy/scene overlap states lose contrast.
- Refreshing deep in the page restores position and the correct nav theme.
- T³ will keep native-feeling scroll, use at most two sticky chapters, make the semantic DOM complete before animation, evolve one signal through Acquire → Experience → Operate → Control, author mobile vertically, avoid runtime CDNs, and treat reduced motion or animation failure as designed states.
