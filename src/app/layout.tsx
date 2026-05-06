import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MetaMeal — See What Your Food Will Do Before You Eat It",
  description:
    "Upload a meal photo and instantly see how it will affect your energy, focus, hydration, and body — powered by AI. The future of food intelligence.",
  keywords: ["food analysis", "AI nutrition", "meal simulation", "body impact", "energy prediction"],
  openGraph: {
    title: "MetaMeal — Future Body Simulation",
    description: "See what your food will do before you eat it.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-[var(--font-inter)] antialiased">
        <div className="bg-mesh" aria-hidden="true" />
        <div className="relative z-10 flex flex-col min-h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
