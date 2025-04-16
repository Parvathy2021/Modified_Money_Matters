import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./NavHeader.css";

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'



const NavHeader = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const hiddenRoutes = ["/", "/login", "/register", "/forgotpassword"];
  if (!user || hiddenRoutes.includes(location.pathname)) return null;

  const handleLogout = async (e) => {
      e.preventDefault();
    try {
      await fetch('http://localhost:8080/logout', {
        credentials: 'include'
      });
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  }
  return (
    <div className="bg-black mt-16 border-b border-lightblue">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left side - App name and welcome message */}
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold text-offwhite">
            Money Matters
          </span>
          <span className="text-offwhite">
            Welcome, {user.username}
          </span>
        </div>

        {/* Right side - Status indicator and logout */}
        <div className="flex items-center gap-4">
          <span className="flex items-center text-offwhite">
            <span className="h-2 w-2 bg-lightgreen rounded-full mr-2"></span>
            Online
          </span>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                Menu
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <Link to="/profile">
                    <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                      Profile
                    </button>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/about">
                    <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                      About
                    </button>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/contact">
                    <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                      Contact
                    </button>
                  </Link>
                </MenuItem>
                <form action="#" method="POST">
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      type="button"
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </form>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </nav>
    </div>
  );
};

export default NavHeader;