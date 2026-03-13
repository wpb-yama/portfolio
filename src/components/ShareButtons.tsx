"use client";

import { useState } from "react";
import { Link2, Linkedin, Twitter } from "lucide-react";

export default function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined"
    ? `${window.location.origin}/articles/${slug}`
    : `/articles/${slug}`;

  async function copyLink() {
    await navigator.clipboard.writeText(
      `${window.location.origin}/articles/${slug}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const btnClass =
    "bg-white border border-[#EBEBEB] rounded-lg px-3 py-[7px] text-[12px] text-[#888] flex items-center gap-2 hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-colors duration-150 w-full";

  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-[#AAA] mb-3">
        Share
      </p>
      <div className="flex flex-col gap-2">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={btnClass}
        >
          <Twitter size={13} strokeWidth={1.8} /> Share on X
        </a>
        <a
          href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={btnClass}
        >
          <Linkedin size={13} strokeWidth={1.8} /> Share on LinkedIn
        </a>
        <button onClick={copyLink} className={btnClass}>
          <Link2 size={13} strokeWidth={1.8} />
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
