import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
export const metadata: Metadata = {
  title: "SHiFT Protocol — neural entrainment for craving, panic, mood, PTSD",
  description: "A protocol that combines VR-ready scene placement, binaural neural entrainment, and closed-loop brain data to interrupt craving and downshift threat states.",
  manifest: "/manifest.json"
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap" rel="stylesheet" />
      </head>
      <body><Nav />{children}</body>
    </html>
  );
}
