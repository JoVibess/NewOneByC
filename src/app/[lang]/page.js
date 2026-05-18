import PageShell from "@/components/layout/PageShell";
import { getDictionary } from "@/data";
import { isLocale, locales } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import HomeHero from "@/sections/home/HomeHero";
import HomeIntro from "@/sections/home/HomeIntro";
import HomeProcess from "@/sections/home/HomeProcess";
import HomeTherapistSpotlight from "@/sections/home/HomeTherapistSpotlight";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const resolved = await params;

  return createPageMetadata(resolved.lang, "home");
}

export default async function HomePage({ params }) {
  const resolved = await params;
  const locale = isLocale(resolved.lang) ? resolved.lang : "fr";
  const dictionary = getDictionary(locale);

  return (
    <PageShell dictionary={dictionary} locale={locale} currentPath={`/${locale}`}>
      <main>
        <HomeHero dictionary={dictionary} />
        <HomeIntro dictionary={dictionary} />
        <HomeProcess dictionary={dictionary} />
        <HomeTherapistSpotlight dictionary={dictionary} />
      </main>
    </PageShell>
  );
}
