import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const apiKey = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
  measurementId: import.meta.env.VITE_APP_MESAURMENT_ID,
  databaseURL: import.meta.env.VITE_APP_DATABASE_URL,
};

console.log("Api Key",apiKey)
const app = initializeApp(apiKey);
export const db = getDatabase(app);

export default app;
