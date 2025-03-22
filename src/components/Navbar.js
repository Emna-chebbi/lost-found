import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#6DC5D1",
        color: "white",
        width: "100%",
        padding: "15px",
        fontSize: "20px",
        fontWeight: "bold",
        position: "fixed",
        top: "0",
        left: "0",
        display: "flex",
        justifyContent: "space-between", 
        alignItems: "center", 
        zIndex: "1000", 
      }}
    >
      
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "white",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "white", 
          }}
        >
          Lost&Found
        </Link>
      </div>

      
      <div
        style={{
          display: "flex",
          justifyContent: "center", 
          alignItems: "center",
          flex: 1, 
        }}
      >
        <Link
          to="/browse"
          style={{
            margin: "0 15px", 
            textDecoration: "none",
            color: "white",
          }}
        >
          Lost Items
        </Link>
        |
        <Link
          to="/claim"
          style={{
            margin: "0 15px", 
            textDecoration: "none",
            color: "white",
          }}
        >
          Claim Item
        </Link>
        |
        <Link
          to="/create-item"
          style={{
            margin: "0 15px", 
            textDecoration: "none",
            color: "white",
          }}
        >
          Report Item
        </Link>
        |
        <Link
          to="/search"
          style={{
            margin: "0 15px", 
            textDecoration: "none",
            color: "white",
          }}
        >
          Search Items
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
