import React from "react";

const NotFound = () => {
  return (
    <div className="container" style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "white", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", fontWeight: "bold" }}>404</div>
        <div style={{ fontSize: "3rem", fontWeight: "bold" }}>NOT FOUND</div>
      </div>
    </div>
  );
};

export default NotFound;
