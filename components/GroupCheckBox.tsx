"use client"
// dataをfetchして、(各都道府県データ)個々のcheckboxに入れて表示
import React, { useState, useEffect } from 'react';
import CheckBox from "./CheckBox";
import { fetchPrefectures, fetchPopulationDataByPref } from '@/lib/actions';
import { PrefectureData } from "@/lib/types";

export default function GroupCheckBox() {
  const [data, setData] = useState<PrefectureData>({ statusCode: null, result: [], message: "" });
  const [selectedPrefectures, setSelectedPrefectures] = useState<string[]>([]);
  // useEffectでページが読み込まれるときに都道府県名をフェッチ
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

  useEffect(() => {
    console.log("Selected Prefectures:", selectedPrefectures);
  }, [selectedPrefectures]);

  const handleCheckboxChange = (prefName: string) => (checked: boolean) => {
    setSelectedPrefectures((prev) => {
      if (checked) {
        return [...prev, prefName];
      } else {
        return prev.filter((name) => name !== prefName);
      }
    });
  };

  if (!data || !data.result ) {
    if (data.statusCode) {
      return <div>{data.statusCode} {data.message}</div>;
    } else {
    return <div>Loading...data else</div>; // データがロードされるまでの表示
    }
  }

  return (
    <div className="GroupCheckBox">
      {data.result.map((prefecture) => (
        <CheckBox
          key={prefecture.prefCode}
          prefectureName={prefecture.prefName}
          onChange={handleCheckboxChange(prefecture.prefName)}
        />
      ))}
    </div>
  );
}

/*
export default async function GroupCheckBox() {
    const data: PrefectureData = await fetchPrefectures();
    return (
    <div className="GroupCheckBox">
      {data.result.map((prefecture) => (
        <CheckBox key={prefecture.prefCode} prefectureName={prefecture.prefName} />
      ))}
    </div>
    )
  }
*/