import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import FigureImage from "@/components/ui/FigureImage";
import PageShell from "@/components/layout/PageShell";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SymptomsExplorer from "@/components/ui/SymptomsExplorer";
import PageHero from "@/sections/shared/PageHero";
import { getDictionary } from "@/data";
import { isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const resolved = await params;

  return createPageMetadata(resolved.lang, "bioresonance");
}

export default async function BioresonancePage({ params }) {
  const resolved = await params;
  const locale = isLocale(resolved.lang) ? resolved.lang : "fr";
  const dictionary = getDictionary(locale);

  return (
    <PageShell
      dictionary={dictionary}
      locale={locale}
      currentPath={`/${locale}/bioresonance`}
    >
      <main>
        <PageHero
          eyebrow={dictionary.bioresonance.hero.eyebrow}
          title={dictionary.bioresonance.hero.title}
          aside={
            <FigureImage
              src="/images/scan-bioresonance.webp"
              alt={dictionary.bioresonance.hero.title}
              ratio="portrait"
            />
          }
        >
          <div className="page-hero__text">
            {dictionary.bioresonance.hero.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </PageHero>

        <section className="content-section">
          <Container className="two-column two-column--mobile-text-first">
            <Reveal delay={0.12}>
              <FigureImage
                src="/images/seance-bioresonance.webp"
                alt={dictionary.bioresonance.consultation.title}
                ratio="portrait"
              />
            </Reveal>
            <Reveal parallax>
              <SectionHeading title={dictionary.bioresonance.consultation.title} />
              <div className="stacked-copy">
                {dictionary.bioresonance.consultation.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="symptoms-section">
          <Container>
            <Reveal>
              <SymptomsExplorer
                title={dictionary.bioresonance.symptomsTitle}
                groups={dictionary.bioresonance.symptomGroups}
                locale={locale}
              />
            </Reveal>
          </Container>
        </section>

        <section className="panel-section">
          <Container className="session-panel">
            <Reveal parallax>
              <SectionHeading title={dictionary.bioresonance.session.title} />
              <ul className="session-list">
                {dictionary.bioresonance.session.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <ButtonLink href={`/${locale}/contact`} label={dictionary.ctas.book} />
            </Reveal>
          </Container>
        </section>
      </main>
    </PageShell>
  );
}
