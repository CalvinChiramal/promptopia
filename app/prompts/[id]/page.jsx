"use client";

import Form from "@components/Form";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import Loader from "@components/Loader";
import useAuth from "@hooks/useAuth";
import { SESSION_STATES } from "@constants";

const EditPrompt = () => {
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { id: postId } = useParams();
  const router = useRouter();

  const { status, NoPermissions } = useAuth({
    errorMessage: "Please sign in to edit this prompt",
  });

  const editPrompt = async e => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/prompts/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/prompts/${postId}`, {
          method: "GET",
        });
        const data = await response.json();

        setPost({ prompt: data.prompt, tag: data.tag });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    postId && fetchPost();
  }, [postId]);

  if (isLoading || status === SESSION_STATES.loading) {
    return <Loader />;
  }

  if (status === SESSION_STATES.unauthenticated) {
    return <NoPermissions />;
  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  );
};

export default EditPrompt;
