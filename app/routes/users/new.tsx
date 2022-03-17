import React from "react";
import invariant from "tiny-invariant";
import {
  Form,
  ActionFunction,
  json,
  useActionData,
  useTransition,
} from "remix";

// Data loader function
import { createPostByUserId } from "~/data/users";

// Styles
import userStyles from "~/styles/users.css";

// Links loader
export const links = () => {
  return [{ rel: "stylesheet", href: userStyles }];
};

// Types
import type { Post } from "~/data/users";
interface PostError {
  fields: {
    title?: boolean;
    body?: boolean;
  };
  action: "error";
}
interface PostWithAction extends Post {
  action: "post";
}

// Action Handler
export const action: ActionFunction = async ({ request }) => {
  // get the form data object
  const formData = await request.formData();

  // get all required input fields
  const userId = 1;
  const title = formData.get("title");
  const body = formData.get("body");

  // check if every fields exists in form data
  const errors: PostError = { fields: {}, action: "error" };
  if (!body) errors.fields.body = true;
  if (!title) errors.fields.title = true;
  if (Object.keys(errors.fields).length) {
    return json(errors);
  }

  // check if every fields are of correct types
  invariant(typeof body === "string");
  invariant(typeof title === "string");

  const data = await createPostByUserId({
    body,
    title,
    userId,
  }).then((data) => data.json());

  return json({ ...data, action: "post" } as PostWithAction);
};

const UserNew = () => {
  // hooks
  const data = useActionData<PostWithAction | PostError>();
  const transition = useTransition();
  return (
    <div className="createNewPostContainer">
      {transition.state === "submitting" && (
        <div style={{ color: "orange" }}>Trying to create a blog</div>
      )}
      {data?.action === "error" && <div style={{ color: "red" }}>Error</div>}
      {data?.action === "post" && (
        <div style={{ color: "green" }}>Created the blog on {data.title}</div>
      )}

      <Form method="post">
        <p>
          <p>
            {data?.action === "error" && data.fields.title && (
              <div style={{ color: "red" }}>please enter title</div>
            )}
          </p>
          <label htmlFor="title">Title of the post</label>
          <br />
          <input id="title" type="text" name="title" />
        </p>
        <p>
          <p>
            {data?.action === "error" && data.fields.body && (
              <div style={{ color: "red" }}>please enter body</div>
            )}
          </p>
          <label htmlFor="body">Body of the post</label>
          <br />
          <textarea id="body" name="body" rows={10} cols={20} />
        </p>
        <p>
          <button type="submit">Create Post</button>
        </p>
      </Form>
    </div>
  );
};

export default UserNew;
