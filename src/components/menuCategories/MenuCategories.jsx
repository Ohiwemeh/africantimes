import Link from "next/link";
import React from "react";

const MenuCategories = () => {
  return (
    <div className="grid grid-cols-6 gap-3">
      <Link
        href="/blog?cat=style"
        className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-3 rounded-lg text-sm font-medium hover:from-pink-600 hover:to-rose-600 transition-all duration-200 text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Style
      </Link>
      <Link 
        href="/blog"
        className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-3 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Fashion
      </Link>
      <Link 
        href="/blog"
        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Food
      </Link>
      <Link 
        href="/blog"
        className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-3 rounded-lg text-sm font-medium hover:from-green-600 hover:to-teal-600 transition-all duration-200 text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Travel
      </Link>
      <Link 
        href="/blog"
        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-3 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Culture
      </Link>
      <Link 
        href="/blog"
        className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-4 py-3 rounded-lg text-sm font-medium hover:from-gray-800 hover:to-black transition-all duration-200 text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Coding
      </Link>
    </div>
  );
};

export default MenuCategories;