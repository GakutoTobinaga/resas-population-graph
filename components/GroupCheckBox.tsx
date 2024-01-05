"use client"
// dataをfetchして、(各都道府県データ)個々のcheckboxに入れて表示
import React, { useState, useEffect, useRef } from 'react';
import { CheckBox } from './CheckBox';
import { fetchPrefectures, fetchPopulationDataByPref } from '@/lib/actions';
import { GroupCheckBoxProps, PrefectureData, PrefecturePopulationData } from "@/lib/types";

export default function GroupCheckBox({ selectedPrefectures, setSelectedPrefectures }: GroupCheckBoxProps) {
  const [data, setData] = useState<PrefectureData>({ statusCode: null, result: [], message: "" });
  // const [selectedPrefectures, setSelectedPrefectures] = useState<[string, number][]>([]);
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
    const fetchPrefData = async () => {
      console.log("OK")
      if (selectedPrefectures.length > 0) {
        let lastSelected = selectedPrefectures[selectedPrefectures.length - 1];
        console.log("Newly added prefecture code:", lastSelected[1]);
        try {
          const prefData = await fetchPopulationDataByPref(lastSelected[1])
          console.log(prefData)
        } catch (error){
          console.error("Error: fetchPopulationDataByPref");
        } finally {
          console.log("Finally: fetchPopulationDataByPref")
        }
    }
    }
    console.log("Selected Prefectures:", selectedPrefectures);
  }, [selectedPrefectures]);

  const handleCheckboxChange = (prefName: string, prefCode: number) => (checked: boolean) => {
    setSelectedPrefectures((prev) => {
      if (checked) {
        // 配列の長さが2未満の場合のみ、新しい要素を追加
        if (prev.length < 2) {
          return [...prev, [prefName, prefCode]];
        } else {
          // すでに2つの要素がある場合は、何も追加せずに現在の状態を維持
          return prev;
        }
      } else {
        // チェックが解除された場合は、該当する要素を削除
        return prev.filter((name) => name[0] !== prefName);
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
          onChange={handleCheckboxChange(prefecture.prefName, prefecture.prefCode)}
          disabled={selectedPrefectures.length >= 2 && !selectedPrefectures.some(item => item[0] === prefecture.prefName)}
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