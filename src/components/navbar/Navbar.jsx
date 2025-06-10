import React from "react";
import Image from "next/image";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { FaYoutube } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b shadow-sm bg-white dark:bg-gray-900">
      {/* Social Icons */}
      <div className="flex gap-4">
        <FaSquareInstagram />
        <FaXTwitter />
        <FaYoutube />
      </div>

      {/* Logo */}
      <div className="text-xl font-bold text-gray-900 dark:text-white">lamablog</div>

      {/* Links */}
      <div className="flex items-center gap-6 text-gray-700 dark:text-gray-300">
        <ThemeToggle />
        <Link href="/" className="hover:text-blue-600">Homepage</Link>
        <Link href="/contact" className="hover:text-blue-600">Contact</Link>
        <Link href="/about" className="hover:text-blue-600">About</Link>
        <AuthLinks />
      </div>
    </nav>
  );
};

export default Navbar;
