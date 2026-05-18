import { fr } from "@/data/fr";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: new URL("/sitemap.xml", fr.seo.siteUrl).toString()
  };
}
