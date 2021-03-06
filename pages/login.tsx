import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { ref, Database, getDatabase } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";
import { useLocalStorage } from "../hooks/uselocalStorage";

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

const Login: NextPage = () => {
  const [snapshot] = useObject(ref(database, "users"));
  const usersList = snapshot && Object.entries(snapshot.val());
  const [email, setEmail] = useState();
  const [userName, setUserName] = useLocalStorage("userName", "");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (event) => {
    setEmail(event.target.value.toLowerCase());
  };
  function logMeIn(event: any): void {
    event.preventDefault();
    try {
      let user = usersList.filter((item) => {
        return item[1]["email"] === email;
      })[0][1];
      if (user) {
        setUserName(user["username"]);
        window.location.href = "/schedule/";
      }
    } catch (error) {
      setErrorMessage("Email Address Not Found");
    }
  }

  return (
    <form onSubmit={logMeIn}>
      <label
        className="block mt-4 text-gray-400 dark:text-gray-600"
        htmlFor="userEmail"
      >
        Email Address
      </label>
      <input
        onChange={handleInput}
        className="block w-80 text-lg p-2 border-2 border-gray-500 rounded"
        id="userEmail"
        name="userEmail"
        type="text"
        placeholder="Email"
      />
      {errorMessage !== "" ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : null}
      <label
        className="block mt-4 text-gray-400 dark:text-gray-600"
        htmlFor="userPassword"
      >
        Password
      </label>
      <input
        className="block w-80 text-lg p-2 border-2 border-gray-500 rounded"
        type="password"
        id="userPassword"
        name="userPassword"
      />
      <button
        type="submit"
        className="block text-lg mt-6 w-80 bg-gray-500 rounded p-2"
      >
        Log In
      </button>
    </form>
  );
};

export default Login;
