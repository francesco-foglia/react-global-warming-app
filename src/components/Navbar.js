import { Link, useLocation } from 'react-router-dom';
import { getNavbarLinks } from "../utils/api";

function Navbar() {

  const location = useLocation();
  const navbarLinks = getNavbarLinks();

  return (
    <header className="w-full min-h-[50px] bg-gray-200 fixed top-0 left-0">
      <nav className="2xl:container w-full min-h-[50px] mx-auto px-[5%] flex flex-wrap justify-center min-[801px]:justify-between items-center">
        {navbarLinks.map((link) => (
          <Link key={link.name} to={link.path} className={`${location.pathname === link.path ? "underline underline-offset-2" : ""} m-2.5 text-gray-600 font-medium hover:underline hover:underline-offset-2`}>
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
