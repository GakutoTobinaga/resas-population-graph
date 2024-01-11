"use client"
import React, { useState, useEffect, useRef } from 'react';
import { CheckBox } from './CheckBox';
import { fetchPrefectures } from '@/lib/actions';
import { GroupCheckBoxProps, PrefectureData } from "@/lib/types";

export default function GroupCheckBox({ selectedPrefectures, setSelectedPrefectures }: GroupCheckBoxProps) {
  const [data, setData] = useState<PrefectureData>({ statusCode: null, result: [], message: "" });
  useEffect(() => {
    const fetchData = async () => {
    try {
      const fetchedData: PrefectureData = await fetchPrefectures();
      console.log(fetchedData.message)
      setData(fetchedData);
      if (data.message){
        console.log(data.message)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      console.log("fetchData has been executed, it's finally.")
    }
    };
    fetchData();
  }, []);
  
// for debugging
  useEffect(() => {
    const fetchPrefData = async () => {
      if (selectedPrefectures.length > 0) {
        let lastSelected = selectedPrefectures[selectedPrefectures.length - 1];
        // console.log("Newly added prefecture code:", lastSelected[1]);
        try {
          // const prefData = await fetchPopulationDataByPref(lastSelected[1])
          // console.log(prefData)
        } catch (error){
          // console.error("Error: fetchPopulationDataByPref");
        } finally {
          // console.log("Finally: fetchPopulationDataByPref")
        }
    }
    }
    console.log("Selected Prefectures:", selectedPrefectures);
  }, [selectedPrefectures]);

  const handleCheckboxChange = (prefName: string, prefCode: number) => (checked: boolean) => {
    setSelectedPrefectures((prev) => {
      if (checked) {
        if (prev.length < 2) {
          return [...prev, [prefName, prefCode]];
        } else {
          return prev;
        }
      } else {
        return prev.filter((name) => name[0] !== prefName);
      }
    });
  };
  

  if (!data || !data.result ) {
    if (data.statusCode) {
      return <div>{data.statusCode} {data.message}</div>;
    } else {
    return <div>Loading...data else</div>;
    }
  }

  return (
    <div className="GroupCheckBox">
      {data.result.map((prefecture) => (
        <CheckBox
          key={prefecture.prefCode}
          prefectureName={prefecture.prefName}
          onChange={handleCheckboxChange(prefecture.prefName, prefecture.prefCode)}
          disabled={selectedPrefectures.length >= 2 && !selectedPrefectures.some(item => item[0] === prefecture.prefName)}
          checked={selectedPrefectures.some(item => item[0] === prefecture.prefName)}
        />
      ))}
    </div>
  );
}