# Channapatna Namma Pride
## Smart MVP Plan for an Android Internship Project

**Goal:** build a small but impressive app in 7–10 days that proves the idea works without over-engineering it.

---

## 1. Simplified Product Overview

Channapatna Namma Pride is an Android app for browsing handcrafted wooden toys and home decor from artisans. Each product has a 6-digit verification code so buyers can confirm it is authentic. The app also shows a simple artisan profile so users know who made the item.

To make the demo feel modern, add one showcase feature: either AI-generated product stories or a basic AR preview. Keep everything else simple, visual, and fast to demo.

---

## 2. Core Features

### Must Build

#### 1. Product Listing

**User flow**
1. User opens the app.
2. Sees a colorful home screen with featured products.
3. Taps a product card to open details.

**Minimal logic**
- Read product list from Firestore.
- Show a small set of demo products.
- Filter can be very basic or skipped.

**UI components**
- Top bar with app title.
- Featured product carousel or horizontal row.
- 2-column product grid.
- Basic bottom navigation.

#### 2. Product Detail Page

**User flow**
1. User opens a product.
2. Sees product image, price, description, artisan name, and verification code.
3. Taps artisan name or verification section for more context.

**Minimal logic**
- Show product data from Firestore.
- Link to artisan by `artisanId`.
- Keep images to 1–3 per product.

**UI components**
- Large image header.
- Title, price, rating text.
- Description block.
- Verification badge.
- Artisan preview card.

#### 3. Artisan Profile

**User flow**
1. User taps artisan from a product.
2. Sees artisan photo, short bio, and their products.
3. Returns to product detail or browses more items.

**Minimal logic**
- Fetch artisan by `artisanId`.
- Show related products in a simple grid.
- No follow system, no complex contact actions.

**UI components**
- Profile header with photo and name.
- Short bio text.
- Rating and location text.
- Small related-products section.

#### 4. 6-Digit ID Verification

**User flow**
1. User opens Verify screen.
2. Enters a 6-digit code.
3. App shows whether the product is authentic.
4. If found, display product and artisan summary.

**Minimal logic**
- Query Firestore for the code.
- Match code to product and artisan.
- Show success or not-found state.
- QR scan is optional and can be skipped.

**UI components**
- 6-digit input field.
- Verify button.
- Success card with checkmark.
- Error message state.

### One Showcase Feature

Pick **one** of these. For this project, **GenAI storytelling is the better MVP choice** because it is easier than AR and gives a strong demo moment.

#### Option A: GenAI Storytelling, Preferred

**User flow**
1. User taps “Read Story” on the product detail page.
2. App shows loading.
3. App displays a short story about the product and artisan.

**Minimal logic**
- Use a simple OpenAI request, or even pre-generate stories for the demo.
- Cache the result in Firestore if time allows.
- If the API fails, show a stored fallback story.

**UI components**
- Story button on product detail.
- Bottom sheet or dialog with formatted text.
- Loading spinner.

**Simple prompt**
```text
Write a warm 120-word story about this handcrafted wooden product.
Product: {name}
Artisan: {artisanName}
Category: {category}
Price: {price}
Mention craftsmanship, heritage, and why it makes a good gift.
Keep the tone simple and inspiring.
```

#### Option B: Basic AR Visualization

If you prefer AR, do not build full plane detection. Use a simple 3D model viewer embedded in a WebView or a lightweight model viewer library.

**User flow**
1. User taps “AR View”.
2. App shows a 3D product preview.
3. User rotates or zooms the model.

**Minimal logic**
- Open a hosted `.glb` model.
- No floor placement, no gestures beyond rotate/zoom.

**UI components**
- Full-screen viewer.
- Close button.
- Loading indicator.

### Optional, Keep Simple or Mock

#### Map
- Show static artisan markers only.
- Use Google Maps only if time remains.

#### Reviews
- Hardcode 3–5 sample reviews.
- Do not build review submission.

#### Cart
- Add-to-cart can be visual only.
- No real payment flow.

---

## 3. Minimal Tech Stack

Use only what you need for the demo.

- Android Studio + Kotlin
- Jetpack Compose for UI
- Firebase Firestore for products, artisans, verification codes
- Firebase Storage for product images if needed
- OpenAI API only if choosing AI storytelling
- Model viewer or basic AR only if choosing AR

Keep the app on a simple MVVM structure if you already know it. Do not introduce repositories, clean architecture layers, or complex dependency injection unless you are comfortable with them already.

Recommended simple dependencies:
- Compose
- Firebase Firestore
- Coil for images
- Coroutines
- Retrofit only if using OpenAI

---

## 4. Simple Database Design

Keep only three collections.

### `products`
```text
productId: "prod_001"
name: "Wooden Elephant"
price: 450
category: "toys"
imageUrl: "..."
artisanId: "artisan_001"
verificationCode: "847291"
description: "Handcrafted wooden toy"
```

### `artisans`
```text
artisanId: "artisan_001"
name: "Rajesh Kumar"
photoUrl: "..."
bio: "Traditional wood craftsman from Channapatna"
location: "Channapatna, Karnataka"
rating: 4.8
```

### `verificationCodes`
```text
code: "847291"
productId: "prod_001"
artisanId: "artisan_001"
status: "active"
```

That is enough for the MVP. Do not add orders, wishlists, reviews, or story caches unless you finish early.

---

## 5. 7–10 Day Execution Plan

### Day 1: Setup

**Tasks**
- Create the Android project.
- Connect Firebase Firestore.
- Add Compose, Coil, and Firebase dependencies.
- Create basic app navigation and package structure.

**Expected output**
- App runs on emulator or device.
- Firebase connection is working.
- Empty screens can be navigated.

### Day 2: Home Screen

**Tasks**
- Build the home screen layout.
- Add product cards and featured section.
- Load mock product data or Firestore data.

**Expected output**
- You can see products in a simple grid.
- The screen looks colorful and demo-ready.

### Day 3: Product Detail

**Tasks**
- Build the product detail screen.
- Show image, title, price, description, and verification code.
- Add navigation from product card to detail page.

**Expected output**
- Tapping a product opens its detail page.
- The page looks complete enough to present.

### Day 4: Verification

**Tasks**
- Build the verification screen.
- Add 6-digit input and verify button.
- Query Firestore using the entered code.

**Expected output**
- Valid codes show a success card.
- Invalid codes show a clear error.

### Day 5: Artisan Profile

**Tasks**
- Build the artisan profile screen.
- Show artisan photo, bio, rating, and related products.
- Navigate from product detail to artisan profile.

**Expected output**
- Artisan page feels connected to the product flow.
- Product-to-artisan navigation works.

### Day 6: Showcase Feature

**Tasks**
- Implement either AI storytelling or basic AR.
- If AI: use OpenAI or a pre-written story fallback.
- If AR: use a simple model viewer.

**Expected output**
- One impressive feature works well enough for demo.

### Day 7: Integration

**Tasks**
- Connect all screens together.
- Add final navigation paths.
- Fill Firestore with demo products, artisans, and codes.

**Expected output**
- The app has a full end-to-end demo flow.

### Day 8: Testing

**Tasks**
- Test product browsing, detail page, and verification.
- Fix crashes and broken navigation.
- Check slow loading and empty states.

**Expected output**
- Main flows work reliably on device.

### Day 9: Polish

**Tasks**
- Improve spacing, colors, and typography.
- Add loading states and empty states.
- Make buttons and cards look consistent.

**Expected output**
- App looks cleaner and more professional.

### Day 10: Demo Prep

**Tasks**
- Prepare demo data.
- Rehearse the walkthrough.
- Keep screenshots or video backup ready.

**Expected output**
- You can present the app confidently without improvising.

---

## 6. Practical UI Design

Keep the design toy-like, warm, and simple.

**Color direction**
- Brown for trust and craftsmanship.
- Gold or orange for highlights.
- Light cream background.
- Green for verification success.

**Screens to build**
- Home
- Product Detail
- Verification
- Artisan Profile
- Optional Story or AR screen

**UI rules**
- Use large product images.
- Keep cards rounded and colorful.
- Avoid dense text blocks.
- Use consistent button styles.
- Make verification success visually obvious.

---

## 7. Simplified AI or AR Implementation

### If You Choose AI

Use one endpoint or even static fallback stories.

**Very simple prompt**
```text
Write a short, warm story about this handcrafted wooden product.
Include the artisan, the material, and why it feels special.
Keep it under 120 words.
```

**Best MVP approach**
- First show a stored story.
- If time remains, connect OpenAI.
- Do not build advanced caching.

### If You Choose AR

Use a basic model viewer instead of full ARCore.

**Best MVP approach**
- Display one `.glb` model.
- Allow rotate and zoom only.
- Avoid plane detection and object placement.

---

## 8. What To Mock

### Can Be Fake or Static
- Product reviews
- Workshop locations
- Story content if OpenAI is too slow
- Cart quantity and checkout
- QR scan flow

### Must Be Real
- Product list from Firestore or a real local dataset
- Artisan profile screens
- 6-digit verification lookup
- Navigation between screens
- One showcase feature working well enough for demo

---

## 9. Demo Flow

Use a short, controlled demo.

1. Open the app on the home screen.
2. Show featured products and explain they come from local artisans.
3. Tap a product and show detail information.
4. Open the artisan profile and show the maker connection.
5. Enter a 6-digit verification code and show authenticity confirmation.
6. Trigger the showcase feature:
   - If AI, show the generated story.
   - If AR, show the product preview.
7. End by saying the app connects authenticity, artisans, and modern buying in one place.

**What to say**
- The app solves authenticity for handcrafted products.
- Buyers can see who made the product.
- The demo includes one modern feature to make the experience memorable.

---

## 10. Final Advice

Prioritize the flows the evaluator will actually click: home, product detail, artisan profile, verification, and one showcase feature. If time gets tight, cut features before cutting quality. A polished small app is better than a half-finished complex one.

Common mistakes to avoid:
- Building too many features.
- Adding complex architecture too early.
- Spending too long on AR if it blocks the demo.
- Using too much placeholder data without making the screens feel real.

If you want this to look impressive, make the first screen polished, keep data consistent, and make the verification result very clear. That will make the project feel much bigger than it is.