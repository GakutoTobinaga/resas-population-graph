import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { PrefectureProvider } from "@/contexts/PrefectureProvider";
import ConnectComponent from "@/components/ConnectComponent";

const Titlebar = dynamic(() => import("@/components/Titlebar"), {
  ssr: false, // サーバーサイドでのレンダリングを無効にする
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
        <main className={inter.className}>
          <PrefectureProvider>
            {children}
          </PrefectureProvider>
        </main>
      </body>
    </html>
  );
}
