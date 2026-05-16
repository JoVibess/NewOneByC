import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function HomeTherapistSpotlight({ dictionary }) {
  return (
    <section className="spotlight-section">
      <Container className="spotlight-section__grid">
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

        <Reveal delay={0.12}>
          <ImagePlaceholder ratio="portrait" label="Portrait thérapeute" />
        </Reveal>
      </Container>
    </section>
  );
}
