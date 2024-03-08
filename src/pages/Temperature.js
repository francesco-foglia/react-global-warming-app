import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { getData } from "../utils/api";

function Temperature() {

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData("https://global-warming.org/api/temperature-api");
        console.log(data);
      } catch (error) {
        console.error("Errore nel recupero dei dati:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <main>
      <Navbar />
      <div className="w-full h-screen flex justify-center items-center">
        <h1>Temperature</h1>
      </div>
    </main>
  );
}

export default Temperature;
