import { COOKIE_PREFIX, SHOWED_COOKIE } from "..";
import getStringBoolValue from "./getStringBoolValue";

const getIstneCookies = () => {
  return document.cookie
    .split(";")
    .map((cookie) => {
      const [key, value] = cookie.trim().split("=");
      if (!key.startsWith(COOKIE_PREFIX) || key.endsWith(SHOWED_COOKIE))
        return {};

      return { [key.replace(COOKIE_PREFIX, "")]: getStringBoolValue(value) };
    })
    .reduce(
      (acc, curr) => (Object.keys(curr).length ? { ...acc, ...curr } : acc),
      {}
    );
};

export default getIstneCookies;
