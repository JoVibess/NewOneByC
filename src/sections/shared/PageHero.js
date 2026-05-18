import clsx from "clsx";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function PageHero({ eyebrow, title, children, aside, className }) {
  return (
    <section className={clsx("page-hero", className)}>
      <Container className={aside ? "page-hero__grid" : undefined}>
        <Reveal parallax parallaxIntensity="medium">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {children}
        </Reveal>
        {aside ? (
          <Reveal delay={0.12}>
            {aside}
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
