import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  variable: "--font-instrument-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Blog",
  description: "A simple example blog.",
  openGraph: {
    type: "website",
    locale: "en_US",
    description: "A simple example blog.",
    url: "https://a-blog-example.vercel.app",
    images: [
      {
        url: "https://a-blog-example.vercel.app/images/og.jpg",
        width: 1200,
        height: 675,
        alt: "A Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Blog",
    description: "A simple example blog.",
    images: [
      {
        url: "https://a-blog-example.vercel.app/images/og.jpg",
        width: 1200,
        height: 675,
        alt: "A Blog",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="A Blog" />
      </head>
      <body
        className={`${instrumentSans.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
