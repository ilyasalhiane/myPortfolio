import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ilyas Alhiane | Digital Cyber-Physical Portfolio",
  description:
    "Full-Stack Software Engineer & Ingénieur d'État crafting high-impact digital and cyber-physical products."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
