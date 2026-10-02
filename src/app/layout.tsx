import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { PageTransition } from "@/components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Krishank D Boswan — GenAI Engineer & Builder",
  description:
    "Personal website of Krishank D Boswan — GenAI Intern @ Persistent Systems. Building next-generation AI interfaces, scalable architectures, and refined digital products.",
  keywords: ["Krishank D Boswan", "GenAI", "Persistent Systems", "AI Engineer", "Next.js", "Portfolio"],
  openGraph: {
    title: "Krishank D Boswan — GenAI Engineer & Builder",
    description: "GenAI Intern @ Persistent Systems. Explore resume and journey.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-white">
        <CustomCursor />
        <Navbar />
        <main className="flex-1 flex flex-col">
          <PageTransition>{children}</PageTransition>
        </main>
      </body>
    </html>
  );
}
