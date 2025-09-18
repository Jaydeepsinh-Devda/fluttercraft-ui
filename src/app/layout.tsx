import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Flutter UI Component Library",
  description: "Professional, customizable UI components for Flutter developers. Built with performance and developer experience in mind.",
  keywords: ["Flutter", "UI Components", "Design System", "Mobile UI", "Flutter Widgets"],
  authors: [{ name: "Jaydeepsinh Devda" }],
  creator: "Jaydeepsinh Devda",
  openGraph: {
    title: "Flutter UI Component Library",
    description: "Professional, customizable UI components for Flutter developers",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flutter UI Component Library",
    description: "Professional, customizable UI components for Flutter developers",
  },
} as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
