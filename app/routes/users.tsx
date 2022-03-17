import React from "react";
import { useLoaderData, Link, Outlet } from "remix";

// Styles
import userStyles from "~/styles/users.css";

// Types
import type { User } from "~/data/users";

// Data functions
import { getUsers } from "~/data/users";

// API data loader function
export const loader = async () => {
  return await getUsers();
};

// Links loader function
export const links = () => {
  return [{ rel: "stylesheet", href: userStyles }];
};

export default function Users() {
  // hooks
  const usersData = useLoaderData<User[]>();

  return (
    <div className="mainContainer">
      <div>
        <div style={{ margin: "0 2em" }}>
          <h1>All Users</h1>
          <Link to="/users/new">
            <p>Create new post</p>
          </Link>
        </div>
        <div className="usersContainer">
          {usersData.map((user, indx) => (
            <div key={user.username}>
              <img
                width="128"
                height="128"
                src={`https://picsum.photos/id/${indx}/128`}
              />
              <p>{user.name}</p>
              <p>
                <Link to={`/users/${user.id}`}>See user full details</Link>
              </p>
              <p>
                <Link to={`/users/posts/${user.id}`}>See Posts by user</Link>
              </p>
            </div>
          ))}
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
