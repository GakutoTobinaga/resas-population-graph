export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PrefectureData = {
  statusCode: any;
  message: null | string;
  result: Prefecture[];
};

export type PopulationData = {
  year: number;
  value: number;
  rate?: number;
};

export type PopulationCategory = {
  label: string;
  data: PopulationData[];
};

export type PrefecturePopulationData = {
  message: null | string;
  result: {
    boundaryYear: number;
    data: PopulationCategory[];
  };
};

export interface GroupCheckBoxProps {
  selectedPrefectures: [string, number][];
  setSelectedPrefectures: React.Dispatch<
    React.SetStateAction<[string, number][]>
  >;
}

export type PrefectureNames = {
  prefectureNameA: string | undefined;
  prefectureNameB: string | undefined;
};

export type PrefectureDatas = {
  prefectureDataA: PopulationData[];
  prefectureDataB: PopulationData[];
};

export type LabelAndRawDatas = {
  label: string | undefined;
  dataA: PopulationCategory | undefined;
  dataB: PopulationCategory | undefined;
};
