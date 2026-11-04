import { getTranslations } from 'next-intl/server';

export async function StatsBar() {
  const t = await getTranslations('Home');
  const benefits = [
    {
      title: t('benefitOneTitle'),
      description: t('benefitOneDescription'),
      icon: (
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M4 11.5 16 5l12 6.5L16 18 4 11.5Z" />
          <path d="M9 14.5v7c4.3 3.4 9.7 3.4 14 0v-7M28 12v9" />
        </svg>
      ),
    },
    {
      title: t('benefitTwoTitle'),
      description: t('benefitTwoDescription'),
      icon: (
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M26 13c0 8-10 15-10 15S6 21 6 13a10 10 0 1 1 20 0Z" />
          <circle cx="16" cy="13" r="3.5" />
        </svg>
      ),
    },
    {
      title: t('benefitThreeTitle'),
      description: t('benefitThreeDescription'),
      icon: (
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="12" cy="10" r="4" />
          <path d="M4 27v-3a8 8 0 0 1 16 0v3M21 7a4 4 0 0 1 0 7m3 4a7 7 0 0 1 4 6v3" />
        </svg>
      ),
    },
  ];

  return (
    <section className="home-impact" aria-label={t('benefitsLabel')}>
      <div className="home-impact-grid">
        {benefits.map(({ title, description, icon }, index) => (
          <article className="home-impact-item" key={title}>
            <span className={`home-impact-icon home-impact-icon-${index + 1}`}>{icon}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}