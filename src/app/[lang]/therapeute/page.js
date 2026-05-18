import PageShell from "@/components/layout/PageShell";
import Container from "@/components/ui/Container";
import FigureImage from "@/components/ui/FigureImage";
import Reveal from "@/components/ui/Reveal";
import StretchReveal from "@/components/ui/StretchReveal";
import { getDictionary } from "@/data";
import { isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const resolved = await params;

  return createPageMetadata(resolved.lang, "therapeute");
}

export default async function TherapistPage({ params }) {
  const resolved = await params;
  const locale = isLocale(resolved.lang) ? resolved.lang : "fr";
  const dictionary = getDictionary(locale);

  return (
    <PageShell dictionary={dictionary} locale={locale} currentPath={`/${locale}/therapeute`}>
      <main>
        <section className="therapist-profile-section">
          <Container className="two-column">
            <Reveal className="stacked-copy" parallax>
              <p className="eyebrow">{dictionary.therapist.hero.eyebrow}</p>
              <h1>{dictionary.therapist.hero.title}</h1>
              {dictionary.therapist.hero.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>
            <Reveal delay={0.12}>
              <FigureImage
                src="/images/profil.webp"
                alt="Portrait de Caroline Decroix"
                ratio="portrait"
              />
            </Reveal>
          </Container>
        </section>

        <section className="quote-band">
          <Container>
            <StretchReveal>
              <p>{dictionary.therapist.signature}</p>
            </StretchReveal>
          </Container>
        </section>
      </main>
    </PageShell>
  );
}
