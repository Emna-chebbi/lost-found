import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#ddd" }}>
      <Link to="/" style={{ margin: "0 10px" }}>Home</Link> |
      <Link to="/browse" style={{ margin: "0 10px" }}>Browse Lost Items</Link> |
      <Link to="/claim" style={{ margin: "0 10px" }}>Claim an Item</Link> |
      <Link to="/create-item" style={{ margin: "0 10px" }}>Create Lost Item</Link>
      <Link to="/search" style={{ margin: "0 10px" }}>Search Lost Item</Link>
    </nav>
  );
}

export default Navbar;
