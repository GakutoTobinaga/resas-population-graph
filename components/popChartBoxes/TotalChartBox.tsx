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
export const TotalChartBox = (
    {prefectureName, populationCategory}
    : 
    {prefectureName: string | undefined, populationCategory: PopulationCategory | undefined }) => {
        if (prefectureName && populationCategory){
        const label: string = populationCategory.label
        const totalPopData: PopulationData[] = populationCategory.data
    return (
            <div>
                <div>{label}</div>
                <ChartBox prefectureName={prefectureName} populationCategory={populationCategory}/>
            </div>
            )
        } else {
    return (
            <div>
                <div>TotalCharBox is undefined.</div>
            </div>
            )
        }
};

/* 例
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
      hoverBorderColor: 'rgba(255, 99, 132, 1)',
      data: [65, 59, 80, 81, 56, 55],
    },
  ],
};
*/