import { useEffect } from "react";

import useCookies from "./useCookies";

const useCookiesBoxState = (cb?: (cats: boolean) => any | undefined) => {
  const { isCookiesBoxOpen } = useCookies();

  useEffect(() => {
    cb && cb(isCookiesBoxOpen);
  }, [isCookiesBoxOpen]);
};

export default useCookiesBoxState;
