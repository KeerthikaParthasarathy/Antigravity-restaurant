# Anti-Gravity — The Royal Fire

**Luxury heritage fine dining website where royal culinary storytelling meets experimental interactive technology.**

---

## 01. Brand & Creative Concept

* **Brand:** Anti-Gravity — The Royal Fire
* **Tagline:** *The Art of Fire. The Soul of Heritage.*
* **Concept:** A royal hand-thrown vessel suspended in darkness, brought to life by elemental fire, 36-hour slow-ember braising, and the visitor's own rotary heat interaction.

---

## 02. Architecture & Tech Stack

* **Framework:** Next.js 14 App Router (React 18, TypeScript)
* **Design Tokens & Styling:** Tailwind CSS with centralized obsidian & champagne-gold palette, custom luxury glassmorphism, responsive editorial grids
* **3D Visual Engine:** Three.js + React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
* **Shaders:** Custom procedural GLSL vertex & fragment fire distortion and radial heat gradients
* **Animation:** Framer Motion for sequential cinematic reveals, modals, and ingredient transitions
* **State Management:** Zustand for authoritative heat state and reservation modal lifecycle
* **Form Validation:** Zod schema validation across the 3-stage reservation flow
* **Icons:** Lucide React

---

## 03. Routes & Experience

| Route | Page | Purpose |
| :--- | :--- | :--- |
| `/` | **The Royal Experience** | 5-phase cinematic hero reveal, 3D levitating vessel, rotary heat dial, Bento menu, heritage story, chef profiles, private dining sanctums, visual reviews, and Live Ember Footer. |
| `/menu` | **The Imperial Menu** | Search & filter by categories and dietary preferences, dish detail inspection drawer, spice indicators, and links to customization. |
| `/craft-your-dish` | **The Royal Thali Atelier** | Interactive 3D brass thali workbench with real-time dynamic pricing, cooking methods, proteins, rare Kashmiri spices, and accompaniments. |
| `/heritage` | **Chronicle of Fire** | Culinary philosophy: Dum Pukht (dough-sealed steam), Sigri (tamarind charcoal), Tandoor (850°F clay pit), and Dhungar (clove smoke). |
| `/chefs-table` | **Master Chef's Hearth** | 10-seat live copper hearth counter presentation, 6-course tasting menu progression, resident masters. |
| `/private-dining` | **Private Sanctums** | The Royal Diwan, Ember Rooftop, and Chef's Table with capacities, ambience details, and banquet inquiries. |

---

## 04. Core Features

1. **Interactive 3D Levitating Royal Vessel:**
   * Handcrafted ceramic handi geometry with antique hammered brass lid, finial crown, and cast brass handles.
   * Modulated in real-time by the rotary heat-gauge dial.
2. **Rotary Heat-Gauge Dial:**
   * Continuous 0–100 rotary control with pointer capture, touch events, and keyboard arrows.
   * Synchronized named presets: *Gentle Royalty* (18), *Royal Simmer* (55), and *Tandoor Inferno* (92).
   * WebGL fallback (`FireFallback.tsx`) for low-power or non-WebGL devices.
3. **Interactive 3D Brass Thali Customizer:**
   * 3D polished brass plate with peripheral condiment katoris adapting to chosen ingredients.
   * Real-time itemized pricing engine with integer minor currency calculation.
   * One-click bridge into reservation carrying dish preferences into the booking summary.
4. **Accessible 3-Stage Reservation Modal:**
   * Stage 1: Date (past date prevention), Time, Guest counter (+/-), Seating Sanctum.
   * Stage 2: Atmosphere confirmation, Occasion selector, Special requests, Attached custom dish preview.
   * Stage 3: Guest contact information with Zod validation.
   * Stage 4: Transparent demo booking confirmation with unique identifier (`RF-2026-XXXX`).
5. **Live Ember Footer Clock:**
   * Displays the restaurant's local hearth time (`America/New_York`) using `Intl.DateTimeFormat`.

---

## 05. Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run Type Checks & Production Build
```bash
npx tsc --noEmit
npm run lint
npm run build
```
