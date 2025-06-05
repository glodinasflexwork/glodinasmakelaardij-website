import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glodinas Makelaardij - Den Haag Real Estate Expert",
  description: "Your trusted real estate partner in Den Haag. Expert guidance for buying, selling, and investing in premium properties.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
