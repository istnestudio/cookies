import { useEffect } from "react";

import useCookies from "./useCookies";

import { CookiesContextProps } from "../context";

const useCookiesChange = (
  cb?: (cats: CookiesContextProps["categories"]) => any | undefined
) => {
  const { categories } = useCookies();

  useEffect(() => {
    cb && cb(categories as unknown as CookiesContextProps["categories"]);
  }, [categories]);
};

export default useCookiesChange;
