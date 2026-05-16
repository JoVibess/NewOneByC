import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";

export default function PageShell({
  children,
  dictionary,
  locale,
  currentPath
}) {
  return (
    <>
      <SiteHeader dictionary={dictionary} locale={locale} currentPath={currentPath} />
      {children}
      <SiteFooter dictionary={dictionary} />
    </>
  );
}
