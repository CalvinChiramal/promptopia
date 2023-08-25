import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async req => {
  const creator = req.nextUrl.searchParams.get("creator");
  try {
    await connectToDB();
    const prompts = creator
      ? await Prompt.find({ creator }).populate("creator")
      : await Prompt.find().populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
