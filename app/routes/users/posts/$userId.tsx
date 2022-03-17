import React from "react";
import { LoaderFunction, useLoaderData } from "remix";
import invariant from "tiny-invariant";

// Data function
import { getPostsByUserId } from "~/data/users";

// Styles
import userStyles from "~/styles/users.css";

// Types
import type { Post } from "~/data/users";

// API data loader function
export const loader: LoaderFunction = async ({ params }) => {
  const id = Number(params.userId);
  invariant(id, "expected a post id for user");
  return await getPostsByUserId(id);
};

// Links loader
export const links = () => {
  return [{ rel: "stylesheet", href: userStyles }];
};

const UserPostId = () => {
  // hooks
  const posts = useLoaderData<Post[]>();

  return (
    <div className="allPostsContainer">
      <h1>Posts by user</h1>
      <div>
        {posts.map((post) => (
          <div key={post.title}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPostId;
