import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { getData } from "../utils/api";

function NitrousOxide() {

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData("https://global-warming.org/api/nitrous-oxide-api");
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
        <h1>NitrousOxide</h1>
      </div>
    </main>
  );
}

export default NitrousOxide;
