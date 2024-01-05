"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { PrefectureData, PopulationData } from '@/lib/types';
import { Poor_Story } from 'next/font/google';
import { disconnect } from 'process';

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
  // どこまで分解したデータを入れるか？→ カテゴリまで
export const ChartBox = (
    {prefectureName, populationCategory}
    : 
    {prefectureName: string, populationCategory: PopulationCategory | any}) => {
    //const dataValues = years.map(year => {
        // const dataPoint = populationData.find(data => data.year === year);
        // return dataPoint ? dataPoint.value : null;
     // });
    if (populationCategory) {
    const popData: PopulationData[] = populationCategory.data
    const years: number[] = [1980, 1990, 2000, 2010, 2020]
    const valuesForYears = years.map(year => {
        const dataPoint = popData.find(data => data.year === year);
        return dataPoint ? dataPoint.value : null;
      });
    // rateが含まれているのかをチェック
    const hasRate = popData.some(data => data.rate !== undefined);
    if (hasRate) {
        // rate用のチャートを追加... (optional)
    } else {
        // 同上
    }
    console.log(popData)
    console.log(valuesForYears)

    const data = {
        labels: ['1980', '1990', '2000', '2010', '2020'], // 何年
        datasets: [
          {
            label: prefectureName,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(0, 175, 240)',
            borderWidth: 3,
            hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
            hoverBorderColor: 'rgba(255, 99, 132, 1)',
            data: valuesForYears, // 実際の値
          },
        ],
      };
    return <Line data={data} />;
    } else {
        return <div>this component is undefined.</div>
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