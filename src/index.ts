import Cookies from "./Cookies.js";
import { CookiesWrapper } from "./CookiesWrapper.js";
import useCookies from "./hooks/useCookies.js";
import useCookiesChange from "./hooks/useCookiesChange.js";
import useCookiesBoxState from "./hooks/useCookiesBoxState.js";

const COOKIE_PREFIX = "cookies-";

export {
  CookiesWrapper,
  useCookies,
  useCookiesChange,
  useCookiesBoxState,
  COOKIE_PREFIX,
};
export default Cookies;
