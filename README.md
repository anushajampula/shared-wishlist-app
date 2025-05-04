# Shared Wishlist App

A collaborative shopping wishlist web app where users can create, manage, and share wishlists in real-time — ideal for group shopping plans, birthdays, or special events.

## Live Demo

**[View the App](https://wishlist-client-app.vercel.app)**  
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
| Hosting      | Vercel                     |
| Styling      | Tailwind CSS               |


## Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/anushajampula/wishlist-client-app.git
cd wishlist-client

2. Install Dependencies

```bash
npm install

3. Firebase Setup

Create a Firebase project at https://console.firebase.google.com

Enable Authentication > Email/Password

Enable Cloud Firestore

Copied the firebase configuaration and stored it in .env

4. Start Development Server

```bash
npm run dev