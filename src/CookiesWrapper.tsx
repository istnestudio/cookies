import { PropsWithChildren, useEffect, useState } from "react";

import cookie from "js-cookie";

import CookiesContext, { CookiesContextProps } from "./context";

import { COOKIE_PREFIX } from ".";

import getStringBoolValue from "./utils/getStringBoolValue";

export const CookiesWrapper = ({
  children,
  categories: defaultCategories,
}: CookiesWrapperProps) => {
  const [categories, setCats] =
    useState<CookiesContextProps["categories"]>(defaultCategories);

  const [isBoxOpen, changeBoxState] = useState<boolean>(false);

  useEffect(() => {
    Object.keys(categories).forEach((key) => {
      if (!cookie.get(`${COOKIE_PREFIX}${key}`)) {
        cookie.set(`${COOKIE_PREFIX}${key}`, "false");
        return;
      }

      setCategory(
        key,
        getStringBoolValue(cookie.get(`${COOKIE_PREFIX}${key}`))
      );
    });

    if (!getStringBoolValue(cookie.get(`${COOKIE_PREFIX}accepted`))) {
      cookie.set(`${COOKIE_PREFIX}accepted`, "false");
      changeBoxState(true);
    }
  }, []);

  const setCategory = (key: string, state: boolean) => {
    const categoriesCopy = { ...categories };

    categoriesCopy[key].selected = state;
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
        isCookiesBoxOpen: isBoxOpen,
        changeCookiesBoxState: changeBoxState,
      }}
    >
      {children}
    </CookiesContext.Provider>
  );
};

type CookiesWrapperProps = PropsWithChildren<{
  categories: CookiesContextProps["categories"];
}>;
