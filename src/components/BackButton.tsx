"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface Props {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: Props) {
  const cls =
    "inline-flex items-center gap-1.5 text-[12px] font-medium text-[#888] border border-[#EBEBEB] rounded-full px-3.5 py-1.5 hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-all duration-150 bg-white";

  return (
    <>
      {/* Inline — desktop only */}
      <Link href={href} className={`hidden lg:inline-flex ${cls} mb-10`}>
        <ChevronLeft size={13} strokeWidth={2.5} />
        {label}
      </Link>

      {/* Floating — mobile only, always visible */}
      <Link
        href={href}
        className={`lg:hidden fixed bottom-6 left-4 z-50 shadow-md ${cls}`}
        style={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(255,255,255,0.92)" }}
      >
        <ChevronLeft size={13} strokeWidth={2.5} />
        {label}
      </Link>
    </>
  );
}
