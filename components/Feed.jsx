"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/prompts", { method: "GET" });
        const data = await response.json();

        setPosts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div className="w-screen h-screen text-center">Loading...</div>;
  }

  return (
    <div className="mt-16 prompt_layout">
      {posts.map(post => (
        <PromptCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
