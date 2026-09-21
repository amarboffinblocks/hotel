---
name: Hospitality Editorial
colors:
  surface: '#fbf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#fbf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ef'
  surface-container: '#efeeea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c1a'
  on-surface-variant: '#424844'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f0ed'
  outline: '#727974'
  outline-variant: '#c1c8c2'
  surface-tint: '#466556'
  primary: '#032217'
  on-primary: '#ffffff'
  primary-container: '#1a382b'
  on-primary-container: '#81a291'
  inverse-primary: '#adcebc'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#321514'
  on-tertiary: '#ffffff'
  tertiary-container: '#4b2928'
  on-tertiary-container: '#bf8f8d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c8ead7'
  primary-fixed-dim: '#adcebc'
  on-primary-fixed: '#022115'
  on-primary-fixed-variant: '#2f4d3f'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#ffdad8'
  tertiary-fixed-dim: '#eebab7'
  on-tertiary-fixed: '#301312'
  on-tertiary-fixed-variant: '#623d3b'
  background: '#fbf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2de'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '500'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  space-1: 4px
  space-2: 8px
  space-3: 16px
  space-4: 24px
  space-5: 32px
  space-6: 48px
  space-7: 64px
  space-8: 96px
---

## Brand & Style

This design system embodies an editorial, luxurious, and warm hospitality aesthetic. The target audience consists of discerning travelers and patrons seeking curated, high-end experiences, boutique accommodations, and fine dining. 

The UI evokes feelings of calm exclusivity, effortless elegance, and deep tactile comfort. It rejects sterile minimalism in favor of a warm, literary-inspired visual narrative that prioritizes atmosphere and sensory engagement.

### Design Style
We utilize a refined variant of **Minimalism infused with editorial warmth**. This style is characterized by generous whitespace, high-contrast serif typography paired with neutral grotesque sans-serifs, and delicate borders. Depth is suggested through soft ambient shadows and layered tonal surfaces rather than heavy decoration.

## Colors

The color palette anchors the user in a serene, natural environment. The background is set to a warm ivory cream, providing a soft canvas that reduces eye strain and feels distinctly physical. 

- **Primary (Deep Forest Green):** Used for primary actions, prominent headers, and grounding anchors to establish a luxurious, established tone.
- **Secondary (Muted Luxury Gold):** Applied sparingly for delicate accents, active states, and editorial highlights.
- **Neutral (Warm Ivory Cream & White):** Used for surfaces, cards, and structural separation.
- **Text & Secondary Text:** Dark charcoal provides high-legibility contrast without the harshness of pure black, while warm gray handles secondary metadata and captions.

## Typography

Typography bridges timeless editorial sophistication with modern legibility. Headlines employ high-end serifs (`Playfair Display`) with generous line heights and subtle negative tracking on larger display sizes to mimic high-end print magazines. 

Body and functional labels utilize a clean, soft sans-serif (`Plus Jakarta Sans`) to ensure frictionless reading across digital viewports. Uppercase tracking is applied to small labels and category tags to enhance the bespoke, curated feel.

## Layout & Spacing

We employ a **fluid grid layout** designed to give content ample room to breathe. Generous whitespace is a primary design pillar, communicating exclusivity and calm. 

- **Breakpoints:** Mobile (< 768px), Tablet (768px – 1024px), Desktop (> 1024px).
- **Margins:** Outer margins scale dynamically from 20px on mobile to 64px (or greater) on desktop viewports.
- **Rhythm:** Spacing follows an 8px foundational scale, heavily favoring larger multipliers (32px, 48px, 64px) between distinct content sections to create a relaxed, editorial reading flow.

## Elevation & Depth

Depth is communicated subtly to maintain a clean, flat-adjacent editorial aesthetic. We avoid heavy drop shadows or hard black borders. 

- **Surface Tiers:** Background surfaces sit at the base level (`#FBF9F5`), while interactive cards and floating navigation bars utilize crisp white (`#FFFFFF`) or soft cream surfaces.
- **Ambient Shadows:** Shadows are extra-diffused, low-opacity, and tinted with faint traces of the primary forest green or warm gray (`rgba(26, 56, 43, 0.06)`). 
- **Outlines:** Subtle beige/gray borders (`#E5E0D8`) define boundaries where shadows are omitted, preserving a clean, paper-like quality.

## Shapes

The shape language is gently rounded, avoiding harsh 90-degree angles to maintain an inviting, warm atmosphere. 

- **Base Radius:** Standard interactive elements, inputs, and small containers use a moderate 0.5rem (8px) radius.
- **Large Elements:** Image cards, modal containers, and hero blocks utilize generous rounded corners (1rem to 1.5rem) to frame photography and editorial content like fine art prints.

## Components

### Buttons
- **Primary:** Deep forest green background (`#1A382B`) with ivory text, medium weight, 8px border radius, and generous horizontal padding. On hover, shifts slightly darker with a subtle ambient shadow.
- **Secondary / Outline:** Transparent fill with a subtle beige/gray border (`#E5E0D8`) and dark charcoal text. Hover states introduce a light cream background tint.
- **Text Button:** Clean sans-serif with a bottom underline that animates inward on hover, accented in luxury gold (`#C5A059`).

### Input Fields
- Soft cream or pure white fill, framed by a 1px subtle beige/gray border. Focus states transition the border to deep forest green with a zero-spread soft ring. Labels float cleanly above or reside comfortably inside with warm gray placeholder text.

### Cards
- Large rounded image cards feature prominent corner radiuses (16px–24px) with edge-to-edge photography at the top. Typography sits below with generous padding, pairing a serif title with a muted gold category tracker and dark charcoal body snippet.

### Chips & Tags
- Pill-shaped or softly rounded micro-elements used for amenities, categories, or status indicators. Utilizes light tonal backgrounds (tinted cream-green) with dark charcoal or forest green text.

### Checkboxes & Radio Buttons
- Custom-styled square (checkbox) and circular (radio) indicators featuring thin forest green borders. Checked states fill with solid forest green and a refined white checkmark or inner dot.

### Recommended Additional Components
- **Editorial Callout / Quote:** Full-width or centered blocks featuring oversized italicized serif typography flanked by subtle gold quotation marks for guest testimonials or philosophy statements.
- **Date / Itinerary Picker:** A specialized horizontal calendar component styled like a classic booking ledger, utilizing high-contrast serif numerals for dates.