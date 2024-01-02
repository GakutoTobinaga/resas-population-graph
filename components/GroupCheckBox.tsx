// dataをfetchして、(各都道府県データ)個々のcheckboxに入れて表示
import CheckBox from "./CheckBox"
import fetchPrefectures from "@/lib/actions"
import { PrefectureData } from "@/lib/types";

export default async function GroupCheckBox() {
    const data: PrefectureData = await fetchPrefectures();
    return (
    <div className="GroupCheckBox">
      {data.result.map((prefecture) => (
        <CheckBox key={prefecture.prefCode} prefectureName={prefecture.prefName} />
      ))}
    </div>
    )
  }