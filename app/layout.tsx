import type { Metadata } from "next";
import { IBM_Plex_Sans, Oswald } from "next/font/google";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import "./globals.css";

/* =========================================================
   KENZ ENGINEERING FONTS
   ========================================================= */

const oswald = Oswald({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/* =========================================================
   METADATA
   ========================================================= */

export const metadata: Metadata = {
  title: {
    default: "Kenz Engineering LLC | Structural Steel Detailing",
    template: "%s | Kenz Engineering LLC",
  },

  description:
    "Kenz Engineering LLC provides structural steel detailing, BIM coordination, miscellaneous steel detailing, joist and deck detailing, connection support, and estimation services.",

  keywords: [
    "Kenz Engineering LLC",
    "structural steel detailing",
    "steel detailing",
    "structural steel",
    "BIM coordination",
    "Tekla detailing",
    "steel shop drawings",
    "erection drawings",
    "miscellaneous steel detailing",
    "joist detailing",
    "deck detailing",
    "steel estimation",
    "engineering support",
  ],

  authors: [
    {
      name: "Kenz Engineering LLC",
    },
  ],

  creator: "Kenz Engineering LLC",

  metadataBase: new URL("https://kenzengineering.com"),

  openGraph: {
    title:
      "Kenz Engineering LLC | Structural Steel Detailing & Engineering Support",

    description:
      "Reliable structural steel detailing and engineering support for fabricators, contractors, and construction professionals.",

    siteName: "Kenz Engineering LLC",

    type: "website",

    locale: "en_US",
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* =========================================================
   ROOT LAYOUT
   ========================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${plex.variable}`}
    >
      <body className="min-h-screen bg-paper text-ink">
        <Navbar />

        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}