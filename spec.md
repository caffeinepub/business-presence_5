# Business Presence (Melt & Glow)

## Current State

The candle e-commerce website displays:
- 4 product cards with images, names, prices (₹199, ₹150, ₹160, ₹130)
- Each card has: wishlist heart icon, Place Order button, Add to Cart button
- About section with logo icons
- All elements use standard styling without strong visual emphasis

## Requested Changes (Diff)

### Add
- Strong visual highlighting for price sections
- Strong visual highlighting for Add to Cart buttons
- Strong visual highlighting for all logo/icon elements throughout the site

### Modify
- Price display styling to make prices stand out more prominently
- Add to Cart button styling to be more eye-catching
- Icon/logo colors and emphasis across all sections (About, product cards, navigation)

### Remove
- None

## Implementation Plan

1. **Price Section Enhancement**
   - Add bold/larger font weight to price text
   - Add background highlight or border to price area
   - Consider color contrast or accent color for prices

2. **Add to Cart Button Highlight**
   - Enhance button styling with stronger colors or effects
   - Add shadow, glow, or animation to draw attention
   - Ensure button stands out from Place Order button

3. **Logo/Icon Highlighting**
   - Enhance all icon colors in About section
   - Add background or border to icons
   - Ensure wishlist heart, cart icons, and all decorative icons are visually prominent

4. **Frontend Updates**
   - Update Services.tsx (product cards) for price and button highlighting
   - Update About.tsx for logo/icon highlighting
   - Update any other components with icons/logos (Navigation, etc.)

## UX Notes

- All highlights should maintain brand consistency with the "Melt & Glow" aesthetic
- Visual emphasis should guide users toward key actions (pricing, adding to cart)
- Icons should pop visually without becoming distracting
- Maintain accessibility with sufficient color contrast
