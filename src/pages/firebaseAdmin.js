// firebaseAdmin.js

import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "./firebase";

const privateKey = process.env.AUTH_FIREBASE_PRIVATE_KEY;
if (!privateKey) {
  throw new Error("Missing AUTH_FIREBASE_PRIVATE_KEY");
}

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
    clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey.replace(/\\n/g, '\n'),
  }),
};

if (!getApps().length) {
  initializeApp(firebaseAdminConfig);
}

const firestore = getFirestore(app);

export { firestore };

// Update or create user in Firestore
export async function upsertUser(user) {
  const userRef = doc(firestore, 'users', user.id); // Use user.id to reference the document directly

  try {
    await setDoc(userRef, {
      ...user, // Spread existing user data
      user_points: 0, // Set initial user_points to 0 (or your desired default value)
    }, { merge: true }); // Use merge to update existing document or create a new one
    console.log('User upserted with ID:', user.id);
  } catch (error) {
    console.error('Error upserting user:', error);
  }
}
