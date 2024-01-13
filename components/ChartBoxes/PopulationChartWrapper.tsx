"use client";
import React from "react";
import { PrefectureNames, LabelAndRawDatas, RawDataPair } from "@/lib/types";
import { ChartBox } from "./ChartBox";

export const SampleChartBox = ({
  prefectureNames,
  labelAndRawDatas,
  label,
}: {
  prefectureNames: PrefectureNames;
  labelAndRawDatas: LabelAndRawDatas | undefined;
  label: string;
}) => {
  if (prefectureNames && labelAndRawDatas) {
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
    return (
      <div>
        <div>Data is undefined.</div>
      </div>
    );
  }
};
