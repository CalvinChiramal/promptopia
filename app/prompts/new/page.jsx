"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import useAuth from "@hooks/useAuth";
import Loader from "@components/Loader";
import { SESSION_STATES } from "@constants";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const router = useRouter();

  const { session, status, NoPermissions } = useAuth({
    errorMessage: "Please login to create a prompt",
  });

  const createPrompt = async e => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompts/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (status === SESSION_STATES.loading) {
    return <Loader />;
  }

  if (status === SESSION_STATES.unauthenticated) {
    return <NoPermissions />;
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
