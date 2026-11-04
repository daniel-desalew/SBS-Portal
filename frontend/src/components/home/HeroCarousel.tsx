'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Scene = 'classroom' | 'community' | 'future';

interface HeroSlide {
  title: string;
  description: string;
  scene: Scene;
  align: 'left' | 'right';
}

function Student({
  x,
  y,
  shirt,
  scale = 1,
}: {
  x: number;
  y: number;
  shirt: string;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-45 103c5-38 23-58 45-58s40 20 45 58v45h-90v-45Z" fill={shirt} />
      <path d="M-17 42 0 64l17-22-7-13h-20l-7 13Z" fill="#F4F0E8" />
      <path d="M-11 38h22v18h-22z" fill="#874F39" />
      <ellipse cx="0" cy="3" rx="27" ry="33" fill="#965C43" />
      <path d="M-28 1c-4-25 8-43 29-43 21 0 32 14 29 39-12-8-22-17-27-26C-3-15-13-5-28 1Z" fill="#18202D" />
      <circle cx="-9" cy="4" r="2.5" fill="#172334" />
      <circle cx="9" cy="4" r="2.5" fill="#172334" />
      <path d="M-7 19c4 3 10 3 14 0" stroke="#542F2B" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function LearningScene({ scene }: { scene: Scene }) {
  return (
    <svg
      className={`home-carousel-art home-carousel-art--${scene}`}
      viewBox="0 0 1440 680"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="classroom-wall" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#8FB8C7" />
          <stop offset="1" stopColor="#D8C6A5" />
        </linearGradient>
        <linearGradient id="classroom-floor" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#93663F" />
          <stop offset="1" stopColor="#E0B96E" />
        </linearGradient>
      </defs>
      <path fill="url(#classroom-wall)" d="M0 0h1440v680H0z" />
      <path fill="#E7F0F1" opacity=".82" d="M0 0h1440v388H0z" />
      <path fill="#28566A" d="M875 45h445v233H875z" />
      <path fill="#C5E6EE" d="M895 64h405v196H895z" />
      <path fill="#77A66A" d="M895 206h405v54H895z" />
      <path fill="#78563D" d="M0 347h1440v333H0z" />
      <path fill="url(#classroom-floor)" d="M0 420h1440v260H0z" />
      <path fill="#1B4960" d="M95 74h310v205H95z" />
      <path fill="#D4ECF0" d="M112 92h276v171H112z" />
      <path stroke="#1B4960" strokeWidth="12" d="M250 92v171M112 179h276" />
      {scene === 'classroom' && (
        <>
          <path fill="#9A704A" d="m122 423 1060-30 150 45-1090 45-120-25z" />
          <path stroke="#694C37" strokeWidth="18" d="m214 459-22 221m1003-244 39 244" />
          <Student x={295} y={257} shirt="#244B78" scale={1.18} />
          <Student x={485} y={233} shirt="#27808A" scale={1.32} />
          <Student x={685} y={192} shirt="#315B86" scale={1.45} />
          <Student x={915} y={244} shirt="#4C9190" scale={1.25} />
          <Student x={1110} y={264} shirt="#334F75" scale={1.18} />
          <path fill="#1D2934" d="m165 437 255-5 40 122-260 10z" />
          <path fill="#304B58" d="m510 424 240-5 36 115-249 7z" />
          <path fill="#152631" d="m860 426 220-7 29 109-224 7z" />
          <path fill="#D9A54E" d="m574 421 83-2 23 12-84 3z" />
          <circle cx="1040" cy="413" r="18" fill="#EABF72" />
        </>
      )}
      {scene === 'community' && (
        <>
          <path fill="#9A704A" d="M95 411h1245v105H95z" />
          <path stroke="#694C37" strokeWidth="24" d="m172 506-20 174m1064-174 26 174" />
          <Student x={260} y={226} shirt="#344F78" scale={1.25} />
          <Student x={475} y={211} shirt="#4A8990" scale={1.32} />
          <Student x={716} y={186} shirt="#395B82" scale={1.4} />
          <Student x={957} y={208} shirt="#5A9290" scale={1.3} />
          <Student x={1180} y={229} shirt="#263D68" scale={1.22} />
          <ellipse cx="365" cy="416" rx="75" ry="16" fill="#ECE7D8" />
          <ellipse cx="704" cy="400" rx="90" ry="18" fill="#ECE7D8" />
          <ellipse cx="1030" cy="420" rx="75" ry="16" fill="#ECE7D8" />
          <path fill="#B9773E" d="M333 392c-25-37 12-64 43-42 31-22 68 11 42 42h-85Z" />
          <path fill="#6E9A61" d="M664 378c-19-27 4-50 30-34 20-20 47-4 42 15 26-9 38 13 21 27h-93Z" />
          <path fill="#D6A444" d="M1001 398c-22-31 13-57 39-36 25-18 59 9 37 36h-76Z" />
          <path fill="#D5DFE1" d="M529 351h30v57h-30z" />
          <path fill="#B3C9D0" d="M524 344h40v13h-40z" />
        </>
      )}
      {scene === 'future' && (
        <>
          <path fill="#A07953" d="M100 427h1225v75H100z" />
          <path stroke="#694C37" strokeWidth="22" d="m186 496-20 184m1054-184 24 184" />
          <Student x={285} y={222} shirt="#344F78" scale={1.22} />
          <Student x={520} y={192} shirt="#4A8990" scale={1.35} />
          <Student x={918} y={197} shirt="#344F78" scale={1.34} />
          <Student x={1140} y={231} shirt="#5A9290" scale={1.2} />
          <path fill="#273949" d="m470 415 235-9 32 112-247 8z" />
          <path fill="#6FC4D0" d="m487 427 199-7 20 77-204 8z" />
          <path fill="#D3E5E5" d="m809 421 204-7 23 82-214 7z" />
          <path fill="#344653" d="M868 233h158v154H868z" />
          <rect x="888" y="252" width="118" height="96" rx="14" fill="#B7DFDE" />
          <circle cx="923" cy="292" r="9" fill="#25485C" />
          <circle cx="972" cy="292" r="9" fill="#25485C" />
          <path d="M930 321c11 9 24 9 35 0" stroke="#25485C" strokeWidth="6" strokeLinecap="round" />
          <path fill="#344653" d="M918 386h58v32h-58z" />
          <path fill="#E2AD43" d="m556 396 54-61 54 61h-108Z" />
          <path fill="#F1C861" d="M573 390h74v14h-74z" />
          <circle cx="612" cy="373" r="11" fill="#EAF3E9" />
        </>
      )}
      <path fill="#142334" opacity=".14" d="M0 570h1440v110H0z" />
    </svg>
  );
}

export function HeroCarousel({
  slides,
  applyHref,
  applyLabel,
}: {
  slides: HeroSlide[];
  applyHref: string;
  applyLabel: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, slides.length]);

  const showSlide = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  return (
    <section
      className="home-carousel"
      aria-label="Featured education stories"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') showSlide(activeIndex - 1);
        if (event.key === 'ArrowRight') showSlide(activeIndex + 1);
      }}
    >
      <div className="home-carousel-slides">
        {slides.map((slide, index) => (
          <article
            className={`home-carousel-slide home-carousel-slide--${slide.align}${index === activeIndex ? ' is-active' : ''}`}
            key={slide.title}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
            aria-hidden={index !== activeIndex}
          >
            <LearningScene scene={slide.scene} />
            <div className="home-carousel-shade" />
            <div className="container home-carousel-content">
              <div className="home-carousel-copy">
                <h1>{slide.title}</h1>
                <p className="home-carousel-description">{slide.description}</p>
                <Link
                  className="home-carousel-apply"
                  href={applyHref}
                  tabIndex={index === activeIndex ? 0 : -1}
                >
                  {applyLabel}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button
        className="home-carousel-arrow home-carousel-arrow--previous"
        type="button"
        aria-label="Previous slide"
        onClick={() => showSlide(activeIndex - 1)}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        className="home-carousel-arrow home-carousel-arrow--next"
        type="button"
        aria-label="Next slide"
        onClick={() => showSlide(activeIndex + 1)}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
      <div className="home-carousel-dots" aria-label="Choose a slide">
        {slides.map((slide, index) => (
          <button
            className={`home-carousel-dot${index === activeIndex ? ' is-active' : ''}`}
            key={slide.title}
            type="button"
            aria-label={`Show slide ${index + 1}: ${slide.title}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            onClick={() => showSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
