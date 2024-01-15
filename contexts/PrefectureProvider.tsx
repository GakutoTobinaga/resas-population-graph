// PrefectureProvider.tsx
"use client"
import React, { useState, ReactNode } from 'react';
import PrefectureContext from './PrefectureContext';
import { PrefectureContextType, PrefectureNames } from './PrefectureContextTypes';

interface PrefectureProviderProps {
    children: ReactNode;
  }
export const PrefectureProvider: React.FC<PrefectureProviderProps> = ({ children } : PrefectureProviderProps) => {
  const [prefectureNames, setPrefectureNames] = useState<PrefectureNames>({
    prefectureNameA: undefined,
    prefectureNameB: undefined,
  });

  const contextValue: PrefectureContextType = {
    prefectureNames,
    setPrefectureNames,
  };

  return (
    <PrefectureContext.Provider value={contextValue}>
      {children}
    </PrefectureContext.Provider>
  );
};
