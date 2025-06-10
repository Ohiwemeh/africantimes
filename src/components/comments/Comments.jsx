"use client";

import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const Comments = ({ postSlug }) => {
  const { status } = useSession();

  const { data, mutate, isLoading } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
    });
    mutate();
  };

  return (
    <div>
      <h1>Comments</h1>
      {status === "authenticated" ? (
        <div>
          <textarea
            placeholder="write a comment..."
            onChange={(e) => setDesc(e.target.value)}
          />
          <button onClick={handleSubmit}>Send</button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div>
        {isLoading
          ? "loading"
          : data?.map((item) => (
              <div key={item._id}>
                <div>
                  {item?.user?.image && (
                    <Image
                      src={item.user.image}
                      alt=""
                      width={50}
                      height={50}
                    />
                  )}
                  <div>
                    <span>{item.user.name}</span>
                    <span>{item.createdAt}</span>
                  </div>
                </div>
                <p>{item.desc}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Comments;
