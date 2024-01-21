import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const Titlebar = dynamic(() => import("@/components/Titlebar"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resas-population-graph App",
  description: "Displaying populations of each prefectures.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <header>
          <Titlebar />
        </header>
        <main className={inter.className}>{children}</main>
      </body>
    </html>
  );
}
