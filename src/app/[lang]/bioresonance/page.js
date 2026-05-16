import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import PageShell from "@/components/layout/PageShell";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import PageHero from "@/sections/shared/PageHero";
import { getDictionary } from "@/data";
import { isLocale } from "@/lib/i18n";

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
        >
          <div className="page-hero__text">
            {dictionary.bioresonance.hero.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </PageHero>

        <section className="content-section">
          <Container className="two-column">
            <Reveal parallax>
              <SectionHeading title={dictionary.bioresonance.consultation.title} />
              <div className="stacked-copy">
                {dictionary.bioresonance.consultation.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <ImagePlaceholder ratio="portrait" label="Photo consultation" />
            </Reveal>
          </Container>
        </section>

        <section className="symptoms-section">
          <Container>
            <Reveal parallax>
              <SectionHeading title={dictionary.bioresonance.symptomsTitle} />
            </Reveal>
            <div className="symptoms-grid">
              {dictionary.bioresonance.symptomGroups.map((group, index) => (
                <Reveal key={group.title} delay={index * 0.04} parallax>
                  <article className="symptom-card">
                    <span className="symptom-card__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{group.title}</h3>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
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
