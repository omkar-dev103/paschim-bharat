// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Paschim Bharat - Discover Western India",
    template: "%s | Paschim Bharat",
  },
  description:
    "Explore the cultural heritage, breathtaking landscapes, and culinary delights of Western India. Discover Rajasthan, Gujarat, Maharashtra, and Goa.",
  keywords: [
    "Western India tourism",
    "Rajasthan travel",
    "Gujarat tourism",
    "Maharashtra destinations",
    "Goa beaches",
    "Indian heritage",
    "Travel India",
  ],
  authors: [{ name: "IndiaSkills 2025-26 Team" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://paschimbharat.in",
    siteName: "Paschim Bharat",
    title: "Paschim Bharat - Discover the Soul of Western India",
    description:
      "Your gateway to experiencing the rich cultural heritage of Western India",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Paschim Bharat - Western India Tourism",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paschim Bharat - Discover Western India",
    description: "Explore the magic of Rajasthan, Gujarat, Maharashtra & Goa",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#333",
              color: "#fff",
              borderRadius: "12px",
              padding: "16px",
            },
            success: {
              iconTheme: {
                primary: "#10B981",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}