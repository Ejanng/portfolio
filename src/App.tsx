import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import ResumeSections from './components/ResumeSections';
import { loadProfile } from './lib/profile';
import { loadProjects } from './lib/projects';
import type { Profile, Project } from './types';

const fallbackProfile: Profile = {
  name: 'Your Name',
  role: 'Frontend Developer',
  location: 'Your City, Your Country',
  imageUrl: '',
  imageAlt: 'Profile photo',
  about: ['Write your short professional summary in public/profile.json.'],
  skills: [],
  experience: [],
  education: [],
  contacts: []
};

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile>(fallbackProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'about' | 'projects' | 'resume'>('about');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const [projectData, profileData] = await Promise.all([loadProjects(), loadProfile()]);

        if (!cancelled) {
          setProjects(projectData);
          setProfile(profileData);
        }
      } catch {
        if (!cancelled) {
          setError('Profile data could not be loaded.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal-on-scroll'));

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [loading, error, projects.length, profile.name]);

  useEffect(() => {
    const sections = ['about', 'projects', 'resume']
      .map((id) => document.getElementById(id))
      .filter((item): item is HTMLElement => Boolean(item));

    if (sections.length === 0) {
      return;
    }

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

        if (visible.length > 0) {
          const id = visible[0].target.id as 'about' | 'projects' | 'resume';
          setActiveSection(id);
        }
      },
      { threshold: [0.3, 0.45, 0.6], rootMargin: '-10% 0px -55% 0px' }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      sectionObserver.disconnect();
    };
  }, [loading, error, projects.length]);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        setScrollProgress(0);
        return;
      }

      const progress = Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100));
      setScrollProgress(progress);
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  const sortedProjects = useMemo(
    () => [...projects].sort((left, right) => Number(right.featured) - Number(left.featured)),
    [projects]
  );

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-100">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 h-1 bg-white/10" aria-hidden="true">
        <div
          className="h-full rounded-r-full bg-gradient-to-r from-sky-400 via-cyan-300 to-orange-300 shadow-[0_0_24px_rgba(125,211,252,0.45)]"
          style={{ width: `${scrollProgress}%` }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(scrollProgress)}
          aria-label="Page scroll progress"
        />
      </div>

      <div
        className="pointer-events-none absolute left-[-10rem] top-[-8rem] h-[30rem] w-[30rem] rounded-full bg-sky-400/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[-10rem] top-[14rem] h-[32rem] w-[32rem] rounded-full bg-orange-300/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <nav
          className="reveal-on-scroll sticky top-4 z-20 flex w-fit items-center gap-1 rounded-full border border-white/10 bg-slate-950/70 p-1 shadow-2xl shadow-black/25 backdrop-blur-xl"
          aria-label="Section navigation"
        >
          <a
            href="#about"
            className={
              activeSection === 'about'
                ? 'rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white'
                : 'rounded-full border border-transparent px-4 py-2 text-sm font-medium text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white'
            }
          >
            About
          </a>
          <a
            href="#projects"
            className={
              activeSection === 'projects'
                ? 'rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white'
                : 'rounded-full border border-transparent px-4 py-2 text-sm font-medium text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white'
            }
          >
            Projects
          </a>
          <a
            href="#resume"
            className={
              activeSection === 'resume'
                ? 'rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white'
                : 'rounded-full border border-transparent px-4 py-2 text-sm font-medium text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white'
            }
          >
            Resume
          </a>
        </nav>

        <Hero
          name={profile.name}
          role={profile.role}
          location={profile.location}
          imageUrl={profile.imageUrl}
          imageAlt={profile.imageAlt}
          projectCount={projects.length}
        />

        {loading ? (
          <p className="reveal-on-scroll rounded-2xl border border-white/10 bg-slate-950/70 px-5 py-4 text-sm text-slate-300 shadow-xl shadow-black/20 backdrop-blur-xl">
            Loading project data...
          </p>
        ) : null}
        {error ? (
          <p className="reveal-on-scroll rounded-2xl border border-rose-400/30 bg-rose-500/10 px-5 py-4 text-sm text-rose-100 shadow-xl shadow-black/20 backdrop-blur-xl">
            {error}
          </p>
        ) : null}

        {!loading && !error ? <ProjectGrid projects={sortedProjects} /> : null}

        <section
          id="about"
          className="reveal-on-scroll grid gap-4 rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl lg:grid-cols-[1.15fr_0.85fr]"
          aria-labelledby="about-heading"
        >
          <div className="space-y-4 lg:pr-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">About me</p>
            <h2 id="about-heading" className="max-w-2xl [font-family:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A focused profile built around my work and experience.
            </h2>
            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-base leading-8 text-slate-200">
              {profile.about.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-3xl border border-sky-300/20 bg-gradient-to-br from-sky-400/10 to-transparent p-5 shadow-lg shadow-sky-950/20">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200/80">Core skills</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Core skills">
                {profile.skills.map((skill) => (
                  <li key={skill} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-100">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 text-sm text-slate-300">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Current focus</p>
              <p className="mt-3 leading-7">
                Building interfaces with crisp motion, clear hierarchy, and strong performance across devices.
              </p>
            </div>
          </div>
        </section>

        <ResumeSections profile={profile} />
      </div>
    </main>
  );
}
