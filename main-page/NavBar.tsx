"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Reports", href: "/reports" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact", href: "/contact" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="shadow-md" style={{ backgroundColor: "#191970" }}>
      <div className="px-6 py-4">
        <ul className="flex justify-center items-center space-x-4">
          {navigationLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`block px-8 py-4 text-white font-semibold text-lg transition-colors rounded-lg ${
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
          <li className="ml-4">
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
          </li>
        </ul>
      </div>
    </nav>
  );
}

