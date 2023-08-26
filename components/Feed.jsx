"use client";

import { useEffect, useState } from "react";

import PromptCard from "./PromptCard";
import Loader from "./Loader";

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
    return <Loader />;
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
