import PageShell from "@/components/layout/PageShell";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import PageHero from "@/sections/shared/PageHero";
import { getDictionary } from "@/data";
import { isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const resolved = await params;

  return createPageMetadata(resolved.lang, "contact");
}

export default async function ContactPage({ params }) {
  const resolved = await params;
  const locale = isLocale(resolved.lang) ? resolved.lang : "fr";
  const dictionary = getDictionary(locale);
  const mailtoHref = `mailto:${dictionary.contactDetails.email}?subject=${encodeURIComponent(dictionary.contact.emailSubject)}`;
  const mapQuery = encodeURIComponent(dictionary.contactDetails.addressLines.join(", "));
  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  return (
    <PageShell dictionary={dictionary} locale={locale} currentPath={`/${locale}/contact`}>
      <main>
        <PageHero eyebrow={dictionary.contact.hero.eyebrow} title={dictionary.contact.hero.title}>
          <p className="page-hero__lead">{dictionary.contact.hero.description}</p>
        </PageHero>

        <section className="content-section">
          <Container className="contact-grid">
            <Reveal className="contact-mail-block" parallax>
              <SectionHeading title={dictionary.contact.emailTitle} />
              <div className="contact-card contact-card--cta">
                <p>{dictionary.contactDetails.addressLines.join(", ")}</p>
                <a href={`mailto:${dictionary.contactDetails.email}`}>
                  {dictionary.contactDetails.email}
                </a>
                <a href={`tel:${dictionary.contactDetails.phone.replaceAll(" ", "")}`}>
                  {dictionary.contactDetails.phone}
                </a>
                <a className="button-link" href={mailtoHref}>
                  {dictionary.contact.emailButton}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.12} parallax>
              <div className="contact-map" aria-label={dictionary.contact.mapTitle}>
                <iframe
                  title={dictionary.contact.mapTitle}
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </Container>
        </section>
      </main>
    </PageShell>
  );
}
