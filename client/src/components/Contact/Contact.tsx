import "./Contact.css";
import { profile } from "../../data/profile";

export default function Contact() {
  return (
    <div className="contact">
      <ul className="contact__list">
        <li>
          <a
            href={`mailto:${profile.email}`}
            className="contact__link contact__link_email"
          >
            {profile.email}
          </a>
        </li>
        <li>
          <a
            href={profile.locationUrl}
            target="_blank"
            rel="noreferrer"
            className="contact__link contact__link_location"
          >
            {profile.locationText}
          </a>
        </li>
        {/* <li>
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            download
            className="contact__link contact__link_resume"
          >
            Download my resume (PDF)
          </a>
        </li> */}
      </ul>
      {/* <ul className="contact__social-list">
        <li>
          <a href="" className="contact__social contact__social_github"></a>
        </li>
        <li>
          <a href="" className="contact__social contact__social_linkedin"></a>
        </li>
        <li>
          <a href="" className="contact__social contact__social_twitter"></a>
        </li>
      </ul> */}
    </div>
  );
}
