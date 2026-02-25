# Specification

## Summary
**Goal:** Reposition the OwnerPhoto floating widget to the bottom-right corner of the viewport, placed directly above the FloatingWhatsApp button so both are visible without overlap.

**Planned changes:**
- Change the OwnerPhoto widget positioning to `fixed`, anchored to the bottom-right corner (e.g., `bottom-24 right-4`)
- Ensure vertical separation between the OwnerPhoto widget and the FloatingWhatsApp button so they do not overlap
- Keep the circular photo, glow ring, and name label intact and fully visible

**User-visible outcome:** The owner photo widget appears fixed at the bottom-right corner of the screen on all device sizes, sitting just above the WhatsApp button, with both elements clearly visible and separated.
