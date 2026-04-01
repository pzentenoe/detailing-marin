```markdown
# Design System Specification: Premium Eco-Luxe Automotive

## 1. Overview & Creative North Star
**Creative North Star: The Hydro-Botanical Canvas**

This design system is not merely a tool for utility; it is a digital expression of precision, rejuvenation, and environmental stewardship. We are moving away from the "industrial" feel of traditional automotive services and toward a "high-end editorial" experience. 

The aesthetic centers on **The Hydro-Botanical Canvas**—a concept where the fluidity of water meets the structure of nature. We achieve this through "Organic Precision": a layout style that favors generous white space, intentional asymmetry, and overlapping elements that mimic the way light reflects off a freshly polished car. This system rejects the rigid, boxy constraints of standard web grids in favor of a layered, breathable interface that feels as clean as the vehicles the service produces.

---

## 2. Colors & Tonal Architecture
The palette is rooted in the deep vitality of botanical greens and the refreshing clarity of aquatic mists.

### The Color Tokens
*   **Primary Identity:** The "Leaf Green" (`primary_container`: `#2D5A27`) serves as our anchor, used for moments of high brand authority.
*   **Secondary Accents:** The "Mint" (`secondary_container`: `#C6E9E8`) and "Sage" tones represent the eco-friendly cleaning agents and water-based technology.
*   **Neutral Base:** Our "Crisp White" (`surface`: `#F8FAFB`) provides the high-contrast backdrop required for an ultra-clean feel.

### Creative Directives
*   **The "No-Line" Rule:** Explicitly prohibit the use of 1px solid borders to section off content. Boundaries must be defined solely through background color shifts. For example, a `surface_container_low` section should sit against a `surface` background to create a soft, sophisticated transition.
*   **Surface Hierarchy & Nesting:** Treat the UI as physical layers of fine paper. Use the `surface_container` tiers (Lowest to Highest) to define importance. An inner card should be `surface_container_lowest` (Pure White) nested inside a `surface_container_low` section to create natural, soft depth.
*   **The "Glass & Gradient" Rule:** For hero sections and primary Call-to-Actions (CTAs), use subtle linear gradients transitioning from `primary` (#154212) to `primary_container` (#2D5A27). For floating navigation or overlays, utilize **Glassmorphism**: semi-transparent surface colors combined with a 12px-16px backdrop blur.

---

## 3. Typography: Editorial Authority
We use **Manrope** to bridge the gap between technical precision and human approachability. 

*   **Display & Headline Scales:** Use `display-lg` (3.5rem) and `headline-lg` (2rem) for high-impact brand statements. These should be set with tight letter-spacing (-0.02em) to feel authoritative and modern.
*   **Body & Labels:** `body-lg` (1rem) is our workhorse. Ensure a generous line-height (1.6) to maintain the "breathable" feel of the system.
*   **Hierarchy:** High-end design lives in the contrast. Pair a very large `display-md` headline with a small, uppercase `label-md` (tracked out to +0.05em) to create a premium, rhythmic layout.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are often too "heavy" for a brand focused on cleanliness. We use **Tonal Layering** to convey elevation.

*   **The Layering Principle:** Instead of shadows, stack surface tiers. A `surface_container_highest` element naturally feels closer to the user than a `surface_container_low` background.
*   **Ambient Shadows:** If a floating element (like a modal) requires a shadow, it must be "Ambient." Use the `on_surface` color at 5% opacity with a very large blur (40px-60px) and a 10px Y-offset. It should feel like a soft glow, not a dark smudge.
*   **The "Ghost Border":** For interactive elements requiring definition (like input fields), use the `outline_variant` token at 20% opacity. This "Ghost Border" provides just enough accessibility without breaking the fluid, borderless aesthetic.

---

## 5. Components

### Buttons
*   **Primary:** A soft-cornered (`md`: 0.75rem) button using the `primary_container` background. On hover, apply a subtle gradient shift.
*   **Secondary:** Use the `secondary_container` (Mint). This should feel "wet" and refreshing.
*   **Tertiary:** No background or border. Use `primary` text with an underline that only appears on hover.

### Input Fields
*   **Style:** Avoid the "white box" look. Use `surface_container_high` as the background with a 12px (`lg`) corner radius.
*   **States:** On focus, the background should shift to `surface_container_lowest` with a 1px "Ghost Border" using the `primary` color at 30% opacity.

### Cards & Lists
*   **Constraint:** Dividers/Lines are strictly forbidden. 
*   **Execution:** Use the Spacing Scale (specifically `8`: 2.75rem) to separate list items. For cards, use a subtle background shift (e.g., `surface_container_low`) and a `xl` (1.5rem) corner radius for a friendly, premium feel.

### Additional Signature Component: The "Hydro-Card"
Specifically for car detailing packages, use a Glassmorphic card with a `secondary_fixed` tint and a heavy backdrop blur. This mimics the look of water on glass and should be used for featured pricing or service tiers.

---

## 6. Do’s and Don'ts

### Do:
*   **Embrace Asymmetry:** Place images of cars slightly off-center or overlapping with typography to break the "template" feel.
*   **Use Generous Padding:** When in doubt, increase the white space. Use the `12` (4rem) and `16` (5.5rem) spacing tokens for section padding.
*   **Tint Your Greys:** Never use pure #000000 or #808080. Always use the `on_surface_variant` (#42493E) which has a hint of sage to keep the palette organic.

### Don't:
*   **No Hard Borders:** Never use 100% opaque, 1px borders to separate content.
*   **No Standard Shadows:** Avoid default CSS box-shadows. They look "cheap" and digital. Use Tonal Layering or Ambient Shadows.
*   **No Clutter:** If a screen feels busy, remove an element rather than shrinking it. This system relies on the luxury of space.

---

## 7. Technical Scales Summary

*   **Corner Radius:** Standardize on `md` (12px/0.75rem) for interactive elements and `xl` (24px/1.5rem) for large containers.
*   **Spacing:** Follow the 0.35rem base unit scale. Use `6` (2rem) for internal component padding and `12` (4rem) for section breathing room.
*   **Contrast:** Ensure all `on_surface` text (#191C1D) maintains a 7:1 ratio against the `surface` background for maximum readability.```