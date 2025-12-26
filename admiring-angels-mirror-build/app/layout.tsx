import type { Metadata } from "next";
import "./globals.css";
import "@/styles/effects.css";

export const metadata: Metadata = {
  title: "Admiring Angels — Heal with dignity. Begin again.",
  description:
    "A dignity-first community for women rebuilding after divorce and domestic violence — with privacy, support, and a gentle next step.",
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  openGraph: {
    title: "Admiring Angels — Heal with dignity. Begin again.",
    description:
      "A dignity-first community for women rebuilding after divorce and domestic violence — with privacy, support, and a gentle next step.",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  icons: [{ rel: "icon", url: "/images/mark.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
