import ReviewsSection from "@/components/layout/ReviewsSection";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { googleReviews } from "@/data/reviews";

export default function PageShell({
  children,
  dictionary,
  locale,
  currentPath,
  showReviews = true
}) {
  return (
    <>
      <SiteHeader dictionary={dictionary} locale={locale} currentPath={currentPath} />
      {children}
      {showReviews ? <ReviewsSection reviews={googleReviews} locale={locale} /> : null}
      <SiteFooter dictionary={dictionary} />
    </>
  );
}
