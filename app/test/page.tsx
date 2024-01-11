"use client"
import React from 'react';
import GroupCheckBox from '@/components/GroupCheckBox';
import { fetchPopulationDataByPref } from '@/lib/actions';
import { PrefecturePopulationData } from '@/lib/types';
import { TotalChartBox } from '@/components/popChartBoxes/TotalChartBox';
import { AgedChartBox } from '@/components/popChartBoxes/AgedChartBox';
import { useState, useEffect } from 'react';
import { PrefectureNames, LabelAndRawDatas } from '@/lib/types';
import { YoungChartBox } from '@/components/popChartBoxes/YoungChartBox';
import { WorkingChartBox } from '@/components/popChartBoxes/WorkingAgeChartBox';

export function MyComponent() {
  const [selectedPrefectures, setSelectedPrefectures] = useState<[string, number][]>([]);
  const [prefectureNames, setPrefectureNames] = useState<PrefectureNames>({ prefectureNameA: undefined, prefectureNameB: undefined });
  const [totalRawDatas, setTotalRawDatas] = useState<LabelAndRawDatas>({label: "総人口", dataA: undefined, dataB: undefined})
  const [agedRawDatas, setAgedRawDatas] = useState<LabelAndRawDatas>({label: "老年人口", dataA: undefined, dataB: undefined})
  const [youngRawDatas, setYoungRawDatas] = useState<LabelAndRawDatas>({label: "年少人口", dataA: undefined, dataB: undefined})
  const [workingRawDatas, setWorkingRawDatas] = useState<LabelAndRawDatas>({label: "生産年齢人口", dataA: undefined, dataB: undefined})
  const years: number[] = [1980, 1990, 2000, 2010, 2020]

  console.log(selectedPrefectures)
  useEffect(() => {
    const fetchData = async () => {
      let A : number | undefined = undefined;
      let B : number | undefined = undefined;
      if (selectedPrefectures.length == 1) {
        A = selectedPrefectures[0][1]; // 1番目の都道府県コード
        setPrefectureNames(prevNames => ({ ...prevNames, prefectureNameA: selectedPrefectures[0][0] }));
        const dataA: PrefecturePopulationData = await fetchPopulationDataByPref(A);
        setTotalRawDatas(prevNames => ({ ...prevNames, dataA:  dataA.result.data.find(category => category.label === "総人口")}))
        setYoungRawDatas(prevNames => ({ ...prevNames, dataA:  dataA.result.data.find(category => category.label === "年少人口")}))
        setAgedRawDatas(prevNames => ({ ...prevNames, dataA:  dataA.result.data.find(category => category.label === "老年人口")}))
        setWorkingRawDatas(prevNames => ({ ...prevNames, dataA:  dataA.result.data.find(category => category.label === "生産年齢人口")}))
        // console.log(dataA.result.data.find(category => category.label === "生産年齢人口"))
        // console.log(dataA.result.data.find(category => category.label === "老年人口"))
      }
      if (selectedPrefectures.length >= 2) {
        console.log("in B :" + prefectureNames)
        console.log("選択された数: " + selectedPrefectures)
        B = selectedPrefectures[1][1]; // 2番目の都道府県コード
        console.log(B)
        setPrefectureNames(prevNames => ({ ...prevNames, prefectureNameB: selectedPrefectures[1][0] }));
        const dataB: PrefecturePopulationData = await fetchPopulationDataByPref(B);
        setTotalRawDatas(prevNames => ({ ...prevNames, dataB:  dataB.result.data.find(category => category.label === "総人口")}))
        setYoungRawDatas(prevNames => ({ ...prevNames, dataB:  dataB.result.data.find(category => category.label === "年少人口")}))
        setAgedRawDatas(prevNames => ({ ...prevNames, dataB:  dataB.result.data.find(category => category.label === "老年人口")}))
        setWorkingRawDatas(prevNames => ({ ...prevNames, dataB:  dataB.result.data.find(category => category.label === "生産年齢人口")}))
      }
    }
    fetchData();
  }, [selectedPrefectures])

  if (!prefectureNames.prefectureNameA && !prefectureNames.prefectureNameB) {
    return (
      <div>
        <GroupCheckBox selectedPrefectures={selectedPrefectures} setSelectedPrefectures={setSelectedPrefectures} />
        <div>都道府県を選択してください。</div>
      </div>
    );
  }

  return (
    <div>
      <GroupCheckBox selectedPrefectures={selectedPrefectures} setSelectedPrefectures={setSelectedPrefectures} />
      <div>
        <TotalChartBox prefectureNames={prefectureNames} labelAndRawDatas={totalRawDatas} />
        <AgedChartBox prefectureNames={prefectureNames} labelAndRawDatas={agedRawDatas} />
        <YoungChartBox prefectureNames={prefectureNames} labelAndRawDatas={youngRawDatas} />
        <WorkingChartBox prefectureNames={prefectureNames} labelAndRawDatas={workingRawDatas} />
      </div>
    </div>
  );
}

export default MyComponent;
