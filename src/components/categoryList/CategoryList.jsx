import React from "react";
import Link from "next/link";
import Image from "next/image";

const getData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/categories", {
      cache: "no-store",
    });

    if (!res.ok) {
      return []; // Return empty array if fetch fails
    }

    const json = await res.json();
    return Array.isArray(json) ? json : json.data;
  } catch (error) {
    return []; // Return empty array on error
  }
};

const getRandomImage = () =>
  `https://source.unsplash.com/random/32x32?sig=${Math.floor(Math.random() * 1000)}`;

const CategoryList = async () => {
  const data = await getData();
  return (
    <div>
      <h1>Popular Categories</h1>
      <div>
        {data?.length > 0 ? (
          data.map((item) => (
            <Link href="/blog?cat=style" key={item._id}>
              <>
                <Image
                  src={getRandomImage()}
                  alt="Random category"
                  width={32}
                  height={32}
                />
                {item.title}
              </>
            </Link>
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
