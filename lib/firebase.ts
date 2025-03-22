import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDq7KjjV9ewIdRrYg827HOAteYbsjGXhKA",
//   authDomain: "authentication-form-cf448.firebaseapp.com",
//   projectId: "authentication-form-cf448",
//   storageBucket: "authentication-form-cf448.firebasestorage.app",
//   messagingSenderId: "620682990067",
//   appId: "1:620682990067:web:187ee575a585c30f550286",
//   measurementId: "G-YW4TT466H7",
// }


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)

// Initialize analytics in client-side environments only
export const initializeAnalytics = () => {
  if (typeof window !== "undefined") {
    return getAnalytics(app)
  }
  return null
}

export default app

