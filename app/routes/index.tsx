import React from "react";
import { Link } from "remix";

const IndexPage = () => {
  return (
    <div>
      <Link to="/users">List Users</Link>
    </div>
  );
};

export default IndexPage;
