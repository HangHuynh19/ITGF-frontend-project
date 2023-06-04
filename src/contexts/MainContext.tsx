import React, { createContext, useState } from 'react';

type MainContextValue = {
  sortingCondition: string;
  setSortingCondition: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

export const MainContext = createContext<MainContextValue>(
  {} as MainContextValue
);

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [sortingCondition, setSortingCondition] = useState('None');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All categories');

  return (
    <MainContext.Provider
      value={{
        sortingCondition,
        setSortingCondition,
        searchTerm,
        setSearchTerm,
        category,
        setCategory,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
