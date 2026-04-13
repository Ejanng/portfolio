type HeroProps = {
  name: string;
  role: string;
  location: string;
  imageUrl: string;
  imageAlt: string;
  projectCount: number;
};

export default function Hero({ name, role, location, imageUrl, imageAlt, projectCount }: HeroProps) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <header className="hero reveal-on-scroll">
      <div className="hero__intro">
        <div className="hero__identity">
          <div className="hero__avatar" aria-label="Profile image">
            {imageUrl ? (
              <img src={imageUrl} alt={imageAlt} />
            ) : (
              <span className="hero__avatar-fallback">{initials || 'ME'}</span>
            )}
          </div>

          <div className="hero__details">
            <p className="eyebrow">{location}</p>
            <h1 className="hero__name">{name}</h1>
            <p className="hero__copy">{role}</p>
          </div>
        </div>
      </div>

      <div className="hero__meta">
        <div className="hero__stat">
          <span className="hero__stat-value">{projectCount.toString().padStart(2, '0')}</span>
          <span className="hero__stat-label">Projects included</span>
        </div>
        <div className="hero__stat">
          <span className="hero__stat-value hero__stat-value--text" title={role}>
            {role}
          </span>
          <span className="hero__stat-label">Primary role</span>
        </div>
        <div className="hero__stat">
          <span className="hero__stat-value hero__stat-value--text" title={location}>
            {location}
          </span>
          <span className="hero__stat-label">Home Town</span>
        </div>
      </div>
    </header>
  );
}
