"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";

const navLinks = [
  { href: "/", label: "Analyze" },
  { href: "/compare", label: "Compare" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar-glass fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-purple)] flex items-center justify-center transition-transform group-hover:scale-110">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              meta<span className="text-[var(--accent-cyan)]">meal</span>
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-[var(--accent-cyan)] bg-[var(--accent-cyan-dim)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
