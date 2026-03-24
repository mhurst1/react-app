// Matthew Hurst | CSCE 242 

import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header id="main-header">
      <h1>Fitness Planner</h1>

      <button
        id="nav-toggle"
        aria-label="Toggle Navigation"
        onClick={() => setNavOpen((prev) => !prev)}
      >
        ☰
      </button>

      <nav id="main-nav" className={navOpen ? "show" : ""}>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/exercises">Exercises</Link></li>
            <li><Link to="/nutrition">Nutrition</Link></li>
            <li><Link to="/tutorials">Tutorials</Link></li>
            <li><Link to="/case-studies">Case Studies</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}