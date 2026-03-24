import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "സേവ്യർ ചിറ്റിലപ്പിള്ളി — LDF സ്ഥാനാർത്ഥി | വടക്കാഞ്ചേരി നിയോജക മണ്ഡലം",
  description:
    "സേവ്യർ ചിറ്റിലപ്പിള്ളി — LDF സ്ഥാനാർത്ഥി, വടക്കാഞ്ചേരി നിയോജക മണ്ഡലം",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "സേവ്യർ ചിറ്റിലപ്പിള്ളി — LDF സ്ഥാനാർത്ഥി",
    description: "വടക്കാഞ്ചേരി നിയോജക മണ്ഡലം — വികസനം. വിശ്വാസം. വിജയം.",
    images: [
      {
        url: "/assets/portrait/portrait.jpg",
        width: 400,
        height: 500,
        alt: "സേവ്യർ ചിറ്റിലപ്പിള്ളി",
      },
    ],
    type: "website",
    locale: "ml_IN",
    siteName: "സേവ്യർ ചിറ്റിലപ്പിള്ളി",
  },
  twitter: {
    card: "summary_large_image",
    title: "സേവ്യർ ചിറ്റിലപ്പിള്ളി — LDF സ്ഥാനാർത്ഥി",
    description: "വടക്കാഞ്ചേരി നിയോജക മണ്ഡലം",
    images: ["/assets/portrait/portrait.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ml">
      <body className="antialiased">{children}</body>
    </html>
  );
}
