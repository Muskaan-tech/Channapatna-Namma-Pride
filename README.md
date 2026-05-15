# Channapatna Namma Pride

An Android app that showcases handcrafted wooden toys and decor from local artisans, with built-in product authenticity verification and a modern storytelling experience.

---

## 🚀 Live Demo

👉 [View Demo] https://channapatna-namma-pride.vercel.app/

> Experience the app flow, product browsing, and storytelling feature directly in your browser.

---

## ✨ Features

- 🧸 Browse handcrafted products in a clean grid layout  
- 👨‍🎨 View artisan profiles and their creations  
- 🔐 Verify product authenticity using a 6-digit code  
- 🤖 AI-generated product stories *(optional showcase feature)*  
- 📱 Smooth and simple UI built with Jetpack Compose  

---

## 📸 Screenshots

> Add screenshots here after building the app

- Home Screen  
- Product Detail  
- Artisan Profile  
- Verification Screen  
- Story / AR Feature  

---

## 🛠 Tech Stack

- **Language:** Kotlin  
- **UI:** Jetpack Compose  
- **Backend:** Firebase Firestore  
- **Image Loading:** Coil  
- **Async:** Coroutines  
- **Optional:** OpenAI API (for storytelling)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/channapatna-namma-pride.git
```

### 2. Open in Android Studio

- Open the project folder  
- Let Gradle sync complete  

### 3. Firebase Setup

- Create a Firebase project  
- Add your `google-services.json` file to `/app`  
- Enable Firestore  

### 4. Run the app

- Connect emulator or device  
- Click **Run ▶️**

---

## 📱 App Flow (Demo)

1. Open the app → browse featured products  
2. Tap a product → view details  
3. Open artisan profile → see creator info  
4. Enter 6-digit code → verify authenticity  
5. Tap **“Read Story”** → view AI-generated story  

---

## 🗂 Database Structure (Firestore)

### `products`
```json
{
  "productId": "prod_001",
  "name": "Wooden Elephant",
  "price": 450,
  "category": "toys",
  "imageUrl": "...",
  "artisanId": "artisan_001",
  "verificationCode": "847291",
  "description": "Handcrafted wooden toy"
}
```

### `artisans`
```json
{
  "artisanId": "artisan_001",
  "name": "Rajesh Kumar",
  "photoUrl": "...",
  "bio": "Traditional wood craftsman from Channapatna",
  "location": "Channapatna, Karnataka",
  "rating": 4.8
}
```

### `verificationCodes`
```json
{
  "code": "847291",
  "productId": "prod_001",
  "artisanId": "artisan_001",
  "status": "active"
}
```

---

## 🧠 Project Approach

This project was built as a **7–10 day MVP** focused on:

- Simplicity over over-engineering  
- Strong core flows (browse → detail → verify)  
- One standout feature (AI storytelling or AR preview)  
- Clean UI and smooth demo experience  

---

## 🎯 Future Improvements

- 🛒 Add cart and checkout flow  
- ⭐ User reviews and ratings  
- 📍 Artisan map integration  
- 📷 QR code scanning for verification  
- 🧠 Smarter AI storytelling with caching  

---

## 🙌 Acknowledgment

Inspired by the traditional wooden toy craftsmanship of Channapatna artisans and the need to promote authentic handmade products in a digital marketplace.

---

## 📌 Note

This is a **demo MVP project** built for learning and showcasing Android development skills. Some features are simplified or mocked.

---

## ⭐ If you like this project

Give it a star ⭐ on GitHub!
