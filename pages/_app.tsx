import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="dark:bg-gray-800 p-5 min-h-screen">
      <h1 className="text-3xl text-gray:700 dark:text-gray-300">
        DWTC Schedule
      </h1>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
