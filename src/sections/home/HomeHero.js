import ButtonLink from "@/components/ui/ButtonLink";
import Reveal from "@/components/ui/Reveal";

export default function HomeHero({ dictionary }) {
  return (
    <section className="hero-section">
      <div className="hero-section__frame">
        <div className="hero-section__video-placeholder" aria-hidden="true" />
        <div className="hero-section__inner">
          <Reveal className="hero-section__content" parallax parallaxIntensity="medium">
            <p className="eyebrow">{dictionary.home.hero.eyebrow}</p>
            <h1 className="hero-title">
              <span>{dictionary.home.hero.title}</span>
              <em>{dictionary.home.hero.titleAccent}</em>
            </h1>
            <p className="hero-section__description">{dictionary.home.hero.description}</p>
            <div className="hero-section__actions">
              <ButtonLink href={`/${dictionary.locale}/contact`} label={dictionary.ctas.contact} />
              <ButtonLink
                href={`/${dictionary.locale}/bioresonance`}
                label={dictionary.ctas.discover}
                secondary
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
