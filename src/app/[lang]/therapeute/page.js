import PageShell from "@/components/layout/PageShell";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Reveal from "@/components/ui/Reveal";
import PageHero from "@/sections/shared/PageHero";
import { getDictionary } from "@/data";
import { isLocale } from "@/lib/i18n";

export default async function TherapistPage({ params }) {
  const resolved = await params;
  const locale = isLocale(resolved.lang) ? resolved.lang : "fr";
  const dictionary = getDictionary(locale);

  return (
    <PageShell dictionary={dictionary} locale={locale} currentPath={`/${locale}/therapeute`}>
      <main>
        <PageHero eyebrow={dictionary.therapist.hero.eyebrow} title={dictionary.therapist.hero.title} />

        <section className="content-section">
          <Container className="two-column">
            <Reveal className="stacked-copy" parallax>
              {dictionary.therapist.hero.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>
            <Reveal delay={0.12}>
              <ImagePlaceholder ratio="portrait" label="Portrait Caroline Decroix" />
            </Reveal>
          </Container>
        </section>

        <section className="quote-band">
          <Container narrow>
            <Reveal parallax>
              <p>{dictionary.therapist.signature}</p>
            </Reveal>
          </Container>
        </section>
      </main>
    </PageShell>
  );
}
