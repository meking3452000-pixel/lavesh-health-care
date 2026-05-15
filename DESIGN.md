---
name: Lavesh Health Care Design System
colors:
  surface: '#f8f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f8f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#edeef0'
  surface-container-high: '#e7e8ea'
  surface-container-highest: '#e1e2e5'
  on-surface: '#191c1e'
  on-surface-variant: '#40484c'
  inverse-surface: '#2e3133'
  inverse-on-surface: '#f0f1f3'
  outline: '#71787d'
  outline-variant: '#c0c7cd'
  surface-tint: '#2a657e'
  primary: '#003345'
  on-primary: '#ffffff'
  primary-container: '#004b63'
  on-primary-container: '#83bad6'
  inverse-primary: '#96ceeb'
  secondary: '#006e0d'
  on-secondary: '#ffffff'
  secondary-container: '#90fb81'
  on-secondary-container: '#00750f'
  tertiary: '#462800'
  on-tertiary: '#ffffff'
  tertiary-container: '#633d07'
  on-tertiary-container: '#dfa96b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bfe8ff'
  primary-fixed-dim: '#96ceeb'
  on-primary-fixed: '#001f2b'
  on-primary-fixed-variant: '#044d65'
  secondary-fixed: '#90fb81'
  secondary-fixed-dim: '#74dd68'
  on-secondary-fixed: '#002201'
  on-secondary-fixed-variant: '#005307'
  tertiary-fixed: '#ffddba'
  tertiary-fixed-dim: '#f5bc7c'
  on-tertiary-fixed: '#2b1700'
  on-tertiary-fixed-variant: '#653e08'
  background: '#f8f9fb'
  on-background: '#191c1e'
  surface-variant: '#e1e2e5'
  cyan-accent: '#00B4D8'
  surface-muted: '#F8FAFC'
  border-light: '#E2E8F0'
  text-main: '#0F172A'
  text-muted: '#64748B'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 80px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system establishes a **Corporate Modern** aesthetic tailored for a premium pharmaceutical catalog. It prioritizes clarity, scientific precision, and user trust. By evolving the existing identity, the system shifts from a dark, dense interface to a light, airy, and clinical environment that emphasizes product efficacy and safety.

The personality is professional yet approachable. It uses generous whitespace to reduce cognitive load—essential for medical information—and employs soft architectural elements to provide a sense of "care" and "humanity" within a technical framework. The visual language balances the clinical nature of healthcare with the high-quality finish of a premium retail experience.

## Colors

The palette is derived from the core brand mark but optimized for digital accessibility and modern "clinical" aesthetics. 

- **Primary Deep Teal:** A darkened version of the logo's blue, used for headings and primary actions to ensure high contrast and a sense of authority.
- **Secondary Vitality Green:** Directly pulled from the logo’s green, used sparingly for success states, health-related highlights, and secondary biological cues.
- **Cyan Accent:** Reserved for interactive highlights and high-energy callouts, bridging the gap between the deep teal and the light background.
- **Neutral Foundation:** A shift to a light mode default using a series of cool slates. This provides a "clean room" feel that allows product photography and medical certifications to stand out.

## Typography

**Manrope** is selected as the primary typeface for its modern, geometric construction that retains a friendly, open feel. Its high legibility at various weights makes it ideal for technical pharmaceutical data.

**Inter** is utilized for utility-driven elements like labels, data tables, and captions. Its neutral, systematic character ensures that functional information is delivered without distraction. 

Hierarchy is established through significant scale shifts and the use of semi-bold weights for headlines to anchor the page. Line heights are kept generous to facilitate comfortable reading of long-form ingredient lists or medical descriptions.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop, centering content within a 1280px container to maintain focus and premium feel. 

- **Grid:** A 12-column system is used for desktop and tablet, collapsing to 1 column for mobile.
- **Rhythm:** An 8px base unit drives all spatial decisions. 
- **Whitespace:** Sections are separated by large "breathing zones" (80px+) to prevent the catalog from feeling cluttered. Product cards are given significant internal padding to emphasize the high-quality nature of the packaging and formulations.
- **Mobile Adaptations:** Margins tighten significantly on mobile devices, but vertical spacing (stacking) remains generous to ensure a comfortable touch-target environment.

## Elevation & Depth

Visual hierarchy is managed through **Tonal Layers** combined with **Ambient Shadows**. 

Surfaces are primarily flat and white, but interactive or floating elements (like product cards) use a "soft lift." This is achieved through extra-diffused, low-opacity shadows (e.g., `0px 10px 30px rgba(0, 75, 99, 0.05)`), subtly tinted with the primary teal to keep the shadow feeling integrated with the brand rather than generic grey.

Secondary depth is created through **Tonal Tiering**, where the background may shift to a very light `surface-muted` (#F8FAFC) to differentiate between the global page and a specific content section or sidebar.

## Shapes

The design system employs a **Rounded** shape language. This softens the clinical edge of the pharmaceutical industry, making the brand feel more caring and wellness-oriented. 

- **Standard Elements:** Buttons, input fields, and small tags use a 0.5rem (8px) radius.
- **Product Cards:** Use a larger `rounded-lg` (16px) radius to create a soft, protective frame around product imagery.
- **Iconography:** Should follow this logic, using rounded terminals rather than sharp points to maintain visual harmony.

## Components

### Buttons
- **Primary:** Solid `primary-color` with white text. High-contrast, 8px corner radius.
- **Secondary:** Outlined with a 1.5px stroke of the primary color.
- **Ghost:** Primary color text with no background, used for low-priority navigation.

### Cards (Product & Category)
Cards are the heart of the catalog. They feature a white background, a soft 16px corner radius, and a subtle ambient shadow. Images should be centered with at least 24px of internal padding.

### Input Fields & Selects
Clean, 8px rounded corners with a `border-light` stroke. On focus, the border transitions to the `cyan-accent` with a soft outer glow (2px) to provide clear feedback.

### Chips & Tags
Used for product categories (e.g., "Vitamin", "Herbal"). These use a pill-shape (fully rounded) with a low-opacity background of the `secondary-color` and dark green text to signify health and natural ingredients.

### Lists & Data Tables
Pharmaceutical specs are displayed in clean tables with horizontal dividers only. Alternating rows may use `surface-muted` for increased readability in long data sets.
