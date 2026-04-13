import type { Profile } from '../types';

type ResumeSectionsProps = {
  profile: Profile;
};

export default function ResumeSections({ profile }: ResumeSectionsProps) {
  return (
    <section
      id="resume"
      className="section-block section-block--resume reveal-on-scroll"
      aria-labelledby="resume-heading"
    >
      <div className="section-block__header">
        <p className="eyebrow">Resume</p>
        <h2 id="resume-heading">Experience, education, and contact.</h2>
      </div>

      <div className="resume-grid">
        <article className="resume-card">
          <h3>Experience</h3>
          <ul className="resume-list" aria-label="Experience">
            {profile.experience.map((item) => (
              <li key={`${item.title}-${item.period}`}>
                <p className="resume-list__title">{item.title}</p>
                <p className="resume-list__meta">
                  {item.organization} / {item.period}
                </p>
                <p className="resume-list__summary">{item.summary}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="resume-card">
          <h3>Education</h3>
          <ul className="resume-list" aria-label="Education">
            {profile.education.map((item) => (
              <li key={`${item.program}-${item.period}`}>
                <p className="resume-list__title">{item.program}</p>
                <p className="resume-list__meta">
                  {item.institution} / {item.period}
                </p>
              </li>
            ))}
          </ul>
        </article>

        <article className="resume-card">
          <h3>Contact</h3>
          <ul className="contact-list" aria-label="Contact links">
            {profile.contacts.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.value}
                </a>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
