import { createContext } from "react";

export type CookiesContextProps = {
  categories: { [key: string]: boolean };
  setCategory: (name: string, state: boolean) => any;
  setCategories: (cats: CookiesContextProps["categories"]) => any;
  isBoxOpen: boolean;
  changeBoxState: (state: boolean) => any;
};

const CookiesContext = createContext<CookiesContextProps>({
  categories: {},
  setCategory: () => {},
  setCategories: () => {},
  isBoxOpen: true,
  changeBoxState: () => {},
});

export default CookiesContext;
