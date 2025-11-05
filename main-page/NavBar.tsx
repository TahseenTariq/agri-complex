"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Reports", href: "/reports" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact", href: "/contact" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="shadow-md" style={{ backgroundColor: "#191970" }}>
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Hamburger Menu Button - Mobile Only */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-[#2E2E8B] transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#191970]"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex justify-center items-center space-x-2 xl:space-x-4 flex-1">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`block px-4 xl:px-8 py-2 xl:py-4 text-white font-semibold text-sm xl:text-lg transition-colors rounded-lg ${
                      isActive ? "border-b-2 border-white" : ""
                    }`}
                    style={{
                      backgroundColor: isActive ? "#2E2E8B" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "#2E2E8B";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Search Button - Desktop */}
          <div className="hidden lg:block">
            <button
              className="block px-4 py-4 text-white hover:bg-[#2E2E8B] transition-colors rounded-lg"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-2">
            <ul className="flex flex-col space-y-2">
              {navigationLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 text-white font-semibold text-base transition-colors rounded-lg ${
                        isActive ? "border-l-4 border-white" : ""
                      }`}
                      style={{
                        backgroundColor: isActive ? "#2E2E8B" : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "#2E2E8B";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2">
                <button
                  className="w-full flex items-center justify-center px-4 py-3 text-white hover:bg-[#2E2E8B] transition-colors rounded-lg"
                  aria-label="Search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span className="ml-2 font-semibold">Search</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

