import { Link, useLocation } from 'react-router-dom';

function Navbar() {

  const location = useLocation();

  const navbarLinks = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/temperature",
      name: "Temperature",
    },
    {
      path: "/carbon-dioxide",
      name: "CarbonDioxide",
    },
    {
      path: "/methane",
      name: "Methane",
    },
    {
      path: "/nitrous-oxide",
      name: "NitrousOxide",
    },
    {
      path: "/polar-ice",
      name: "PolarIce",
    }
  ];

  return (
    <div className="w-full min-h-[50px] flex flex-wrap justify-center items-center fixed top-0 left-0 z-[1] bg-gray-200">
      {navbarLinks.map((link) => (
        <Link key={link.name} to={link.path} className={`${location.pathname === link.path ? "underline" : ""} m-2`}>
          {link.name}
        </Link>
      ))}
    </div>
  );
}

export default Navbar;
