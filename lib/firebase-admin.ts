import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

/**
 * Firebase Admin bootstrap for server-side file storage (images/videos).
 * Needs a service-account key — create one in the Firebase console under
 * Project settings → Service accounts → Generate new private key — and set:
 *
 *   FIREBASE_PROJECT_ID
 *   FIREBASE_CLIENT_EMAIL
 *   FIREBASE_PRIVATE_KEY       (keep the literal \n line breaks; see .env.example)
 *   FIREBASE_STORAGE_BUCKET    (e.g. your-project.appspot.com)
 *
 * Without these, uploads fall back to public/uploads/ under `npm run dev`
 * only, same as the rest of this app's storage layer (see lib/storage.ts).
 */

export const firebaseConfigured = Boolean(
  process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY &&
    process.env.FIREBASE_STORAGE_BUCKET
);

let app: App | null = null;

function getFirebaseApp(): App {
  if (app) return app;
  const existing = getApps();
  if (existing.length > 0) {
    app = existing[0];
    return app;
  }
  app = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Env vars can't hold real newlines — .env files store the key with
      // literal "\n" sequences that need unescaping here.
      privateKey: (process.env.FIREBASE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n"),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
  return app;
}

/** The default Storage bucket, ready for `.file(key).save()` etc. */
export function getBucket() {
  return getStorage(getFirebaseApp()).bucket();
}
