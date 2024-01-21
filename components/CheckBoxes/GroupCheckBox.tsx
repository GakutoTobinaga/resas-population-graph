"use client";
import React, { useState, useEffect } from "react";
import { CheckBox } from "./CheckBox";
import { fetchPrefectures } from "@/lib/actions";
import { GroupCheckBoxProps, PrefectureNameDatas } from "@/lib/types";
import { Loading } from "../Loading";
import ErrorMsg from "../ErrorMsg";

export default function GroupCheckBox({
  selectedPrefectures,
  setSelectedPrefectures,
}: GroupCheckBoxProps) {
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<PrefectureNameDatas>({
    statusCode: null,
    result: [],
    message: null,
  });
  useEffect(() => {
    const fetchPrefectureNames = async () => {
      try {
        const fetchedData: PrefectureNameDatas = await fetchPrefectures();
        setData(fetchedData);
      } catch (error) {
        setIsError(true);
      } finally {
      }
    };
    fetchPrefectureNames();
  }, []);

  const handleCheckboxChange =
    (prefName: string, prefCode: number) => (checked: boolean) => {
      setSelectedPrefectures((prev) => {
        const alreadySelected = prev.some((item) => item[0] === prefName);

        if (checked && prev.length < 2 && !alreadySelected) {
          return [...prev, [prefName, prefCode]];
        } else if (!checked && alreadySelected) {
          return prev.filter((item) => item[0] !== prefName);
        }

        return prev;
      });
    };

  if (!data || !data.result) {
    return <Loading />;
  }

  return (
    <div className="GroupCheckBox">
      {data.result.map((prefecture) => (
        <CheckBox
          key={prefecture.prefCode}
          prefectureName={prefecture.prefName}
          onChange={handleCheckboxChange(
            prefecture.prefName,
            prefecture.prefCode,
          )}
          disabled={
            selectedPrefectures.length >= 2 &&
            !selectedPrefectures.some((item) => item[0] === prefecture.prefName)
          }
          checked={selectedPrefectures.some(
            (item) => item[0] === prefecture.prefName,
          )}
        />
      ))}
    </div>
  );
}
