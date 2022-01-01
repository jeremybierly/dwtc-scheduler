import type { NextPage } from "next";
import { useState, useEffect } from "react"

const Home: NextPage = () => {
  const [today, setToday] = useState("2022-01-01")


  useEffect(()=> {
    let day = new Date()
    setToday(day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate())
    window.location.href="/schedule/"+ today
  },[])
    
  

  return (
    <>
      
    </>
  );
};

export default Home;
