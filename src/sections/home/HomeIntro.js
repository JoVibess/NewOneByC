import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function HomeIntro({ dictionary }) {
  return (
    <section className="panel-section home-intro-section">
      <Container className="home-intro-section__container">
        <Reveal parallax>
          <SectionHeading
            eyebrow="Approche"
            title={dictionary.home.intro.title}
            description={dictionary.home.intro.description}
          />
          <ButtonLink
            href={`/${dictionary.locale}/bioresonance`}
            label={dictionary.ctas.learnMore}
          />
        </Reveal>
      </Container>
    </section>
  );
}
