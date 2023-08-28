import { useEffect, useState } from "react";

import cookie from "js-cookie";

import getIstneCookies from "../utils/getIstneCookies";

import useCookiesChange from "./useCookiesChange";

import { COOKIE_PREFIX, CategoryState } from "..";

const useCookies = () => {
  const [categories, setCategories] = useState<CategoryState>();

  useCookiesChange(() => setCategories(getIstneCookies()));

  const setCategory = (key: string, state: boolean) => {
    const categoriesCopy = { ...categories };

    categoriesCopy[key] = state;
    setCategories(categoriesCopy);

    cookie.set(`${COOKIE_PREFIX}${key}`, state.toString());
  };

  useEffect(() => {
    setCategories(getIstneCookies());
  }, []);

  return {
    categories,
    setCategory,
    setCategories,
  };
};

export default useCookies;
