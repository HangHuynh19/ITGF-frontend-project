import React, { createContext, useState } from 'react';

type MainContextValue = {
  sortingCondition: string;
  setSortingCondition: React.Dispatch<React.SetStateAction<string>>;
};

export const MainContext = createContext<MainContextValue>(
  {} as MainContextValue
);

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [sortingCondition, setSortingCondition] = useState(
    'Price | lowest to highest'
  );

  return (
    <MainContext.Provider value={{ sortingCondition, setSortingCondition }}>
      {children}
    </MainContext.Provider>
  );
};
