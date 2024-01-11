import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { PrefectureNames } from "@/lib/types"; // Replace with your actual import path
import { RawDataPair } from "./popChartBoxes/YoungChartBox";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const ChartBox = ({
  prefectureNames,
  mainDatas,
}: {
  prefectureNames: PrefectureNames;
  mainDatas: RawDataPair;
}) => {
  const [datasets, setDatasets] = useState<any>([]);
  const years = [1980, 1990, 2000, 2010, 2020];

  useEffect(() => {
    let newDatasets = [];

    if (prefectureNames.prefectureNameA && mainDatas.dataA) {
      const valuesA = years.map(
        (year) =>
          mainDatas.dataA?.find((data) => data.year === year)?.value ?? null,
      );
      newDatasets.push({
        label: prefectureNames.prefectureNameA,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(0, 175, 240)",
        borderWidth: 3,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        data: valuesA,
      });
    }

    if (prefectureNames.prefectureNameB && mainDatas.dataB) {
      const valuesB = years.map(
        (year) =>
          mainDatas.dataB?.find((data) => data.year === year)?.value ?? null,
      );
      newDatasets.push({
        label: prefectureNames.prefectureNameB,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(100, 0, 240)",
        borderWidth: 3,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        data: valuesB,
      });
    }

    setDatasets(newDatasets);
  }, [prefectureNames, mainDatas]);

  const chartData = {
    labels: years,
    datasets: datasets,
  };

  return <Line data={chartData} />;
};
