# CLAUDE.md — Master Builder 3D Interactive Portfolio & Configurator

## 1. Project Identity & Core Domain
High-creativity 3D spatial portfolio and engineering blueprint laboratory for a Master Builder specializing in:
- Full custom home construction (turnkey residential buildings).
- Specific structural house parts (foundations, load-bearing masonry walls, roof trusses, mansards, monolithic stairs, extensions).
- Custom architectural blueprints and CAD engineering schemes.

## 2. Tech Stack (Strict Versions - 2026 Standard)
- Framework: Next.js 15+ (App Router, TypeScript, strict mode).
- 3D Engine: Three.js (r171+), @react-three/fiber, @react-three/drei.
- Animation Choreography: GSAP 3.13+ (ScrollTrigger, Flip), Tailwind CSS.
- Smooth Scroll & State: zustand (transient state updates without React re-renders).
- Styling: Tailwind CSS + CSS Custom Properties for Tactile Brutalism tokens.

## 3. Non-Negotiable Architectural & Performance Rules
1. SINGLE CANVAS RULE: Mount ONE persistent background/overlay Canvas in the root layout or single canvas viewport.
2. ZERO ALLOCATION IN USEFRAME: Pre-allocate reusable math objects (Vector3, Matrix4, Color, Box3) outside useFrame loops.
3. DRAW CALL BUDGET: Keep mobile draw calls < 100. Any repeating geometry (bricks, tiles, rebar) MUST use THREE.InstancedMesh.
4. SCROLL CLEANUP & MOTION SAFETY: Wrap GSAP animations safely. Respect `prefers-reduced-motion: reduce`.
5. PROGRESSIVE ENHANCEMENT & SEO: Every metric, floor plan dimension (m²), service area, and phone number MUST exist in semantic HTML (h1-h6, dl, JSON-LD) outside the canvas.

## 4. Visual Tokens (Tactile Brutalism & Living Blueprint)
- `--bg-stone-paper`: `#F4F0DB`
- `--bg-obsidian-cad`: `#14181D`
- `--text-graphite`: `#262626`
- `--accent-terracotta`: `#C85A32`
- `--accent-blueprint`: `#1E3A5F`
- `--accent-forest`: `#2E3A26`
