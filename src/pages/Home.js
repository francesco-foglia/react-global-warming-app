import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { getNavbarLinks } from "../utils/api";

function Home() {

  const [spinner, setSpinner] = useState(true);
  const navbarLinks = getNavbarLinks();

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 250);
  }, []);

  return (
    <>
      {spinner && <Spinner />}
      <div className="w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url(https://global-warming.org/images/background-global-warming.webp)" }}>
        <div className="w-full h-screen p-[5%] flex flex-col justify-center items-center bg-black bg-opacity-30 backdrop-blur-[1px]">
          <h1 className="text-4xl text-center text-white font-medium mt-[5%] mb-0" style={{ textShadow: "1.5px 1.5px #4b5563" }}>
            Global Warming and Climate Change
          </h1>
          <div className="flex flex-wrap justify-center items-center m-auto">
            {navbarLinks.filter(link => link.path !== "/").map((link) => (
              <Link key={link.name} to={link.path} className="m-3 p-3 rounded font-medium text-gray-600 bg-gray-200 hover:scale-110 transition-all duration-500 tracking-[1px]" style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)" }}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
