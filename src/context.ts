import { createContext } from "react";

export type Category = {
  title: string;
  description: string;
  selected?: boolean;
};

export type CookiesContextProps = {
  categories: { [key: string]: Category };
  setCategory: (key: string, state: boolean) => any;
  setCategories: (cats: CookiesContextProps["categories"]) => any;
  isCookiesBoxOpen: boolean;
  changeCookiesBoxState: (state: boolean) => any;
};

const CookiesContext = createContext<CookiesContextProps>({
  categories: {},
  setCategory: () => {},
  setCategories: () => {},
  isCookiesBoxOpen: true,
  changeCookiesBoxState: () => {},
});

export default CookiesContext;
