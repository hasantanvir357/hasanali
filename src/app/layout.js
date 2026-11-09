import { Inter, Hind_Siliguri } from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "@/components/providers/LanguageProvider";
import SkipLink from "@/components/layout/SkipLink";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import JsonLd from "@/components/seo/JsonLd";
import { personJsonLd } from "@/components/seo/personJsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-en",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bn",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://hasanbinali.com"),
  title: {
    default:
      "হাসান বিন আলী — ভিডিও এডিটর ও সিনেমাটোগ্রাফার | Hasan Bin Ali",
    template: "%s | Hasan Bin Ali",
  },
  description:
    "হাসান বিন আলী — ঢাকা ভিত্তিক প্রফেশনাল ভিডিও এডিটর ও সিনেমাটোগ্রাফার। Video editor & cinematographer based in Dhaka, Bangladesh — video editing, cinematography, drone videography and visual storytelling.",
  keywords: [
    "Hasan Bin Ali",
    "video editor Dhaka",
    "cinematographer Bangladesh",
    "video editing Bangladesh",
    "drone videography Dhaka",
  ],
  openGraph: {
    type: "website",
    locale: "bn_BD",
    alternateLocale: "en_US",
    url: "https://hasanbinali.com",
    siteName: "Hasan Bin Ali",
    title: "হাসান বিন আলী — ভিডিও এডিটর ও সিনেমাটোগ্রাফার",
    description:
      "Video Editor & Cinematographer — impactful visual stories from Dhaka, Bangladesh.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasan Bin Ali — Video Editor & Cinematographer",
    description:
      "Video Editor & Cinematographer — impactful visual stories from Dhaka, Bangladesh.",
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

const revealBootScript =
  "document.documentElement.classList.add('js-reveal');";

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${inter.variable} ${hindSiliguri.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootScript }} />
        <JsonLd data={personJsonLd} />
      </head>
      <body className="relative flex min-h-full flex-col bg-bg text-text antialiased">
        <LanguageProvider>
          <SkipLink />
          <CustomCursor />
          <Navbar />
          <div className="flex flex-1 flex-col pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-0">
            <div className="relative flex-1">
              <div id="top" className="absolute inset-x-0 top-0 h-px" aria-hidden="true" />
              {children}
            </div>
            <Footer />
          </div>
          <MobileNav />
        </LanguageProvider>
      </body>
    </html>
  );
}
