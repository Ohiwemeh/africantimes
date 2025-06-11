import React from "react";
import Link from "next/link";
import Image from "next/image";
import MenuPosts from "../menuPosts/MenuPosts";


const Menu = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {/* Most Popular Section */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
          {"What's hot"}
        </h2>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Most Popular
        </h1>
        <MenuPosts withImage={false} />
      </div>

     
      {/* Editor's Pick Section */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
          Chosen by the editor
        </h2>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Editors Pick
        </h1>
        <MenuPosts withImage={true} />
      </div>
    </div>
  );
};

export default Menu;