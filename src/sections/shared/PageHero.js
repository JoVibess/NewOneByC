import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function PageHero({ eyebrow, title, children }) {
  return (
    <section className="page-hero">
      <Container narrow>
        <Reveal parallax parallaxIntensity="medium">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
