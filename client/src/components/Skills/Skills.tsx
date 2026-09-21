import { clientGroups } from "../../data/clients";
import "./Skills.css";

export function Skills() {
  return (
    <section id="clients" className="skills section">
      <div className="section__inner">
        <h2 className="section__title">Our Clients</h2>
        <div className="skills__grid">
          {clientGroups.map((group) => (
            <div key={group.category} className="skills-group">
              <h3 className="skills__group-title">{group.category}</h3>
              <ul className="skills__list">
                {group.items.map((item) => (
                  <li key={item} className="skills__tag">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
