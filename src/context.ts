import { createContext } from "react";

export type CookiesContextProps = {
  categories: { [key: string]: boolean };
  setCategory: (name: string, state: boolean) => any;
  addCategories: (cats: CookiesContextProps["categories"]) => any;
};

const CookiesContext = createContext<CookiesContextProps>({
  categories: {},
  setCategory: () => {},
  addCategories: () => {},
});

export default CookiesContext;
