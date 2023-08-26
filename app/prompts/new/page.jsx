"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import useAuth from "@hooks/useAuth";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const router = useRouter();
  const { data: session } = useSession();

  const { isUserSignedIn, NoPermissions } = useAuth({
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

  if (!isUserSignedIn) {
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
