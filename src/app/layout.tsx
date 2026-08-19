import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalHeader from "@/components/GlobalHeader";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShyamDash — Enterprise IT Services & SaaS Hosting Solutions",
  description: "Complete domain booking, SaaS template deployment, and cloud infrastructure for businesses.",
  other: {
    "google-adsense-account": "ca-pub-1792783864518197"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased`}
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1792783864518197"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="min-h-full flex flex-col bg-[#040815] text-[#f8fafc] overflow-x-hidden">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
