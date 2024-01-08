import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { PrefectureNames} from '@/lib/types'; // Replace with your actual import path
import { RawDataPair } from './popChartBoxes/YoungChartBox';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const ChartBox = ({ prefectureNames, mainDatas }: { prefectureNames: PrefectureNames, mainDatas: RawDataPair }) => {
    const [datasets, setDatasets] = useState<any>([]);
    const years = [1980, 1990, 2000, 2010, 2020];
    
    useEffect(() => {
        let newDatasets = [];

        if (prefectureNames.prefectureNameA && mainDatas.dataA) {
            const valuesA = years.map(year => mainDatas.dataA?.find(data => data.year === year)?.value ?? null);
            newDatasets.push({
                label: prefectureNames.prefectureNameA,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(0, 175, 240)',
                borderWidth: 3,
                hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
                hoverBorderColor: 'rgba(255, 99, 132, 1)',
                data: valuesA,
            });
        }

        if (prefectureNames.prefectureNameB && mainDatas.dataB) {
            const valuesB = years.map(year => mainDatas.dataB?.find(data => data.year === year)?.value ?? null);
            newDatasets.push({
                label: prefectureNames.prefectureNameB,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(100, 0, 240)',
                borderWidth: 3,
                hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
                hoverBorderColor: 'rgba(255, 99, 132, 1)',
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

/*
"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { PrefectureData, PopulationData, PrefectureNames } from '@/lib/types';
import { Poor_Story } from 'next/font/google';
import { disconnect } from 'process';
import { RawDataPair } from './popChartBoxes/YoungChartBox';
import { useState, useEffect } from 'react';

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
  // labelを剥がされたyearとvalue, rateだけのデータ（A,B）を受け取る。（まだない）
export const ChartBoxForTotal = (
    {prefectureNames, mainDatas}
    : 
    {prefectureNames: PrefectureNames, mainDatas: RawDataPair}) => {
    const [datasets, setDatasets] = useState<any>([]);
    const years: number[] = [1980, 1990, 2000, 2010, 2020]
    if (mainDatas) {
    //　表示する年を設定.
    useEffect(() => {
      if (!prefectureNames.prefectureNameA && !prefectureNames.prefectureNameB) {
        setDatasets([]);
        return;
      }
    
      let newDatasets : any = [];
    
      
      if (prefectureNames.prefectureNameA && mainDatas.dataA) {
        const valuesForYearsA = years.map(year => mainDatas.dataA?.find(data => data.year === year)?.value ?? null);
        newDatasets.push({
          label: prefectureNames.prefectureNameA,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(0, 175, 240)',
          borderWidth: 3,
          hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
          hoverBorderColor: 'rgba(255, 99, 132, 1)',
          data: valuesForYearsA, // 実際の値
        });
        console.log(valuesForYearsA)
      } else {
        // 都道府県Aに関連するデータセットの削除
        newDatasets = newDatasets.filter(dataset => dataset.label !== prefectureNames.prefectureNameB);
      }
      if (prefectureNames.prefectureNameB && mainDatas.dataB) {
        const valuesForYearsB = years.map(year => mainDatas.dataB?.find(data => data.year === year)?.value ?? null);
        newDatasets.push({
          label: prefectureNames.prefectureNameB,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(100, 0, 240)',
          borderWidth: 3,
          hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
          hoverBorderColor: 'rgba(255, 99, 132, 1)',
          data: valuesForYearsB, // 実際の値
        });
        console.log(valuesForYearsB)
      } else {
        // 都道府県Aに関連するデータセットの削除
        newDatasets = newDatasets.filter(dataset => dataset.label !== prefectureNames.prefectureNameA);
      }
      // Create an array for new datasets based on provided data
      
      // Logic to create datasets for prefectureNameA and prefectureNameB
      // similar to your existing code...
      console.log(newDatasets)
      newDatasets = newDatasets.slice(0, 2);
      setDatasets(newDatasets);
      console.log(newDatasets)
      newDatasets = newDatasets.filter(dataset => 
        dataset.label === prefectureNames.prefectureNameA || 
        dataset.label === prefectureNames.prefectureNameB
      );
    }, [prefectureNames, mainDatas]); // Depend on prefectureNames and mainDatas
    const chartData = {
      labels: years,
      datasets: datasets,
    };
    return <Line data={chartData} />;
  } else {
    console.log("Nothing at chartbox")
    return <div>this component is undefined, couldn't receive some datas at ChartBoxForTotal.box component.</div>
  }
};


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