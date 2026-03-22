"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  FolderOpen,
  FileText,
  FlaskConical,
  Mail,
  Linkedin,
  Download,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Homepage", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/lab", label: "Lab", icon: FlaskConical },
  { href: "/articles", label: "Articles", icon: FileText },
  { href: "/about", label: "About", icon: User },
];

function NavLink({
  href,
  label,
  Icon,
  active,
  onClick,
}: {
  href: string;
  label: string;
  Icon: React.ElementType;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2.5 transition-colors duration-150 ${
        active
          ? "rounded-full bg-black/[0.10] text-[#1C1C1C]"
          : "rounded-full text-[#888888] hover:text-[#1C1C1C] hover:bg-black/[0.05]"
      }`}
    >
      <Icon size={18} strokeWidth={1.8} />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

function SidebarContent({
  pathname,
  onLinkClick,
}: {
  pathname: string;
  onLinkClick?: () => void;
}) {
  return (
    <div className="flex flex-col h-full py-8 px-4">
      {/* Profile */}
      <div className="flex flex-col items-center text-center mb-10 px-2">
        <Link href="/" className="mb-4 flex-shrink-0 block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/sticker-will.png"
            alt="Home"
            style={{ width: 72, height: 72, objectFit: 'contain', display: 'block' }}
          />
        </Link>
        <p className="font-bold text-[#1C1C1C] text-base leading-tight">Will Booth</p>
        <p className="text-[#888888] text-xs mt-1">Senior Product Manager</p>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 flex-1">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <NavLink
            key={href}
            href={href}
            label={label}
            Icon={Icon}
            active={pathname === href}
            onClick={onLinkClick}
          />
        ))}
        {/* Contact — opens Gmail compose */}
        <a
          href="https://mail.google.com/mail/?view=cm&to=wpb665@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onLinkClick}
          className="flex items-center gap-3 px-4 py-2.5 rounded-full transition-colors duration-150 text-[#888888] hover:text-[#1C1C1C] hover:bg-black/5"
        >
          <Mail size={18} strokeWidth={1.8} />
          <span className="text-sm font-medium">Contact</span>
        </a>
      </nav>

      {/* Footer links */}
      <div className="flex flex-col gap-2 pt-6 border-t border-black/8">
        <a
          href="https://www.linkedin.com/in/wboothuk/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2.5 rounded-full text-[#888888] hover:text-[#1C1C1C] hover:bg-black/5 transition-colors duration-150"
        >
          <Linkedin size={18} strokeWidth={1.8} />
          <span className="text-sm font-medium">LinkedIn</span>
        </a>
        <a
          href="/cv.pdf"
          download="Will_Booth_CV.pdf"
          className="flex items-center gap-3 px-4 py-2.5 rounded-full text-[#888888] hover:text-[#1C1C1C] hover:bg-black/5 transition-colors duration-150"
        >
          <Download size={18} strokeWidth={1.8} />
          <span className="text-sm font-medium">Download CV</span>
        </a>
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    function handleClick(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-52 bg-[#FFFFFF] z-40">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* ── Mobile top bar ── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#FFFFFF] flex items-center justify-between px-4 z-40">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sticker-will.png" alt="Will Booth" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
          </div>
          <span className="font-bold text-[#1C1C1C] text-sm">Will Booth</span>
        </Link>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="p-2 rounded-full hover:bg-black/5 text-[#1C1C1C] transition-colors"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* ── Mobile overlay backdrop ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/30 z-40 transition-opacity" />
      )}

      {/* ── Mobile drawer ── */}
      <div
        ref={drawerRef}
        className={`lg:hidden fixed top-0 left-0 h-dvh w-64 bg-[#FFFFFF] z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent
          pathname={pathname}
          onLinkClick={() => setMobileOpen(false)}
        />
      </div>
    </>
  );
}
