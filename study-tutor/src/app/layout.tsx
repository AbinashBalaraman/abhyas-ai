import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Study Tutor",
  description: "Personalized AI tutor for competitive exam preparation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-slate-950">
      <body className={`${inter.className} text-slate-100 bg-slate-950 h-screen overflow-hidden`}>
        <div className="flex h-screen w-screen overflow-hidden bg-slate-950">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-slate-950 relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}