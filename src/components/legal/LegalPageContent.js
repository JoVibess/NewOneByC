import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import PageHero from "@/sections/shared/PageHero";

export default function LegalPageContent({ page }) {
  return (
    <main>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        className="page-hero--compact page-hero--centered"
      >
        <p className="page-hero__lead">{page.intro}</p>
        <p className="legal-page__updated">{page.updatedAt}</p>
      </PageHero>

      <section className="legal-page">
        <Container className="legal-page__container">
          {page.sections.map((section) => (
            <Reveal key={section.title}>
              <article className="legal-page__section">
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            </Reveal>
          ))}
        </Container>
      </section>
    </main>
  );
}
