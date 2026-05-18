import { getDictionary } from "@/data";
import { defaultLocale, isLocale, locales } from "@/lib/i18n";

function normalizePath(path) {
  return path ? `/${path}` : "";
}

export function getLocalizedPath(locale, pageKey) {
  const dictionary = getDictionary(locale);
  const page = dictionary.seo.pages[pageKey];

  return `/${locale}${normalizePath(page.path)}`;
}

export function createPageMetadata(localeValue, pageKey) {
  const locale = isLocale(localeValue) ? localeValue : defaultLocale;
  const dictionary = getDictionary(locale);
  const page = dictionary.seo.pages[pageKey];
  const canonicalPath = getLocalizedPath(locale, pageKey);
  const canonicalUrl = new URL(canonicalPath, dictionary.seo.siteUrl);

  const languages = Object.fromEntries(
    locales.map((language) => [
      language,
      new URL(getLocalizedPath(language, pageKey), dictionary.seo.siteUrl).toString()
    ])
  );

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: canonicalUrl.toString(),
      languages: {
        ...languages,
        "x-default": new URL(getLocalizedPath(defaultLocale, pageKey), dictionary.seo.siteUrl).toString()
      }
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonicalUrl.toString(),
      siteName: dictionary.site.name,
      locale: dictionary.seo.locale,
      alternateLocale: dictionary.seo.alternateLocale,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description
    }
  };
}
