import Image from "next/image";
import Link from "next/link";
import React from "react";

const MenuPosts = ({ withImage }) => {
  return (
    <div>
      <Link href="/">
        {withImage && (
          <div>
            <Image src="/p1.jpeg" alt="" fill />
          </div>
        )}
        <div>
          <span>Travel</span>
          <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
          <div>
            <span>John Doe</span>
            <span> - 10.03.2023</span>
          </div>
        </div>
      </Link>
      <Link href="/">
        {withImage && (
          <div>
            <Image src="/p1.jpeg" alt="" fill />
          </div>
        )}
        <div>
          <span>Culture</span>
          <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
          <div>
            <span>John Doe</span>
            <span> - 10.03.2023</span>
          </div>
        </div>
      </Link>
      <Link href="/">
        {withImage && (
          <div>
            <Image src="/p1.jpeg" alt="" fill />
          </div>
        )}
        <div>
          <span>Food</span>
          <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
          <div>
            <span>John Doe</span>
            <span> - 10.03.2023</span>
          </div>
        </div>
      </Link>
      <Link href="/">
        {withImage && (
          <div>
            <Image src="/p1.jpeg" alt="" fill />
          </div>
        )}
        <div>
          <span>Fashion</span>
          <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
          <div>
            <span>John Doe</span>
            <span> - 10.03.2023</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MenuPosts;
