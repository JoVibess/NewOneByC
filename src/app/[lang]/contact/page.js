import PageShell from "@/components/layout/PageShell";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import PageHero from "@/sections/shared/PageHero";
import { getDictionary } from "@/data";
import { isLocale } from "@/lib/i18n";

export default async function ContactPage({ params }) {
  const resolved = await params;
  const locale = isLocale(resolved.lang) ? resolved.lang : "fr";
  const dictionary = getDictionary(locale);

  return (
    <PageShell dictionary={dictionary} locale={locale} currentPath={`/${locale}/contact`}>
      <main>
        <PageHero eyebrow={dictionary.contact.hero.eyebrow} title={dictionary.contact.hero.title}>
          <p className="page-hero__lead">{dictionary.contact.hero.description}</p>
        </PageHero>

        <section className="content-section">
          <Container className="contact-grid">
            <Reveal parallax>
              <SectionHeading title={dictionary.contact.detailsTitle} />
              <div className="contact-card">
                <p>{dictionary.contactDetails.addressLines.join(", ")}</p>
                <p>{dictionary.contactDetails.email}</p>
                <p>{dictionary.contactDetails.phone}</p>
              </div>
            </Reveal>

            <Reveal delay={0.12} parallax>
              <SectionHeading
                title={dictionary.contact.formTitle}
                description={dictionary.contact.formNote}
              />
              <form className="contact-form">
                <input placeholder={dictionary.contact.formLabels.firstName} />
                <input placeholder={dictionary.contact.formLabels.lastName} />
                <input placeholder={dictionary.contact.formLabels.phone} />
                <input placeholder={dictionary.contact.formLabels.email} type="email" />
                <textarea
                  placeholder={dictionary.contact.formLabels.message}
                  rows={6}
                />
                <button type="button">{dictionary.contact.formLabels.submit}</button>
              </form>
            </Reveal>
          </Container>
        </section>
      </main>
    </PageShell>
  );
}
