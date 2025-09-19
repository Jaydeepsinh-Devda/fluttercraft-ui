import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
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
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
