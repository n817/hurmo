import { useState } from "react";
import { Link } from "react-router-dom";

import "./Header.css";

import Contact from "../Contact/Contact";
import Logo from "../../assets/icons/hurmo_research_mainlogo.svg";

// Absolute targets so the nav also works from a solution page, not just home.
const links = [
  { to: "/#about", label: "Home" },
  { to: "/#solutions", label: "Solutions" },
  { to: "/#clients", label: "Clients" },
  { to: "/#contacts", label: "Contacts" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className={`navbar ${isOpen ? "navbar_open" : ""}`}>
        <Link className="navbar__brand" to="/" onClick={() => setIsOpen(false)}>
          <img src={Logo} alt="Logo" className="navbar__logo" />
        </Link>

        <button
          type="button"
          className={`navbar__toggle ${isOpen ? "navbar__toggle_close" : ""}`}
          aria-expanded={isOpen}
          aria-controls="navbar__links"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen((open) => !open)}
        ></button>

        <nav
          id="navbar__links"
          className={`navbar__links${isOpen ? " navbar__links_open" : ""}`}
        >
          {links.map((link) => (
            <Link
              className="navbar__link"
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {isOpen && (
            <div className="navbar__contacts">
              <Contact />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
