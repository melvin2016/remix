import React from "react";
import { LoaderFunction, useLoaderData } from "remix";
import invariant from "tiny-invariant";

// Styles
import userStyles from "~/styles/users.css";

// Types
import type { User } from "~/data/users";

// Data function
import { getUserById } from "~/data/users";

// API data loader function
export const loader: LoaderFunction = async ({ params }) => {
  const id = Number(params.id);
  invariant(id, "expected an `id` to retrive user details");
  return await getUserById(Number(params.id));
};

// Links loader function
export const links = () => {
  return [{ rel: "stylesheet", href: userStyles }];
};

const UserId = () => {
  const userData = useLoaderData<User>();
  return (
    <div className="singleUserContainer">
      <h1>User Details</h1>
      <div>
        <img
          width="128"
          height="128"
          src={`https://picsum.photos/id/${userData.id}/128`}
        />
        <p>Name: {userData.name}</p>
        <p>Username: {userData.username}</p>
        <p>
          Address:{" "}
          {Object.values(userData.address)
            .filter((value) => typeof value !== "object")
            .toString()}
        </p>
        <p>Comapany: {userData.company.name}</p>
        <p>Phone: {userData.phone}</p>
        <p>Website: {userData.website}</p>
        <div>
          <a href={`mailto:${userData.email}`}>Send Mail</a>
        </div>
      </div>
    </div>
  );
};

export default UserId;
