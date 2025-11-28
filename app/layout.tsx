import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wolf and the Wooden House",
  description: "3D animation of a wolf blowing at a wooden house with a scared pig inside."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
