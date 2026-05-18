import PageShell from "@/components/layout/PageShell";
import LegalPageContent from "@/components/legal/LegalPageContent";
import { getDictionary } from "@/data";
import { isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const resolved = await params;
  const metadata = createPageMetadata(resolved.lang, "legal");

  return {
    ...metadata,
    robots: {
      index: false,
      follow: false
    }
  };
}

export default async function LegalNoticePage({ params }) {
  const resolved = await params;
  const locale = isLocale(resolved.lang) ? resolved.lang : "fr";
  const dictionary = getDictionary(locale);

  return (
    <PageShell
      dictionary={dictionary}
      locale={locale}
      currentPath={`/${locale}/mentions-legales`}
      showReviews={false}
    >
      <LegalPageContent page={dictionary.legalPages.legal} />
    </PageShell>
  );
}
