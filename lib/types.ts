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
    setSelectedPrefectures: React.Dispatch<React.SetStateAction<[string, number][]>>;
  }