# Kiddo SDUI — All4Kids Homepage

A server-driven UI homepage for a kids & baby essentials delivery app. The entire screen is controlled by a JSON file — no app update needed to change layouts, themes, or campaigns.

---

## Tech Stack
- React Native (Expo)
- TypeScript (strict mode)
- FlashList — fast list rendering
- Zustand — cart state
- Lottie — campaign animations
- expo-image — image caching

---

## What's Built
- Homepage renders from a JSON file (no hardcoded UI)
- 3 block types: Hero Banner, Product Grid, Horizontal Collection
- Unknown block types are dropped safely without crashing
- 3 live campaigns that change the whole app theme and add content instantly
- Campaign animations overlay the screen without blocking any taps
- Add to cart updates only that one product card, nothing else re-renders
- All colors, content, and layouts come from JSON — nothing hardcoded in code

---

## Installation

npm install
npx expo start

To run on Android:
Press "a" in the terminal after expo starts

To run on iOS:
Press "i" in the terminal after expo starts

To run on your phone:
Install Expo Go from Play Store or App Store, scan the QR code shown in terminal