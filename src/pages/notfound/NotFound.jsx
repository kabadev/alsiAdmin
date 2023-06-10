import React from "react";
import "./notfound.css";
const NotFound = () => {
  return (
    <div className="notfound">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <div className="action__btn__center">
        <a href="/" className=" btn btn__primary">
          Home Page
        </a>
      </div>
    </div>
  );
};

export default NotFound;
