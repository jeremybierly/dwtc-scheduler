import type { NextPage } from "next";
import Head from "next/head";
import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { ref, Database, getDatabase } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

// Set the configuration for your app
// TODO: Replace with your project's config object
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

let firebaseApp: FirebaseApp;

if (getApps().length === 0) {
  firebaseApp = initializeApp(firebaseConfig);
}

// Get a reference to the database service
const database: Database = getDatabase(firebaseApp);

//console.log(ref(database, "schedule"));

const Schedule: NextPage = () => {
  const [snapshot, loading, error] = useObject(
    ref(database, "schedule/2022-01-01")
  );
  return (
    <>
      <Head>
        <title>DWTC Schedule</title>
      </Head>
      <p className="text-gray-700 dark:text-gray-300">
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Value: Loading...</span>}
        {snapshot && <span>Value: {JSON.stringify(snapshot.val())}</span>}
      </p>
    </>
  );
};

export default Schedule;
