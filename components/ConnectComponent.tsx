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

export function ConnectComponent() {
  const [selectedCategory, setSelectedCategory] = useState('総人口');
  const [selectedPrefectures, setSelectedPrefectures] = useState<[string, number][]>([]);
  const [prefectureNames, setPrefectureNames] = useState<PrefectureNames>({ prefectureNameA: undefined, prefectureNameB: undefined });
  const [totalRawDatas, setTotalRawDatas] = useState<LabelAndRawDatas>({label: "総人口", dataA: undefined, dataB: undefined})
  const [agedRawDatas, setAgedRawDatas] = useState<LabelAndRawDatas>({label: "老年人口", dataA: undefined, dataB: undefined})
  const [youngRawDatas, setYoungRawDatas] = useState<LabelAndRawDatas>({label: "年少人口", dataA: undefined, dataB: undefined})
  const [workingRawDatas, setWorkingRawDatas] = useState<LabelAndRawDatas>({label: "生産年齢人口", dataA: undefined, dataB: undefined})

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

  const resetAll = () => {
    setSelectedPrefectures([]);
    setPrefectureNames({ prefectureNameA: undefined, prefectureNameB: undefined });
    setTotalRawDatas({label: "総人口", dataA: undefined, dataB: undefined});
    setAgedRawDatas({label: "老年人口", dataA: undefined, dataB: undefined});
    setYoungRawDatas({label: "年少人口", dataA: undefined, dataB: undefined});
    setWorkingRawDatas({label: "生産年齢人口", dataA: undefined, dataB: undefined});
  };
  const renderChart = () => {
    switch (selectedCategory) {
      case '総人口':
        return <TotalChartBox prefectureNames={prefectureNames} labelAndRawDatas={totalRawDatas} />;
      case '年少人口':
        return <YoungChartBox prefectureNames={prefectureNames} labelAndRawDatas={youngRawDatas} />;
      case '老年人口':
        return <AgedChartBox prefectureNames={prefectureNames} labelAndRawDatas={agedRawDatas} />;
      case '生産年齢人口':
        return <WorkingChartBox prefectureNames={prefectureNames} labelAndRawDatas={workingRawDatas} />;
      default:
        return null;
    }
  };
  if (!prefectureNames.prefectureNameA && !prefectureNames.prefectureNameB) {
    return (
      <div>
        <GroupCheckBox selectedPrefectures={selectedPrefectures} setSelectedPrefectures={setSelectedPrefectures} />
        <div className="MessageInSelectedPrefecture">都道府県を選択してください。</div>
      </div>
    );
  }

  return (
    <div>
      <GroupCheckBox selectedPrefectures={selectedPrefectures} setSelectedPrefectures={setSelectedPrefectures} />
      <div className='Button-wrap-center'>
        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory} className='select-style'>
          <option value="総人口">総人口</option>
          <option value="年少人口">年少人口</option>
          <option value="老年人口">老年人口</option>
          <option value="生産年齢人口">生産年齢人口</option>
        </select>
        <button className='ResetButton' onClick={resetAll}>リセット</button>
      </div>
      <div className='Button-wrap-chart'>
        {renderChart()}
      </div>
    </div>
  );
}

export default ConnectComponent;
