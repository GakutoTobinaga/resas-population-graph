export type Prefecture = {
    prefCode: number;
    prefName: string;
  };
  
export type PrefectureData = {
    message: null | string;
    result: Prefecture[];
  };