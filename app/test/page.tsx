"use client"
import React from 'react';
import GroupCheckBox from '@/components/GroupCheckBox';
import { fetchPopulationDataByPref } from '@/lib/actions';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartBox } from '@/components/ChartBox';
import { PopulationCategory, PrefecturePopulationData, PopulationData, GroupCheckBoxProps } from '@/lib/types';
import { TotalChartBox } from '@/components/popChartBoxes/TotalChartBox';
import { useState, useEffect } from 'react';

function MyComponent() {
  const [selectedPrefectures, setSelectedPrefectures] = useState<[string, number][]>([]);
  const [totalpopdata, settotalpopdata] = useState<PopulationCategory | undefined>(undefined);
  const [prefectureNameA, setPrefectureNameA] = useState<string | undefined>(undefined);
  console.log("My compo" + selectedPrefectures)
  const years2 = ['1980', '1990', '2000', '2010', '2020']
  useEffect(() => {
    const fetchData = async () => {
      let A : number | undefined = undefined;
      let B : number | undefined = undefined;
      if (selectedPrefectures.length >= 1) {
        A = selectedPrefectures[0][1]; // 1番目の都道府県コード
        setPrefectureNameA(selectedPrefectures[0][0])
        const dataA: PrefecturePopulationData = await fetchPopulationDataByPref(A);
        const totalPopulationCategory : PopulationCategory | undefined = dataA.result.data.find(category => category.label === "総人口");
        settotalpopdata(totalPopulationCategory)
        const youngPopulationCategory : PopulationCategory | undefined = dataA.result.data.find(category => category.label === "年少人口");
        const workingAgePopulationCategory : PopulationCategory | undefined = dataA.result.data.find(category => category.label === "生産年齢人口");
        const agedPopulationCategory : PopulationCategory | undefined = dataA.result.data.find(category => category.label === "老年人口");
      }
      if (selectedPrefectures.length >= 2) {
        B = selectedPrefectures[1][1]; // 2番目の都道府県コード
        const dataB: PrefecturePopulationData = await fetchPopulationDataByPref(B);
      }
      /*
      console.log("use effect")
      const totalPopulationCategory : PopulationCategory | undefined = dataA.result.data.find(category => category.label === "総人口");
      settotalpopdata(totalPopulationCategory)
      const youngPopulationCategory : PopulationCategory | undefined = data.result.data.find(category => category.label === "年少人口");
      const workingAgePopulationCategory : PopulationCategory | undefined = data.result.data.find(category => category.label === "生産年齢人口");
      const agedPopulationCategory : PopulationCategory | undefined = data.result.data.find(category => category.label === "老年人口");
      */
    }
    fetchData();
  }, [selectedPrefectures])
  // <TotalChartBox prefectureName = "愛知県" populationCategory = {totalPopulationCategory}/>
  // fetchPrefectures 関数をコンポーネント内で定義
  // 一番でかいデータをとって、カテゴリごとにコンポーネントを作ってそれぞれに分配する 都道府県名はいらないかも？
  return (
    <div>
        <GroupCheckBox selectedPrefectures={selectedPrefectures} setSelectedPrefectures={setSelectedPrefectures} />
        <TotalChartBox prefectureName = {prefectureNameA} populationCategory = {totalpopdata}/>
    </div>
  );
}

export default MyComponent;
