# Design Guidelines: DevComm - Mobile Developer Communication Tool

## Design Approach
**System-Based Approach** using Linear's efficiency principles combined with Material Design's mobile patterns. This utility-focused tool prioritizes clarity, speed, and mobile usability over visual flair.

**Core Principles:**
- Mobile-first responsive design
- Information density without clutter
- Touch-friendly interactions (48px minimum touch targets)
- Instant data accessibility
- Streamlined navigation

---

## Typography System

**Font Family:** Inter (Google Fonts) - exceptional readability on small screens

**Hierarchy:**
- Page Titles: text-2xl font-semibold (mobile), text-3xl (desktop)
- Section Headers: text-lg font-semibold
- Card Titles: text-base font-medium
- Body Text: text-sm (mobile), text-base (desktop)
- Metadata/Timestamps: text-xs font-medium opacity-70
- Labels: text-xs font-semibold uppercase tracking-wide

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8 (p-2, m-4, gap-6, py-8)

**Mobile Layout (Primary):**
- Single column stack
- Full-width cards with rounded-lg borders
- Consistent px-4 horizontal padding
- py-6 section spacing
- Bottom navigation bar (fixed, h-16)

**Desktop Layout:**
- Sidebar navigation (w-64, fixed left)
- Main content area (max-w-5xl mx-auto px-8)
- Two-column grid for dashboard cards (grid-cols-2)

---

## Component Library

### Navigation
**Mobile Bottom Bar:**
- Fixed bottom navigation with 4 primary items
- Icon + label combination
- Active state with underline indicator

**Desktop Sidebar:**
- Vertical navigation with icon-text pairs
- Collapsible project list
- User profile at bottom

### Dashboard Cards
- Rounded borders (rounded-xl)
- Subtle border treatment
- p-6 internal padding
- Hover state: subtle elevation shift
- Header: flex justify-between items-center
- Content: grid or stack layout based on data type

### Project List Items
- Compact design (p-4)
- Left: Project name + status badge
- Right: Last updated timestamp
- Bottom: Progress indicator bar (h-1 rounded-full)
- Touch target: min-h-16

### Activity Feed
- Timeline-style vertical list
- Left: User avatar (w-8 h-8 rounded-full)
- Center: Activity description with timestamp
- Right: Action icon/button
- Dividers between items

### Data Visualization Cards
- Header with metric title and value (text-3xl font-bold)
- Trend indicator (↑↓ with percentage)
- Simple bar/line charts using lightweight libraries
- Touch-optimized tooltips

### Comment System
- Threaded conversation layout
- Avatar + username + timestamp header
- Comment text with markdown support
- Reply button (text-sm)
- Indentation for nested replies (ml-8)

### Forms & Inputs
- Full-width text inputs (rounded-lg border p-3)
- Floating labels for mobile efficiency
- Touch-friendly select dropdowns (min-h-12)
- Primary action buttons (w-full on mobile, auto on desktop)

### Status Badges
- Inline badges with rounded-full styling
- Small size (px-3 py-1 text-xs font-medium)
- Various states: Active, Pending, Completed, Issue

---

## Page Structures

### Dashboard
- Header: User greeting + notification icon
- Quick Stats: 2x2 grid of metric cards
- Recent Projects: Scrollable horizontal list (mobile), 2-column grid (desktop)
- Activity Feed: Latest 5 updates

### Project Detail
- Header: Project name, status badge, share button
- Tabs: Overview | Activity | Data | Team
- Content area adapts to selected tab
- Sticky header on scroll (mobile)

### Mobile Considerations
- Pull-to-refresh on lists
- Infinite scroll for feeds
- Swipe gestures for navigation
- Haptic feedback on actions (where supported)
- Optimized for one-handed use

---

## Responsive Breakpoints
- Mobile: base (default)
- Tablet: md: (768px)
- Desktop: lg: (1024px)

---

## Accessibility
- ARIA labels on all interactive elements
- Focus states with visible outlines (ring-2)
- Keyboard navigation support
- Contrast ratios meeting WCAG AA standards
- Touch targets minimum 44x44px

---

## Images
**No hero image** - This is a utility dashboard, not a marketing page. Focus is on data and functionality, not visual storytelling.