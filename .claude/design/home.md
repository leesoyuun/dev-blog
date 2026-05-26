# Blueprint Azure Design System

### 1. Overview & Creative North Star
**Creative North Star: The Digital Architect**
Blueprint Azure is a high-end editorial system designed for deep technical storytelling. It moves away from the "standard blog" aesthetic by treating the screen as a canvas for structural clarity and rhythmic spacing. It prioritizes the "Architecture of Information" through extreme typographic contrast, a surgical primary blue, and a layout that breathes through intentional whitespace and asymmetric sidebars.

### 2. Colors
Blueprint Azure uses a high-fidelity palette centered around its signature `#0066ff` Electric Blue.

*   **Primary:** Used for focus actions, progress indicators, and navigational "anchors."
*   **Surface Hierarchy:** 
    *   **Surface (White):** The base layer for reading.
    *   **Surface Container Low (#F9FAFB):** Used for large background sections like footers.
    *   **Surface Container (#F3F4F6):** Used for interactive widgets and sidebar containers.
*   **The "No-Line" Rule:** Sectioning is achieved through shifts in background color (e.g., White to #F3F4F6) or generous whitespace. Avoid 1px solid borders for layout separation unless specifically used for the "Table of Contents" markers.
*   **The Glass & Gradient Rule:** Header navigation utilizes a `backdrop-blur-md` with 80% opacity to maintain context while scrolling. Main hero elements should feature a gradient (Primary to Purple-600) with a `mix-blend-overlay` to add depth.

### 3. Typography
The system utilizes **Inter** across all roles, but differentiates through extreme weight and scale shifts.

*   **Display (4.5rem/72px):** Used for hero keywords within imagery, set at high opacity (20%) to act as a texture.
*   **Headline 1 (2.25rem - 3.75rem):** "Black" weight (900) with a tight `leading-[1.1]`. This is the visual anchor.
*   **Headline 2 (1.875rem):** Bold (700) for section breaks, paired with significant top margins (2.5rem).
*   **Body (1.125rem):** Specifically chosen for long-form readability. A line-height of `1.8` ensures an airy, editorial feel.
*   **Label/Metadata (0.875rem):** Semi-bold for authors, Medium for navigation.

### 4. Elevation & Depth
Elevation in Blueprint Azure is communicated through light and shadow rather than heavy lines.

*   **The Layering Principle:** Content sits on `surface`, while secondary tools sit on `surface-container`.
*   **Ambient Shadows:**
    *   **Shadow-sm:** Applied to interactive buttons and chips to provide a subtle "clickability" cue.
    *   **Shadow-2xl:** Applied to primary media/featured images, often combined with a tinted glow (e.g., `shadow-blue-500/10`) to simulate atmospheric lighting.
*   **The "Ghost Border" Fallback:** In dark mode or specific code-blocks (#1a202c), use a subtle `border-gray-800` to define edges without creating visual noise.

### 5. Components
*   **Buttons:** Standard buttons are `rounded-lg` (8px) with a semi-bold weight. The Primary button uses a subtle `shadow-sm` and high-contrast text.
*   **Chips/Indicators:** Used for "Series" markers or step indicators. These are circular and utilize the Primary background to denote the active state.
*   **Code Blocks:** Set in a dark, high-contrast container (#1a202c) with rounded corners and a monospace font, distinct from the editorial body.
*   **Progress Bar:** A "Reading Progress" bar at the top of the viewport (4px height) in the Primary color provides a persistent functional anchor.
*   **Blockquotes:** A signature element featuring a 4px Primary left border and a font size increase to 1.25rem for emphasis.

### 6. Do's and Don'ts
*   **Do:** Use extreme padding (e.g., `py-12 lg:py-20`) to create an editorial rhythm.
*   **Do:** Maintain a strict vertical rhythm in the sidebar, using `sticky` positioning for secondary navigation.
*   **Don't:** Use generic grey text for body content. Use a sophisticated off-black (#111827) for readability.
*   **Don't:** Over-round elements. Use the `rounded-lg` (8px) standard for a modern, architectural feel rather than a "bubbly" consumer look.