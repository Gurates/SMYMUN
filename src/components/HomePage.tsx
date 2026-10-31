import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowDown, Compass, Landmark, Globe, MapPin, ExternalLink } from 'lucide-react';
import { PageView } from './Navbar';
import { CONFERENCE_LETTERS, CONFERENCE_INFO, COMMITTEES_DATA } from '../data/conferenceData';

export const DEFAULT_TARGET_DATE = CONFERENCE_INFO.startDate;
interface HomePageProps { onNavigate: (page: PageView) => void; targetDate?: string; }
const calculateTimeLeft = (target: string) => {
  const diff = Math.max(0, new Date(target).getTime() - Date.now()) || 0;
  return [Math.floor(diff / 86400000), Math.floor(diff / 3600000) % 24, Math.floor(diff / 60000) % 60, Math.floor(diff / 1000) % 60];
};
export const HomePage: React.FC<HomePageProps> = ({ onNavigate, targetDate = DEFAULT_TARGET_DATE }) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));
  const lettersRef = useRef<HTMLElement>(null);
  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetDate));
    const interval = window.setInterval(() => setTimeLeft(calculateTimeLeft(targetDate)), 1000);
    return () => window.clearInterval(interval);
  }, [targetDate]);
  return (
    <div className="conference-home">
      <section className="home-hero" aria-labelledby="home-title">
        <p className="home-eyebrow">{CONFERENCE_INFO.city} · {CONFERENCE_INFO.dates}</p>
        <h1 id="home-title">{CONFERENCE_INFO.name}<span>{CONFERENCE_INFO.year}</span></h1>
        <p className="home-tagline">{CONFERENCE_INFO.tagline}</p>
        <div className="countdown-container home-countdown" aria-label="Countdown to the conference">
          {timeLeft.map((value, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="countdown-separator" aria-hidden="true">:</span>}
              <div className="countdown-block">
                <div className="digit-group">{String(value).padStart(2, '0').split('').map((digit, i) => <div className="digit-box" key={i}>{digit}</div>)}</div>
                <span className="countdown-label">{['DAYS', 'HOURS', 'MINUTES', 'SECONDS'][index]}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="home-actions">
          <button className="btn-primary" onClick={() => onNavigate('apply')}>APPLY NOW <ArrowRight size={17} /></button>
          <button className="btn-secondary" onClick={() => onNavigate('committees')}><Compass size={17} /> EXPLORE COMMITTEES</button>
        </div>
        <button className="home-scroll" onClick={() => lettersRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })}>
          <span>READ THE WELCOME LETTERS</span><ArrowDown size={19} />
        </button>
      </section>
      <section ref={lettersRef} className="conference-letters" aria-labelledby="letters-title">
        <div className="letters-content">
          <p className="home-eyebrow">FROM OUR CONFERENCE HOSTS</p>
          <h2 id="letters-title">Letters of Welcome</h2>
          <div className="conference-letter-grid">
            {CONFERENCE_LETTERS.map((letter, index) => (
              <article className="conference-letter" key={letter.name}>
                <span className="letter-number">0{index + 1} / WELCOME LETTER</span>
                <h3>{letter.title}</h3>
                {letter.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                <div className="letter-signature">{letter.name}<span>{letter.role}</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="home-highlights" aria-label="Conference highlights">
        <button className="home-highlight" onClick={() => onNavigate('committees')}><Landmark size={24} /><h3>{COMMITTEES_DATA.length} Committees</h3><p>Discover our General Assembly and specialized bodies.</p><ArrowRight size={18} /></button>
        <button className="home-highlight" onClick={() => onNavigate('committees')}><Globe size={24} /><h3>Crisis Simulation</h3><p>Step into history and shape the course of international debate.</p><ArrowRight size={18} /></button>
        <div className="home-highlight"><MapPin size={24} /><h3>{CONFERENCE_INFO.city}</h3><p>{CONFERENCE_INFO.dates}</p></div>
      </section>
      <section className="home-location" aria-labelledby="location-title">
        <p className="home-eyebrow">MEET US IN {CONFERENCE_INFO.city}</p>
        <h2 id="location-title">A meeting point for new perspectives.</h2>
        <a className="home-map-link" href={CONFERENCE_INFO.mapQuery ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFERENCE_INFO.mapQuery)}` : undefined} target="_blank" rel="noopener noreferrer" aria-label={CONFERENCE_INFO.mapQuery ? `Open ${CONFERENCE_INFO.city} in Google Maps (new tab)` : "Venue to be announced"}>
          <div className="home-map-art" aria-hidden="true"><span className="map-pin-halo"><MapPin size={36} /></span></div>
          <div className="home-map-caption"><div><span>CONFERENCE LOCATION</span><h3>{CONFERENCE_INFO.location}</h3><p>{CONFERENCE_INFO.city}, {CONFERENCE_INFO.country}</p></div><span className="map-open">{CONFERENCE_INFO.mapQuery ? "OPEN IN MAPS" : "LOCATION TBA"} <ExternalLink size={18} /></span></div>
        </a>
      </section>
      <footer className="home-footer">© {new Date().getFullYear()} {CONFERENCE_INFO.name} · MODEL UNITED NATIONS · ALL RIGHTS RESERVED</footer>
    </div>
  );
};
export default HomePage;
