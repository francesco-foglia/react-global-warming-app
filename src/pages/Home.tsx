import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

import Spinner from '../components/Spinner';
import { getNavbarLinks } from "../utils/utils";
import BackgroundGlobalWarming from "../assets/background-global-warming.webp";

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
      <Helmet>
        <title>Global Warming</title>
      </Helmet>

      {spinner && <Spinner />}

      <div className="w-full min-h-dvh bg-cover bg-center" style={{ backgroundImage: "url(" + BackgroundGlobalWarming + ")" }}>
        <div className="w-full min-h-dvh p-[5%] flex flex-col justify-center items-center bg-black bg-opacity-30 backdrop-blur-[1px]">
          <Link to="https://global-warming.org/" target="_blank" rel="noopener noreferrer nofollow">
            <h1 className="text-4xl text-center text-white font-medium underline underline-offset-2 mt-[5%] mb-5" style={{ textShadow: "1.5px 1.5px #4b5563" }}>
              Global Warming and Climate Change
            </h1>
          </Link>
          <div className="flex flex-wrap justify-center items-stretch m-auto">
            {navbarLinks.filter(link => link.path !== "/").map((link) => (
              <Link key={link.name} to={link.path} className="w-[152px] m-3 p-3 rounded font-medium text-gray-600 bg-gray-200 hover:scale-110 transition-all duration-500 tracking-[1px] flex justify-center items-center" style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)" }}>
                <span className="break-all">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
