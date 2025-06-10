import React from "react";

import Link from "next/link";
import Image from "next/image";
import MenuPosts from "../menuPosts/MenuPosts";
import MenuCategories from "../menuCategories/MenuCategories";

const Menu = () => {
  return (
    <div >
      <h2 >{"What's hot"}</h2>
      <h1 >Most Popular</h1>
      <MenuPosts withImage={false} />
      <h2>Discover by topic</h2>
      <h1 >Categories</h1>
      <MenuCategories />
      <h2 >Chosen by the editor</h2>
      <h1 >Editors Pick</h1>
      <MenuPosts withImage={true} />
    </div>
  );
};

export default Menu;
