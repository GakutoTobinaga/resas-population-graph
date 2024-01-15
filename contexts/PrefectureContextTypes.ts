// PrefectureContextTypes.ts

export interface PrefectureNames {
    prefectureNameA: string | undefined;
    prefectureNameB: string | undefined;
  }
  
export interface PrefectureContextType {
    prefectureNames: PrefectureNames;
    setPrefectureNames: React.Dispatch<React.SetStateAction<PrefectureNames>>;
  }
  