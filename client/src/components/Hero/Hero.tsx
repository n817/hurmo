import { Link } from "react-router-dom";

import "./Hero.css";

import heroIllustration from "../../assets/hero/hero.jpeg";

export function Hero() {
  return (
    <section id="about" className="hero section">
      <div className="section__inner hero__inner">
  <div className="hero__content">
          <span className="hero__eyebrow">Welcome to HURMO.UZ</span>
          <h1 className="hero__title">
            Transforming Data<br />Into Growth
          </h1>
          <p className="hero__description">
            We build bridges between people and brands. Get deep consumer understanding and optimize your business strategies with Uzbekistan's leading market research company.
          </p>
          
          <div className="hero__actions">
            <Link className="button button_primary" to="/#solutions">
              Explore Solutions <span className="arrow">→</span>
            </Link>
            <Link className="button button_secondary" to="/#contacts">
              Contact Us
            </Link>
          </div>
          
          <p className="hero__trust">
            Trusted by global brands • Research across Uzbekistan
          </p>
        </div>
        <div className="hero__illustration">
          <img src={heroIllustration} alt="Data Analytics and Growth" />
        </div>
      </div>
    </section>
  );
}
