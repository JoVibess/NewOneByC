import "./globals.css";

export const metadata = {
  title: "Newone By C",
  description: "Cabinet de biorésonance à Genève."
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
