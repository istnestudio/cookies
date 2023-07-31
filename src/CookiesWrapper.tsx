import React, { PropsWithChildren, useState, useEffect } from "react";
import CookiesContext, { CookiesContextProps } from "./context";

export const CookiesWrapper = ({ children }: PropsWithChildren) => {
  const [categories, setCategories] = useState<
    CookiesContextProps["categories"]
  >({});

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const setCategory = (name: string, state: boolean) => {
    const categoriesCopy = { ...categories };

    categoriesCopy[name] = state;
    setCategories(categoriesCopy);
  };

  const addCategories = (cats: CookiesContextProps["categories"]) => {
    setCategories({ ...categories, ...cats });
  };

  return (
    <CookiesContext.Provider value={{ categories, setCategory, addCategories }}>
      {children}
    </CookiesContext.Provider>
  );
};
