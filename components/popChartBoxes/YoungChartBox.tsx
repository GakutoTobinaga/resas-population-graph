"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { PrefectureData, PopulationData } from '@/lib/types';
import { PrefectureNames, PrefectureDatas } from "@/lib/types";
import { LabelAndRawDatas } from "@/lib/types";
import { ChartBox } from '../ChartBox';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  
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


  // population dataを選択されたラベルに基づいて入れる
  // どこまで分解したデータを入れるか？
  // ABのデータだけに加工してチャートに渡す
export const YoungChartBox = (
    {prefectureNames, labelAndRawDatas}
    : 
    {prefectureNames: PrefectureNames, labelAndRawDatas: LabelAndRawDatas | undefined}) => {
        console.log(labelAndRawDatas)
        if (prefectureNames && labelAndRawDatas){
        const label: string = "年少人口"
        // labelを剥がして、ABのRawデータのみを渡す
        const RawDatas: RawDataPair = {
            dataA: labelAndRawDatas.dataA?.data,
            dataB: labelAndRawDatas.dataB?.data
        };
    return (
            <div>
                <div className='label'>{label}</div>
                <ChartBox prefectureNames={prefectureNames} mainDatas={RawDatas}/>
            </div>
            )
        } else {
    return (
            <div>
                <div>YoungCharBox is undefined.</div>
            </div>
            )
        }
};
