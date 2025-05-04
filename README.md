# Shared Wishlist App

A React-based wishlist application that allows users to create, manage, and share wishlists in real-time — ideal for group shopping plans, birthdays, or special events collaboratively. This app uses Firebase as the backend and is styled using Tailwind CSS. It is deployed on GitHub Pages.


## Live Demo

**[View the App](https://github.com/anushajampula/shared-wishlist-app)**  
*(Firebase Auth required — sign up with email/password)*

## Features

- **User Authentication**  
  - Sign up / Log in with Firebase Authentication.

- **Wishlist Management**  
  - Create a new wishlist  
  - Add, edit, and delete products (name, image URL, and price)  
  - Each item shows who added or edited it (via email/username)

- **Collaboration**  
  - Mock invite system to simulate sharing wishlists with others

- **Real-Time Sync** *(Bonus)*  
  - Firebase Firestore used for instant updates across sessions

- **Responsive Design**  
  - Mobile and tablet-friendly UI


## Tech Stack

| Layer        | Tech Used                  |
|--------------|----------------------------|
| Frontend     | React + Vite               |
| Authentication | Firebase Auth            |
| Database     | Firebase Firestore (NoSQL) |
| Hosting      | Github pages               |     |
| Styling      | Tailwind CSS               |

## Project Structure
## Frontend:
- Frontend - React + Vite
- Framework: React with Vite
- Styling: Tailwind CSS
- Routing: React Router DOM
- Notifications: React Toastify

## Key Files & Folders:

* public/                  # Static assets
  *src/
   * pages/
       - Home.jsx             # Welcome or intro screen
      - Auth.jsx             # Login/Signup screen
      - Wishlist.jsx         # User wishlist page
      - WishlistDetail.jsx   # Detailed wishlist page
   - firebase.js          # Firebase configuration
   - App.jsx              # Navigation and routing logic
   - main.jsx             # React entry point
* docs/                    # GitHub Pages deployment output
* tailwind.config.js       # Tailwind CSS config
* vite. config.js           # Vite build config
* package.json             # Project metadata and scripts

## Backend:
- Backend - Firebase
- Firebase services used:
- Authentication: Email-based login/signup
- Database: Firestore or Realtime Database
- Firebase config is located in src/firebase.js and includes:

## firebase configuration:
import { initializeApp } "from firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = { ... };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

## Routing

*Handled using react-router-dom with the following paths:
*Deployment - GitHub Pages
*Deployed using GitHub Pages by building to the docs/ folder.
*Homepage in package.json:
*"homepage": "https://<your-username>.github.io/wishlist-client-app"

## Deployment Commands:

"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d docs"
}

** To Deploy:
npm run build
npm run deploy

## Setup Instructions

1. Clone the repository:
- git clone https://github.com/your-username/wishlist-client-app.git

2. Firebase Setup

- Create a Firebase project at https://console.firebase.google.com
- Enable Authentication > Email/Password
- Enable Cloud Firestore
- Copied the firebase configuration and stored it in .env

3. Install dependencies:
- npm install

4. Start the development server:
- npm run dev

5. Build for production:
- npm run build

6. Deploy to GitHub Pages:
- npm run deploy



