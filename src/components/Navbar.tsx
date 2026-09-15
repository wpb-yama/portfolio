"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/lab", label: "Lab" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileOpen]);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">

      {/* Desktop floating pill */}
      <nav className="hidden md:flex pointer-events-auto items-center gap-1 px-2 py-2 rounded-full bg-white/85 backdrop-blur-md border border-black/8 shadow-sm">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 ${
              pathname === href
                ? "bg-[#1C1C1C] text-white"
                : "text-[#888] hover:text-[#1C1C1C] hover:bg-black/5"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Mobile floating button + dropdown */}
      <div ref={menuRef} className="md:hidden pointer-events-auto relative">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/85 backdrop-blur-md border border-black/8 shadow-sm text-[#1C1C1C] transition-colors"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          <span className="text-sm font-medium">Menu</span>
        </button>

        {mobileOpen && (
          <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl border border-black/8 shadow-lg overflow-hidden py-1.5 min-w-[140px]">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${
                  pathname === href
                    ? "text-[#1C1C1C] bg-black/5"
                    : "text-[#888] hover:text-[#1C1C1C] hover:bg-black/5"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>

    </header>
  );
}
