import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function SiteFooter({ dictionary }) {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__prelude">
          <Reveal>
            <h2>
              {dictionary.footer.preTitle.replace(dictionary.footer.preAccent, "")}
              <em>{dictionary.footer.preAccent}</em>
            </h2>
            <p>{dictionary.footer.preDescription}</p>
          </Reveal>
        </div>

        <div className="site-footer__card">
          <div className="site-footer__brand">
            <Link href={`/${dictionary.locale}`} aria-label={dictionary.site.name}>
              <Image
                src="/images/logo-newonebyc.png"
                width={260}
                height={74}
                alt={dictionary.site.name}
                className="site-footer__logo"
              />
            </Link>

            <nav className="site-footer__nav" aria-label="Footer">
              <div>
                <p className="site-footer__title">Navigation</p>
                {dictionary.nav.map((item) => (
                  <Link href={item.href} key={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>

              <div>
                <p className="site-footer__title">{dictionary.footer.contactTitle}</p>
                <a href={`tel:${dictionary.contactDetails.phone.replaceAll(" ", "")}`}>
                  {dictionary.contactDetails.phone}
                </a>
                <a href={`mailto:${dictionary.contactDetails.email}`}>
                  {dictionary.contactDetails.email}
                </a>
                <p>{dictionary.contactDetails.addressLines.join(", ")}</p>
              </div>
            </nav>
          </div>

          <div className="site-footer__cta">
            <h2>{dictionary.footer.ctaTitle}</h2>
            <p>{dictionary.footer.ctaDescription}</p>
            <Link className="button-link" href={`/${dictionary.locale}/contact`}>
              {dictionary.ctas.contact}
            </Link>
          </div>

          <div className="site-footer__bottom">
            <p className="site-footer__legal-line">
              <span>{dictionary.footer.copyright}</span>
              {dictionary.footer.legalLinks.map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
            </p>
            <p>
              {dictionary.footer.creditsPrefix}{" "}
              <a href={dictionary.footer.creditsUrl} target="_blank" rel="noreferrer">
                {dictionary.footer.creditsName}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
