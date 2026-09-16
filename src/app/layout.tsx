import type { Metadata, Viewport } from "next";
import { Fraunces, Noto_Sans_Devanagari, Plus_Jakarta_Sans, Sora } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const hindi = Noto_Sans_Devanagari({
  variable: "--font-hindi",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Agro Connect — Kisan se Bazaar tak",
  description:
    "Kisan se bazaar tak ka ek simple raasta. Sell crops with better prices, farm pickup, and live tracking.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f3d2e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${jakarta.variable} ${fraunces.variable} ${hindi.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans text-ink">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
