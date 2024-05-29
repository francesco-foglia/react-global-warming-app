import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Collapse } from 'react-collapse';

import { IconMenu2, IconX } from '@tabler/icons-react';
import { getNavbarLinks } from "../utils/utils";

interface NavbarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const navbarLinks = getNavbarLinks();

  return (
    <header className="w-full min-h-[50px] bg-gray-200 fixed top-0 left-0 z-[1]">
      <div className="lg:hidden w-full h-[50px] px-[5%] flex justify-end items-center">
        <button onClick={() => setCollapsed(!collapsed)}>
          {!collapsed && (
            <IconMenu2 size={25} strokeWidth={1.5} className="text-gray-600" />
          )}
          {collapsed && (
            <IconX size={25} strokeWidth={1.5} className="text-gray-600" />
          )}
        </button>
      </div>

      <Collapse isOpened={collapsed} className="block lg:hidden">
        <nav className="w-full h-auto mx-auto px-[5%] flex flex-col justify-center items-center lg:hidden">
          {navbarLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`${location.pathname === link.path ? "underline underline-offset-2" : ""} m-2.5 text-gray-600 font-medium`}
              onClick={() => setCollapsed(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </Collapse>

      <div className="hidden lg:block">
        <nav className="2xl:container mx-auto w-full h-[50px] px-[5%] flex flex-row justify-between items-center">
          {navbarLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`${location.pathname === link.path ? "underline underline-offset-2" : ""} m-2.5 text-gray-600 font-medium hover:underline hover:underline-offset-2`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
