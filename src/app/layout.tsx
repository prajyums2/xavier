import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "സേവ്യർ ചിറ്റിലപ്പിള്ളി — LDF സ്ഥാനാർഥി | വടക്കാഞ്ചേരി നിയോജക മണ്ഡലം",
  description: "സേവ്യർ ചിറ്റിലപ്പിള്ളി — CPM സ്ഥാനാർഥി, വടക്കാഞ്ചേരി നിയോജക മണ്ഡലം, LDF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ml">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
