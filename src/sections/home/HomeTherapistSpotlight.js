import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import FigureImage from "@/components/ui/FigureImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function HomeTherapistSpotlight({ dictionary }) {
  return (
    <section className="spotlight-section">
      <Container className="spotlight-section__grid">
        <Reveal delay={0.12}>
          <FigureImage
            src="/images/qui-suis-je.webp"
            alt={dictionary.home.therapistSpotlight.title}
            ratio="portrait"
          />
        </Reveal>

        <Reveal parallax>
          <SectionHeading
            title={dictionary.home.therapistSpotlight.title}
            description={dictionary.home.therapistSpotlight.description}
          />
          <ButtonLink
            href={`/${dictionary.locale}/therapeute`}
            label={dictionary.ctas.learnMore}
          />
        </Reveal>
      </Container>
    </section>
  );
}
