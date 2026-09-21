import { useState } from "react";

import "./Header.css";

// import { profile } from "../../data/profile.ts";
import Contact from "../Contact/Contact";
import Logo from "../../assets/icons/hurmo_research_mainlogo.svg"

const links = [
  { href: "#about", label: "Home" },
  { href: "#solutions", label: "Solutions" },
  { href: "#clients", label: "Clients" },
  { href: "#contacts", label: "Contacts" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className={`navbar ${isOpen ? "navbar_open" : ""}`}>
        <a
          className="navbar__brand"
          href="#home"
          onClick={() => setIsOpen(false)}
        >
          <img src={Logo} alt="Logo" className="navbar__logo" />
        </a>

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
            <a
              className="navbar__link"
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
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
