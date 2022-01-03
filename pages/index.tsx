import type { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    let day = new Date();
    let today = day.toISOString().split("T")[0];
    window.location.href = "/schedule/" + today;
  }, []);

  return <></>;
};

export default Home;
