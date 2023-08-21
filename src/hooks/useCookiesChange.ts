import { useEffect, useRef } from "react";

import getIstneCookies from "../utils/getIstneCookies";
import { SHOWED_COOKIE } from "..";

const useCookiesChange = (
  cb?: (cat: { key: string; value: boolean }) => any | undefined
) => {
  const interval = useRef<NodeJS.Timer>();

  useEffect(() => {
    let istneCookies = getIstneCookies();

    interval.current = setInterval(() => {
      Object.entries(istneCookies).forEach(([key, value], idx) => {
        const compareValue = Object.values(getIstneCookies())[idx];

        if (compareValue !== value && cb && key !== SHOWED_COOKIE)
          cb({
            key,
            value: compareValue,
          });
      });

      istneCookies = getIstneCookies();
    }, 250);

    return () => {
      clearInterval(interval.current);
    };
  }, []);
};

export default useCookiesChange;
