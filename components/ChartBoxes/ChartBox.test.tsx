import React from "react";
import { render, screen } from "@testing-library/react";
import { ChartBox } from "./ChartBox";
import '@testing-library/jest-dom';

describe("ChartBox", () => {
  it("renders without crashing", () => {
    const mockData = {
      prefectureNames: {
        prefectureNameA: "Tokyo",
        prefectureNameB: "Osaka"
      },
      mainDatas: {
        dataA: [{ year: 1980, value: 100 }, { year: 1990, value: 200 }],
        dataB: [{ year: 1980, value: 150 }, { year: 1990, value: 250 }]
      }
    };
    render(<ChartBox {...mockData} />);
    expect(screen.getByRole("img")).toBeInTheDocument(); // グラフが描画されているか確認
  });

  // その他のテストケース...
});
