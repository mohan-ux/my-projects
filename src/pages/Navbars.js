import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbars() {
  return (
    <div className="navbar">
      <div className="togglebutton">
        <button></button>
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/Second">Second</Link>
        <Link to="/Third">Third</Link>
      </div>
    </div>
  );
}
export default Navbars;
