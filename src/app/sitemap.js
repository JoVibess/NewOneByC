import { getDictionary } from "@/data";
import { locales } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/seo";

const pages = ["home", "bioresonance", "therapeute", "contact"];

export default function sitemap() {
  const dictionary = getDictionary("fr");

  return pages.flatMap((pageKey) =>
    locales.map((locale) => ({
      url: new URL(getLocalizedPath(locale, pageKey), dictionary.seo.siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: pageKey === "home" ? "monthly" : "yearly",
      priority: pageKey === "home" ? 1 : 0.8
    }))
  );
}
