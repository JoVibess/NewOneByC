import "./globals.css";
import { fr } from "@/data/fr";

export const metadata = {
  metadataBase: new URL(fr.seo.siteUrl),
  title: {
    default: fr.seo.defaultTitle,
    template: fr.seo.titleTemplate
  },
  description: fr.site.description,
  applicationName: fr.site.name,
  authors: [{ name: "Joey Decroix", url: "https://joeydecroix.com" }],
  creator: "Joey Decroix",
  publisher: fr.site.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
