import React from "react";
import Pagination from "../pagination/Pagination";
import Image from "next/image";
import Card from "../card/Card";

const getData = async (page, cat) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return { posts: [], count: 0 }; // Return empty data if fetch fails
    }

    return await res.json();
  } catch (error) {
    return { posts: [], count: 0 }; // Return empty data on error
  }
};

const CardList = async ({ page, cat }) => {
  const { posts, count } = await getData(page, cat);

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  console.log("Posts:", posts);

  return (
    <div>
      <h1>Recent Posts</h1>
      <div>
        {posts?.length > 0 ? (
          posts.map((item) => (
            <Card item={item} key={item.id} />
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
