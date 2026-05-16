import SideMenu from "@/components/layout/SideMenu";

export default function SiteHeader({ dictionary, locale, currentPath }) {
  const alternateLocale = locale === "fr" ? "en" : "fr";
  const alternatePath = currentPath.replace(`/${locale}`, `/${alternateLocale}`);
  const links = dictionary.nav.map((item) => ({
    href: item.href,
    title: item.label
  }));
  const footerLinks = [
    { href: `/${locale}/contact`, title: dictionary.ctas.contact },
    { href: alternatePath, title: alternateLocale.toUpperCase() },
    { href: `/${locale}/bioresonance`, title: dictionary.ctas.discover },
    { href: `/${locale}`, title: dictionary.site.shortName }
  ];

  return <SideMenu links={links} footerLinks={footerLinks} />;
}
