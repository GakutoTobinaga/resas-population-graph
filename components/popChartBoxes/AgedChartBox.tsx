"use client"
import { ChartBox } from "../ChartBox";
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { PrefectureData, PopulationData } from '@/lib/types';

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
  

  // population dataを選択されたラベルに基づいて入れる
  // どこまで分解したデータを入れるか？
export const AgedChartBox = (
    {prefectureName, populationCategory}
    : 
    {prefectureName: string, populationCategory: PopulationCategory | any }) => {
        const label: string = populationCategory.label
    return (
        <div>
            <div>{label}</div>
            <ChartBox/>
        </div>
    )
};