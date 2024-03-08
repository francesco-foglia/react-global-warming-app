import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { getData } from "../utils/api";

function Methane() {

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData("https://global-warming.org/api/methane-api");
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
        <h1>Methane</h1>
      </div>
    </main>
  );
}

export default Methane;
