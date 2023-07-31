import { PropsWithChildren, useState } from "react";
import CookiesContext, { CookiesContextProps } from "./context";

export const CookiesWrapper = ({ children }: PropsWithChildren) => {
  const [categories, setCats] = useState<CookiesContextProps["categories"]>({});

  const [isBoxOpen, changeBoxState] = useState<boolean>(true);

  const setCategory = (name: string, state: boolean) => {
    const categoriesCopy = { ...categories };

    categoriesCopy[name] = state;
    setCategories(categoriesCopy);
  };

  const setCategories = (cats: CookiesContextProps["categories"]) => {
    setCats({ ...categories, ...cats });
  };

  return (
    <CookiesContext.Provider
      value={{
        categories,
        setCategory,
        setCategories,
        isBoxOpen,
        changeBoxState,
      }}
    >
      {children}
    </CookiesContext.Provider>
  );
};
