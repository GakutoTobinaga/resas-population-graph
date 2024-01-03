export type Prefecture = {
    prefCode: number;
    prefName: string;
  };
  
export type PrefectureData = {
    statusCode: any;
    message: null | string;
    result: Prefecture[];
  };