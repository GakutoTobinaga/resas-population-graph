"use client";
import { ChartBox } from "../ChartBox";
import React from "react";
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
import { PopulationData, PrefectureNames, LabelAndRawDatas } from "@/lib/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type PopulationCategory = {
  label: string;
  data: PopulationData[];
};

type PrefecturePopulationData = {
  message: null | string;
  result: {
    boundaryYear: number;
    data: PopulationCategory[];
  };
};
export type RawDataPair = {
  dataA: PopulationData[] | undefined;
  dataB: PopulationData[] | undefined;
};

export const AgedChartBox = ({
  prefectureNames,
  labelAndRawDatas,
}: {
  prefectureNames: PrefectureNames;
  labelAndRawDatas: LabelAndRawDatas | undefined;
}) => {
  if (prefectureNames && labelAndRawDatas) {
    const label: string = "老年人口";
    const RawDatas: RawDataPair = {
      dataA: labelAndRawDatas.dataA?.data,
      dataB: labelAndRawDatas.dataB?.data,
    };
    return (
      <div>
        <div className="label">{label}</div>
        <ChartBox prefectureNames={prefectureNames} mainDatas={RawDatas} />
      </div>
    );
  } else {
    const label: string = "老年人口";
    const RawDatas: RawDataPair = {
      dataA: undefined,
      dataB: undefined,
    };
    return (
      <div>
        <div className="label">{label}</div>
        <ChartBox prefectureNames={prefectureNames} mainDatas={RawDatas} />
      </div>
    );
  }
};
