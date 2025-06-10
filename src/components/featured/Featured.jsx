import React from "react";
import Image from "next/image";

const Featured = () => {
  return (
    <div>
      <h1>
        <b>Hey, lama dev here!</b> Discover my stories and creative ideas.
      </h1>
      <div>
        <div>
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            alt="Random"
            width={400}
            height={300}
          />
        </div>
        <div>
          <h1>Lorem ipsum dolor sit amet alim consectetur adipisicing elit.</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Cupiditate, quam nisi magni ea laborum inventore voluptatum
            laudantium repellat ducimus unde aspernatur fuga. Quo, accusantium
            quisquam! Harum unde sit culpa debitis.
          </p>
          <button>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
