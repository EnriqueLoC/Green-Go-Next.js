// nextauth.js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials" 
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { upsertUser } from "../../firebaseAdmin";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const privateKey = process.env.AUTH_FIREBASE_PRIVATE_KEY;
if (!privateKey) {
  throw new Error("Missing AUTH_FIREBASE_PRIVATE_KEY");
}

export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "../../Signup.jsx",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        return await signInWithEmailAndPassword(auth, credentials.email || '', credentials.password || '')
         .then(userCredential => {
          if (userCredential.user) {
            return userCredential.user;
          }
          return null;
         })
         .catch(err => {console.log(err)})
    }
  })
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey.replace(/\\n/g, '\n'),
    }),
  }),
  callbacks: {
    async session({ session, user }) {
      if (user) {
        try {
          await upsertUser(user); // Call upsertUser here with the user object
        } catch (error) {
          console.error('Error upserting user points:', error);
        }
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
