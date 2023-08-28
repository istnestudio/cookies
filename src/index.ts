"use client";

import Cookies from "./Cookies.js";
import useCookiesChange from "./hooks/useCookiesChange.js";
import useCookiesCategories from "./hooks/useCookies.js";
import getIstneCookies from "./utils/getIstneCookies.js";

const COOKIE_PREFIX = "istne-cookies-";
const SHOWED_COOKIE = "showed";

type Category = {
  title: string;
  description: string;
  selected?: boolean;
  uncheckable?: boolean;
};

type CategoryState = { [key: string]: boolean };

export {
  COOKIE_PREFIX,
  SHOWED_COOKIE,
  Category,
  CategoryState,
  useCookiesChange,
  useCookiesCategories,
  getIstneCookies,
};

export default Cookies;
