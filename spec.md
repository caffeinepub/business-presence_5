# Specification

## Summary
**Goal:** Reposition the owner photo floating widget from the bottom-right corner to the top-right corner of the viewport.

**Planned changes:**
- Update the fixed positioning in `OwnerPhoto.tsx` to anchor the widget to the top-right corner (e.g., `top-4 right-4` instead of bottom-right)
- Adjust z-index as needed to ensure the widget remains visible above page content without overlapping the Navigation bar's interactive elements

**User-visible outcome:** The owner photo widget with circular photo, glow ring, and name label appears in the top-right corner of the screen on all pages, while the FloatingWhatsApp button remains unchanged in the bottom-right corner.
