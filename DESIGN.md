```markdown
# Design System Document

## 1. Overview & Creative North Star: "The Neon Terminal"

This design system is a high-performance visual framework built to mirror the raw speed and technical precision of a high-end download manager. Our Creative North Star is **"The Neon Terminal"**—an aesthetic that bridges the gap between a 1980s mainframe and a futuristic cyber-deck. 

We reject the "softness" of modern SaaS. Here, we embrace **intentional sharpness**, **high-contrast glowing surfaces**, and **asymmetric editorial layouts**. By utilizing a 0px border radius across the entire system, we create a sense of structural rigidity and technical "un-designed" authenticity. The UI is not just a portal; it is a high-performance instrument.

---

## 2. Colors & The Spectral Void

The palette is rooted in a `surface-dim` (#110924) that simulates the infinite depth of a CRT monitor. 

### The Palette
*   **Primary (Neon Cyan):** `#c1fffe` (Primary) / `#00ffff` (Container). Use for critical success states and primary CTAs.
*   **Secondary (Neon Magenta):** `#ff51fa` (Secondary) / `#a900a9` (Container). Use for accents, "hot" download areas, and high-impact hero elements.
*   **Tertiary (Acid Lime):** `#e9ffba`. Reserved for technical highlights and "Completed" statuses.

### The "No-Line" Rule
Traditional 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined through background color shifts. For instance, a `surface-container-low` section should sit against a `surface` background to define its edge. 

### Surface Hierarchy & Nesting
Treat the UI as a series of technical modules.
*   **Level 0 (Background):** `surface` (#110924).
*   **Level 1 (Sectioning):** `surface-container-low`.
*   **Level 2 (Cards/Modules):** `surface-container-high`.
Each inner container should use a slightly higher tier to define importance through tonal depth rather than structural lines.

### The "Glass & Gradient" Rule
To elevate the "Synthwave" feel, floating elements (like tooltips or platform selection chips) must utilize **Glassmorphism**. Use `secondary-container` at 20% opacity with a `20px` backdrop-blur. For hero CTAs, apply a linear gradient from `primary` to `primary-dim` at a 135-degree angle to provide visual "soul."

---

## 3. Typography: Editorial Tech

We use a high-contrast pairing to balance marketing impact with technical density.

*   **Display, Headlines & Technical Body (JetBrains Mono):** We use JetBrains Mono across the entire system to maintain a unified "Terminal" identity. Its high-performance rhythm feels deliberate and engineered, bridging the gap between branding and metadata. Use `display-lg` (3.5rem) for hero sections with tight letter-spacing (-0.02em).Every piece of metadata, download speed, and body paragraph must be rendered in JetBrains Mono.

---

## 4. Elevation & Depth: Tonal Layering

We do not use standard material shadows. Depth is achieved through **Tonal Layering** and **Light Leaks**.

*   **The Layering Principle:** Stack `surface-container-lowest` cards on a `surface-container-low` section. This creates a soft, natural lift without the need for an artificial shadow.
*   **Ambient Glows:** When a "floating" effect is required, shadows must be replaced with "Glows." Use the `primary` or `secondary` token at 10% opacity with a large blur (40px+) to simulate the light emission of a neon tube.
*   **The "Ghost Border" Fallback:** If a container requires definition against a complex background, use a **Ghost Border**: `outline-variant` at 15% opacity.
*   **Scanline Overlay:** Apply a global fixed-position PNG overlay of horizontal scanlines at 3% opacity to the entire viewport to ground the digital experience in "Retro-Tech" reality.

---

## 5. Components

### High-Impact Hero Section
*   **Layout:** Asymmetric. Use `display-lg` text aligned left, with a `secondary` glowing "S" logo element overlapping the text container.
*   **Visual:** Background should utilize a subtle gradient transition from `surface` to `surface-bright`.

### Feature Grids (Technical Specs)
*   **Card Style:** `surface-container-highest` background, 0px border radius.
*   **Header:** `label-md` in `tertiary` (Acid Lime) to mimic terminal code comments (e.g., `// MULTI-THREADED_ENGINE`).
*   **Spacing:** Use `spacing-6` (2rem) for internal padding.

### Download Cards (Multi-Platform)
*   **Variants:** 
    *   *Prebuilt (Primary):* Solid `primary-container` background with `on-primary` text.
    *   *AUR/Homebrew (Secondary):* Ghost Border (`outline-variant` at 20%) with `JetBrains Mono` mono-text.
*   **Forbid Dividers:** Do not use lines between "Version" and "Size" info. Use `spacing-4` (1.4rem) of horizontal gap to create separation.

### Buttons
*   **Primary:** Sharp 0px corners, `primary-container` fill. On hover, add a `primary` outer glow (15px blur).
*   **Tertiary (Support/Social):** No background. Underline text using a 2px `secondary` border-bottom with a `4px` offset.

### Input Fields (Terminal Style)
*   **Style:** `surface-container-lowest` fill, `outline` bottom-border only (2px).
*   **Active State:** Border shifts to `primary` with a subtle `primary` glow.

---

## 6. Do's and Don'ts

### Do:
*   **Use Monospace for Numbers:** Always use JetBrains Mono for download speeds, file sizes, and percentages.
*   **Embrace Asymmetry:** Offset grid items by `spacing-2` to create a "glitch" in the visual order.
*   **Keep it Sharp:** Ensure every corner is 0px. Even a 2px radius breaks the "Terminal" immersion.

### Don't:
*   **Don't use Grey:** If you need a neutral, use `surface-variant` or `on-surface-variant` (tinted purples). True grey feels "default" and "cheap."
*   **Don't use Standard Shadows:** Avoid dark, muddy shadows. If an element needs to pop, give it a Neon Glow or a Tonal Shift.
*   **Don't use Dividers:** Never use a 1px line to separate list items. Use background-color alternating (zebra striping) with `surface-container-low` and `surface-container-high`.

---

## 7. Accessibility Note
While the "High-Contrast" synthwave look is prioritized, ensure all `on-surface` text meets WCAG AA standards against their respective `surface` containers. Use `error_dim` (#d7383b) for critical alerts to ensure visibility against the deep purple void.```