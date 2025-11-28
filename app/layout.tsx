import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Architect",
  description: "Creates secure, deployable Next.js AI agents as standalone microservices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
