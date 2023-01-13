import '../styles/globals.css';
import { useLocalStorage } from '../hooks/uselocalStorage';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  const [userName, setUserName] = useLocalStorage('userName', '');
  function logOut() {
    setUserName('');
    window.location.href = '/schedule';
  }
  return (
    <div className="dark:bg-gray-800 p-5 min-h-screen">
      <div className="flex justify-between flex-col md:flex-row">
        <h1 className="text-3xl text-gray:700 dark:text-gray-300 m-2">
          DWTC Schedule
        </h1>
        {userName === '' ? (
          <Link href="/login/">
            <a className="py-2 px-4 bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded font-bold">
              Log In
            </a>
          </Link>
        ) : (
          <div className="mb-4">
            <Link href="/members/">
              <button className="mr-2 py-2 px-4 bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </button>
            </Link>
            <Link href="/schedule/">
              <button className="mr-2 py-2 px-4 bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
              </button>
            </Link>
            <button
              className="inline-block py-2 px-4 bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded font-bold"
              onClick={logOut}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
