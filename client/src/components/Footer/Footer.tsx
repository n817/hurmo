import "./Footer.css";
import Contact from "../Contact/Contact";

export function Footer() {
  return (
    <section id="contacts" className="footer section">
      <div className="section__inner footer__inner">
        <h2 className="section__title section__title_footer">Contacts</h2>
        <p className="footer__blurb">
          Contact us and we will discuss your needs and offer the optimal
          solution that will exceed your expectations!
        </p>
      </div>
      <Contact />
    </section>
  );
}
