import "../styles/globals.css";
import { useLocalStorage } from "../hooks/uselocalStorage";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  const [userName, setUserName] = useLocalStorage("userName", "");
  function logOut() {
    setUserName("");
    window.location.href = "/";
  }
  return (
    <div className="dark:bg-gray-800 p-5 min-h-screen">
      <div className="flex justify-between">
        <h1 className="text-3xl text-gray:700 dark:text-gray-300">
          DWTC Schedule
        </h1>
        {userName === "" ? (
          <Link
            href="/login/"
          >
            <a className="py-2 px-4 bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded font-bold">>Log In</a
          </Link>
        ) : (
          <button
            className="py-2 px-4 bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded font-bold"
            onClick={logOut}
          >
            Log Out
          </button>
        )}
      </div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
