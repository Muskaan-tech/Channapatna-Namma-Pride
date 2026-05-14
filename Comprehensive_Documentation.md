# Channapatna Namma Pride: Comprehensive Documentation

## Table of Contents
1. Project Overview
2. Tech Stack
3. Project Structure
4. Feature-by-Feature Breakdown
5. Code Flow Explanation
6. Key Components & Modules
7. Database & Data Handling
8. API Documentation
9. Authentication & Security
10. State Management
11. Error Handling & Edge Cases
12. Performance Considerations
13. Third-Party Integrations
14. Project Strengths
15. Limitations & Improvement Opportunities
16. Non-Technical Summary

---

## 1. Project Overview
**Channapatna Namma Pride** is a hybrid e-commerce platform designed to promote, sell, and verify authentic Channapatna handcrafted wooden toys. It combats the rise of counterfeit goods by integrating a 6-digit verification system, whilst offering an immersive shopping experience using Augmented Reality (AR) to view 3D toy models and rich storytelling to highlight the artisans behind the crafts.

## 2. Tech Stack
The application is built using a modern, lightweight web stack configured as a Progressive Web App (PWA).
*   **Frontend Library:** React.js (v18)
*   **Build Tool:** Vite (for fast HMR and optimized production bundling)
*   **Styling:** Vanilla CSS (custom design system via `index.css`)
*   **Mobile Wrapper:** Capacitor.js (to package the web application as a native Android/iOS app)
*   **AR Rendering:** Google's `<model-viewer>` web component (WebXR)
*   **Icons & Assets:** Native Unicode emojis & local SVG/PNG files

## 3. Project Structure
The project follows a flattened, minimalistic structure geared for rapid MVP iteration.
```text
ChannapatnaToy/
├── app/                  # Capacitor/Android native shell files
├── web/                  # Core Frontend Application
│   ├── public/           # Static assets (GLB models, Images)
│   ├── src/
│   │   ├── App.jsx       # Main application logic, routing, and all UI screens
│   │   ├── data.js       # Simulated local database and data retrieval functions
│   │   ├── index.css     # Global design system, CSS variables, and animations
│   │   ├── App.css       # Component-specific styles
│   │   └── main.jsx      # React entry point
│   ├── package.json      # Node dependencies
│   └── vite.config.js    # Vite configuration
```

## 4. Feature-by-Feature Breakdown
*   **Authentication Flow (Mocked):** A visually complete login screen offering Google and Email/Password sign-in options, validating basic email structures before granting access.
*   **Home & Discovery:** Displays a horizontal "Featured Products" carousel and a 2-column grid for standard products. Includes a real-time search bar that filters products by name and category.
*   **Product Detail Page:** Showcases high-quality images, pricing, a dynamic "Verified" badge, an Add to Cart/Buy Now flow, and an embedded preview card of the artisan who crafted the product.
*   **AR Viewer:** Utilizes Google's `<model-viewer>` to render local `.glb` files. It allows users to rotate and zoom 3D models on-screen or place them in their physical environment using device native AR (ARCore/ARKit).
*   **6-Digit Verification System:** A custom OTP-style input interface where users enter a physical code. It queries the database and returns a Success Card (linking to the product) or an Error Card.
*   **Artisan Profiles:** A dedicated screen outlining the artisan's biography, experience level, location, and a grid of all products associated with them.
*   **Shopping Cart & Checkout:** A global state tracks added items. A polished modal simulates the final checkout process, currently displaying a "Payment Coming Soon" state.

## 5. Code Flow Explanation
The application operates as a Single Page Application (SPA) driven by a custom lightweight routing system.
1.  **Entry:** `main.jsx` mounts the `<App />` component.
2.  **State Initialization:** `App.jsx` initializes `currentScreen` (default: 'login') and `cart` array.
3.  **Navigation:** Screens trigger the `navigate(screenName, params)` function. This function updates the `currentScreen` state and stores any required context (like `productId`) in the `screenParams` state.
4.  **Rendering:** A `switch` statement in the `App` component renders the appropriate sub-component (e.g., `HomeScreen`, `ProductDetailScreen`) based on `currentScreen`, passing down necessary props and navigation functions.

## 6. Key Components & Modules
*   **`HomeScreen`**: Handles search state and filters the `products` array dynamically. Maps data into `FeaturedCard` and `ProductCard` components.
*   **`ProductDetailScreen`**: Reads `productId` from navigation parameters, fetches associated product and artisan data, and manages local states for the "Add to Cart" animation and Toast notifications.
*   **`ARScreen`**: Maps a `productId` to a specific `.glb` asset URL. Embeds the `<model-viewer>` web component with attributes for camera-controls, auto-rotate, and WebXR hooks.
*   **`VerificationScreen`**: Manages a complex state array for the 6-digit input boxes. Implements `useRef` for auto-focusing the next input box upon typing and handles clipboard pasting.

## 7. Database & Data Handling
To eliminate network latency for the MVP demo, the database is simulated locally within `src/data.js`.
*   **Schema Structure:** Organized like a NoSQL document database (e.g., Firestore).
    *   `artisans`: Array of objects containing `id`, `name`, `bio`, `photoUrl`, `rating`.
    *   `products`: Array of objects containing `id`, `name`, `price`, `artisanId`, `verificationCode`.
    *   `verificationCodes`: Array of objects tracking active codes `code`, `productId`, `status`.
*   **Relationships:** `products` are linked to `artisans` via a one-to-many relationship (`artisanId`).
*   **Retrieval:** Helper functions (`getArtisan`, `getProduct`, `verifyCode`) simulate database queries by utilizing standard JavaScript `Array.prototype.find()`.

## 8. API Documentation
Currently, the application does not rely on external REST or GraphQL APIs. Internal module APIs include:
*   `getProduct(id: String) -> Object | null`: Returns a product object or null if invalid.
*   `getArtisan(id: String) -> Object | null`: Returns artisan object details.
*   `verifyCode(code: String) -> Object | null`: Validates a 6-digit string and returns the mapping object containing associated `productId` and `artisanId`.

## 9. Authentication & Security
*   **Current State:** Authentication is simulated via UI. Passwords are not hashed or transmitted; clicking login visually transitions the user to the app.
*   **Future Security Roadmap:** For production, integration with Firebase Authentication or Auth0 is planned to issue JWT tokens. Real database security rules will restrict API read/write operations to authenticated users.

## 10. State Management
*   **Global State:** Handled centrally in the `App` component using React's `useState` hook.
    *   `currentScreen`: Tracks active route.
    *   `screenParams`: Object holding contextual data (e.g., `{ productId: 'prod_001' }`).
    *   `cart`: Array tracking user selections.
*   **Local State:** Individual components manage highly localized states. For example, `VerificationScreen` manages the `digits` array and `LoginScreen` handles `email`/`password` inputs.
*   **Why No Redux/Context?** Given the MVP nature of the app and a flat component tree, prop-drilling is minimal. Keeping state in the root `App` component guarantees highest performance with least boilerplate.

## 11. Error Handling & Edge Cases
*   **Image Fallbacks:** If a product or artisan image fails to load (e.g., missing local file), the `<img onError>` event triggers a state change (`setImgErr`), instantly replacing the broken image with a beautifully styled fallback placeholder (🎨/👤).
*   **Invalid Routes/IDs:** If a user navigates to a Product Detail page with a non-existent `productId`, an `<EmptyState>` component is safely rendered with a "Back to Home" prompt.
*   **Input Sanitization:** The Verification screen uses Regex (`.replace(/\D/g, '')`) to ensure only numeric values can be typed or pasted into the OTP boxes.

## 12. Performance Considerations
*   **Instant Load Times:** Because data (`data.js`) and images (`/public`) are stored locally, the app does not suffer from network blocking or waterfall requests.
*   **Lazy Asset Loading:** The `<model-viewer>` component inherently defers the downloading of heavy `.glb` files until the AR Screen is actually mounted.
*   **Optimized React Renders:** The custom router prevents full page reloads, making screen transitions instant. CSS hardware-accelerated animations (`transform`, `opacity`) are used over layout-altering properties to maintain 60fps scrolling.

## 13. Third-Party Integrations
*   **`<model-viewer>` (Google):** Powers the entire 3D and AR pipeline. It handles device capability checking and invokes native AR interfaces (Scene Viewer on Android, Quick Look on iOS) automatically.
*   **Capacitor:** Acts as the bridge between the web code and the native device. It allows the web app to be deployed directly to Android Studio.

## 14. Project Strengths
*   **Offline-Capable MVP:** Demonstrates the core value proposition flawlessly without requiring an internet connection.
*   **High-Fidelity Aesthetics:** Feels like a premium native application due to carefully curated CSS variables, smooth gradients, glassmorphism UI elements, and fluid micro-animations.
*   **Frictionless AR:** Delivers complex augmented reality visualization through the web without forcing users to install heavy third-party plugins.

## 15. Limitations & Improvement Opportunities
*   **Monolithic Component:** `App.jsx` houses all screens and logic. *Improvement:* Refactor and split screens into individual files (e.g., `/src/screens/HomeScreen.jsx`).
*   **Ephemeral Data:** Any cart additions or changes are lost upon page refresh. *Improvement:* Connect to Firebase Firestore for real-time, persistent database storage and syncing.
*   **Mocked Flows:** Payment and Authentication are purely visual. *Improvement:* Integrate Stripe/Razorpay for actual transactions and Firebase Auth for secure user sessions.

## 16. Non-Technical Summary
Channapatna Namma Pride is a digital storefront built to protect and elevate the traditional toy makers of Karnataka. It works like a modern shopping app but includes a special "Verification" feature where buyers can enter a code found on their physical toy to prove it's a genuine handcrafted piece, not a factory fake. 

To make shopping exciting, the app allows users to place virtual 3D models of the toys in their living room using Augmented Reality through their phone camera. By telling the personal story of the artisan alongside every product, the app ensures that buyers appreciate the art, and artisans receive the credit and sales they deserve. The app is fast, visually stunning, and ready to be demonstrated as a polished mobile experience.
