"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import UserProfile from "@components/UserProfile";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  const handleEdit = () => {};

  const handleDelete = async () => {};
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `/api/prompts?creator=${session?.user.id}`,
          { method: "GET" },
        );
        const data = await response.json();

        setPosts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    session?.user && fetchPosts();
  }, []);

  if (isLoading) {
    return <div className="w-screen h-screen text-center">Loading...</div>;
  }

  return (
    <UserProfile
      name="My"
      description="Welcome to your personalized profile page"
      posts={posts}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default Profile;
