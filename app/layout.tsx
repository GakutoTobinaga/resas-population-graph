import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import PrefectureTile from "@/components/PrefectureTile";

const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false, // サーバーサイドでのレンダリングを無効にする
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rpg app",
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
        <Navbar />
        <PrefectureTile />
        <main className={inter.className}>{children}</main>
      </body>
    </html>
  );
}
