import ConnectComponent from "@/components/ConnectComponent";
import dynamic from "next/dynamic";

const PrefectureTile = dynamic(() => import("@/components/PrefectureTile"), {
  ssr: false,
});
export default function Home() {
  return (
    <main>
      <div>
        <PrefectureTile />
      </div>
      <div className="main">
        <ConnectComponent />
      </div>
    </main>
  );
}
