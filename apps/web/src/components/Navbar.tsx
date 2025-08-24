// apps/web/components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // icons

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 80) {
        setVisible(false); // hide on scroll down
      } else {
        setVisible(true); // show on scroll up
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <header
      className={`fixed top-6 left-1/2 z-50 transform -translate-x-1/2 
      transition-all duration-500 
      w-[80%] max-w-5xl
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
      `}
    >
      <nav
        className="w-full px-6 py-3 rounded-full shadow-lg flex items-center justify-between
        bg-white/10 backdrop-blur-xl border border-white/20"
      >
        {/* Logo / Initials */}
        <span className="text-lg font-bold tracking-wide text-purple-400">HP</span>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10">
          <a href="#hero" className="hover:text-purple-400 transition">Home</a>
          <a href="#about" className="hover:text-purple-400 transition">About</a>
          <a href="#experience" className="hover:text-purple-400 transition">Experience</a>
          <a href="#projects" className="hover:text-purple-400 transition">Projects</a>
          <a href="#skills" className="hover:text-purple-400 transition">Skills</a>
          <a href="#contact" className="hover:text-purple-400 transition">Contact</a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-purple-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu (dropdown inside capsule) */}
      {menuOpen && (
        <div
          className="md:hidden mt-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg 
          flex flex-col items-center gap-4 py-4 animate-fadeIn"
        >
          <a href="#hero" className="hover:text-purple-400 transition">Home</a>
          <a href="#about" className="hover:text-purple-400 transition">About</a>
          <a href="#experience" className="hover:text-purple-400 transition">Experience</a>
          <a href="#projects" className="hover:text-purple-400 transition">Projects</a>
          <a href="#skills" className="hover:text-purple-400 transition">Skills</a>
          <a href="#contact" className="hover:text-purple-400 transition">Contact</a>
        </div>
      )}
    </header>
  );
}
