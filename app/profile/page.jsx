"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import UserProfile from "@components/UserProfile";
import Loader from "@components/Loader";
import useAuth from "@hooks/useAuth";
import { SESSION_STATES } from "@constants";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { session, status } = useAuth({});
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/prompts?creator=${session?.user.id}`, {
        method: "GET",
      });
      const data = await response.json();

      setPosts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = post => {
    router.push(`/prompts/${post._id}`);
  };

  const handleDelete = async post => {
    try {
      await fetch(`/api/prompts/${post._id}`, { method: "DELETE" });
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    session?.user && fetchPosts();
  }, []);

  if (isLoading || status === SESSION_STATES.loading) {
    return <Loader />;
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
