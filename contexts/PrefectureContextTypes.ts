// PrefectureContextTypes.ts

export interface PrefectureNames {
  prefectureNameA: string | undefined;
  prefectureNameB: string | undefined;
}

export interface PrefectureContextType {
  prefectureNamesByContext: PrefectureNames;
  setPrefectureNamesByContext: React.Dispatch<
    React.SetStateAction<PrefectureNames>
  >;
}
