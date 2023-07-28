import * as React from "react";
import CookiesContext, { CookiesContextProps } from "./context";

export const CookiesWrapper = ({ children }: React.PropsWithChildren) => {
  const [categories, setCategories] = React.useState<
    CookiesContextProps["categories"]
  >({});

  React.useEffect(() => {
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
