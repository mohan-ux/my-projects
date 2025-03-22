import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        AI Learning
      </Link>
      <nav>
        <Link to="/" className="active">
          Home
        </Link>
        <Link to="/assessment">Skill Assessment</Link>
        <Link to="/learning">Learning Path</Link>
        <Link to="/certification">Certification</Link>
        <Link to="/signin" className="auth-link">
          Sign In / Log In
        </Link>
      </nav>
    </header>
  );
}

export default Header;
