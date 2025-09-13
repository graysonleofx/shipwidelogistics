// import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google"
import "./globals.css";

const pacifico = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ship Wide Logistics Delivery Company | Fast & Reliable Shipping",
  description: "Ship your packages worldwide with confidence.",
  keywords: "shipping, logistics, delivery, tracking",
  authors: [{ name: "Ship Wide Logistics Delivery Company" }],
  creator: "Ship Wide Logistics Delivery Company",
  openGraph: {
    title: "Ship Wide Logistics Delivery Company",
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css"></link>

        
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
