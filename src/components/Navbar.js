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
    <header className="w-full min-h-[50px] bg-gray-200">
      <nav className="2xl:container w-full min-h-[50px] mx-auto px-[5%] flex flex-wrap justify-center sm:justify-between items-center">
        {navbarLinks.map((link) => (
          <Link key={link.name} to={link.path} className={`${location.pathname === link.path ? "underline" : ""} m-2`}>
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
