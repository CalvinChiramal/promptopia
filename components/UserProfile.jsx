import PromptCard from "./PromptCard";

const UserProfile = ({
  name,
  description,
  posts,
  handleDelete,
  handleEdit,
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left blue_gradient">{name} Profile</h1>
      <p className="desc text-left">{description}</p>
      <div className="mt-16 prompt_layout">
        {posts.map(post => (
          <PromptCard
            key={post._id}
            post={post}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </section>
  );
};

export default UserProfile;
