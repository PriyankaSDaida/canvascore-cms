import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CanvasCore CMS — Content operations, composed",
  description:
    "A production-minded enterprise CMS with visual composition, permissions, workflow, and live preview.",
  openGraph: {
    title: "CanvasCore CMS",
    description: "Content operations, composed.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "CanvasCore CMS",
    description: "Content operations, composed.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
