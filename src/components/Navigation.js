import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <header>
        <nav className="flex justify-around bg-blue-200 py-4 ">
          <Link to="/">Products</Link>

          <Link to="/analytics">Analytics</Link>
        </nav>
      </header>
    </>
  );
};

export default Navigation;
