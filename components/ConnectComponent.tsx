"use client";
import React, { useState, useEffect } from "react";
import GroupCheckBox from "@/components/CheckBoxes/GroupCheckBox";
import { fetchPopulationDataByPref } from "@/lib/actions";
import {
  PrefecturePopulationData,
  PrefectureNames,
  LabelAndRawDatas,
} from "@/lib/types";
import { ChartBoxWrapper } from "./ChartBoxes/PopulationChartWrapper";
import dynamic from "next/dynamic";

export function ConnectComponent() {
  const MsgForUser = dynamic(() => import("./MsgForUser"), {
    ssr: false,
  });
  const [selectedCategory, setSelectedCategory] = useState("総人口");
  const [selectedPrefectures, setSelectedPrefectures] = useState<
    [string, number][]
  >([]);

  const [prefectureNames, setPrefectureNames] = useState<PrefectureNames>({
    prefectureNameA: undefined,
    prefectureNameB: undefined,
  });

  const [totalRawDatas, setTotalRawDatas] = useState<LabelAndRawDatas>({
    label: "総人口",
    dataA: undefined,
    dataB: undefined,
  });
  const [agedRawDatas, setAgedRawDatas] = useState<LabelAndRawDatas>({
    label: "老年人口",
    dataA: undefined,
    dataB: undefined,
  });
  const [youngRawDatas, setYoungRawDatas] = useState<LabelAndRawDatas>({
    label: "年少人口",
    dataA: undefined,
    dataB: undefined,
  });
  const [workingRawDatas, setWorkingRawDatas] = useState<LabelAndRawDatas>({
    label: "生産年齢人口",
    dataA: undefined,
    dataB: undefined,
  });

  useEffect(() => {
    const fetchData = async () => {
      let A: number | undefined = undefined;
      let B: number | undefined = undefined;
      if (selectedPrefectures.length == 1) {
        A = selectedPrefectures[0][1];
        setPrefectureNames((prevNames) => ({
          ...prevNames,
          prefectureNameA: selectedPrefectures[0][0],
          prefectureNameB: undefined,
        }));

        const dataA: PrefecturePopulationData =
          await fetchPopulationDataByPref(A);
        setTotalRawDatas((prevNames) => ({
          ...prevNames,
          dataA: dataA.result.data.find(
            (category) => category.label === totalRawDatas.label,
          ),
        }));
        setYoungRawDatas((prevNames) => ({
          ...prevNames,
          dataA: dataA.result.data.find(
            (category) => category.label === youngRawDatas.label,
          ),
        }));
        setAgedRawDatas((prevNames) => ({
          ...prevNames,
          dataA: dataA.result.data.find(
            (category) => category.label === agedRawDatas.label,
          ),
        }));
        setWorkingRawDatas((prevNames) => ({
          ...prevNames,
          dataA: dataA.result.data.find(
            (category) => category.label === workingRawDatas.label,
          ),
        }));
      } else if (selectedPrefectures.length >= 2) {
        B = selectedPrefectures[1][1];
        setPrefectureNames((prevNames) => ({
          ...prevNames,
          prefectureNameB: selectedPrefectures[1][0],
        }));
        const dataB: PrefecturePopulationData =
          await fetchPopulationDataByPref(B);
        setTotalRawDatas((prevNames) => ({
          ...prevNames,
          dataB: dataB.result.data.find(
            (category) => category.label === totalRawDatas.label,
          ),
        }));
        setYoungRawDatas((prevNames) => ({
          ...prevNames,
          dataB: dataB.result.data.find(
            (category) => category.label === youngRawDatas.label,
          ),
        }));
        setAgedRawDatas((prevNames) => ({
          ...prevNames,
          dataB: dataB.result.data.find(
            (category) => category.label === agedRawDatas.label,
          ),
        }));
        setWorkingRawDatas((prevNames) => ({
          ...prevNames,
          dataB: dataB.result.data.find(
            (category) => category.label === workingRawDatas.label,
          ),
        }));
      } else {
        setPrefectureNames({
          prefectureNameA: undefined,
          prefectureNameB: undefined,
        });
      }
    };
    fetchData();
  }, [selectedPrefectures]);

  const resetAll = () => {
    setSelectedPrefectures([]);
    setPrefectureNames({
      prefectureNameA: undefined,
      prefectureNameB: undefined,
    });
    setTotalRawDatas({
      label: "総人口",
      dataA: undefined,
      dataB: undefined,
    });
    setAgedRawDatas({
      label: "老年人口",
      dataA: undefined,
      dataB: undefined,
    });
    setYoungRawDatas({
      label: "年少人口",
      dataA: undefined,
      dataB: undefined,
    });
    setWorkingRawDatas({
      label: "生産年齢人口",
      dataA: undefined,
      dataB: undefined,
    });
  };
  const renderChart = () => {
    switch (selectedCategory) {
      case "総人口":
        return (
          <ChartBoxWrapper
            prefectureNames={prefectureNames}
            labelAndRawDatas={totalRawDatas}
            label={totalRawDatas.label}
          />
        );
      case "年少人口":
        return (
          <ChartBoxWrapper
            prefectureNames={prefectureNames}
            labelAndRawDatas={youngRawDatas}
            label={youngRawDatas.label}
          />
        );
      case "老年人口":
        return (
          <ChartBoxWrapper
            prefectureNames={prefectureNames}
            labelAndRawDatas={agedRawDatas}
            label={agedRawDatas.label}
          />
        );
      case "生産年齢人口":
        return (
          <ChartBoxWrapper
            prefectureNames={prefectureNames}
            labelAndRawDatas={workingRawDatas}
            label={workingRawDatas.label}
          />
        );
      default:
        return null;
    }
  };

  if (!prefectureNames.prefectureNameA && !prefectureNames.prefectureNameB) {
    return (
      <div>
        <GroupCheckBox
          selectedPrefectures={selectedPrefectures}
          setSelectedPrefectures={setSelectedPrefectures}
        />
        <MsgForUser />
      </div>
    );
  }

  return (
    <div>
      <div>
        <GroupCheckBox
          selectedPrefectures={selectedPrefectures}
          setSelectedPrefectures={setSelectedPrefectures}
        />
        <div className="Button-wrap-center">
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
            className="select-style"
          >
            <option value="総人口">総人口</option>
            <option value="年少人口">年少人口</option>
            <option value="老年人口">老年人口</option>
            <option value="生産年齢人口">生産年齢人口</option>
          </select>
          <button className="ResetButton" onClick={resetAll}>
            リセット
          </button>
        </div>
        <div className="Button-wrap-chart">{renderChart()}</div>
      </div>
    </div>
  );
}

export default ConnectComponent;
