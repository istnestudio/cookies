"use client";

import {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
  CSSProperties,
  HTMLAttributes,
  useEffect,
} from "react";

import gsap from "gsap";

import cookie from "js-cookie";

import { SHOWED_COOKIE, COOKIE_PREFIX, useCookiesChange, Category } from ".";

import hexToHsl from "./utils/hexToHsl";

import useCookies from "./hooks/useCookies";

import { Switch } from "./@/components/ui/switch";
import { cn } from "./@/lib/utils";

export type CookiesProps = {
  categories: { [key: string]: Category };
  texts?: {
    title?: string;
    accept?: string;
    back?: string;
    personalize?: string;
    choiceAccept: string;
  };
  colors?: {
    main?: string;
    background?: string;
    description?: string;
    switch: string;
    switchChecked: string;
    button?: string;
  };
  onCookiesChange?: (cat: { key: string; value: boolean }) => any;
};

const defaultProps: CookiesProps = {
  categories: {},
  texts: {
    title: "Cookie files",
    accept: "accept",
    choiceAccept: "accept the choice",
    back: "back",
    personalize: "personalize",
  },
  colors: {
    switch: "#eaeaea",
    switchChecked: "#FFF",
    main: "#002B89",
    background: "#FFF",
    description: "#777",
    button: "#FFF",
  },
};

const Cookies = forwardRef<
  HTMLDivElement,
  CookiesProps & HTMLAttributes<HTMLDivElement>
>(
  (
    {
      texts,
      colors,
      onCookiesChange,
      children,
      categories,
      className,
      ...domProps
    },
    ref
  ) => {
    const [isPersonalizing, setIsPersonalizing] = useState(false);
    const [isCookiesBoxOpen, setCookiesBoxOpen] = useState(false);

    const {
      categories: selectedCategories,
      setCategory,
      setCategories,
    } = useCookies();

    const [categoriesExpanded, setCategoriesExpanded] = useState<boolean[]>([]);

    const innerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => innerRef.current!);

    useEffect(() => {
      if (categoriesExpanded.length || !selectedCategories) return;

      setCategoriesExpanded([
        ...Object.keys({ ...selectedCategories }).map(() => false),
      ]);
    }, [selectedCategories]);

    useCookiesChange(onCookiesChange);

    useEffect(() => {
      Object.entries(categories).forEach(([key, { selected }]) => {
        if (!cookie.get(`${COOKIE_PREFIX}${key}`)) {
          cookie.set(`${COOKIE_PREFIX}${key}`, selected?.toString() || "false");
          return;
        }
      });

      if (cookie.get(`${COOKIE_PREFIX}${SHOWED_COOKIE}`) === undefined) {
        cookie.set(`${COOKIE_PREFIX}${SHOWED_COOKIE}`, "false");
      }

      if (
        ["false", undefined].includes(
          cookie.get(`${COOKIE_PREFIX}${SHOWED_COOKIE}`)
        )
      ) {
        setCookiesBoxOpen(true);
      }
    }, []);

    const onSwitchChange = (idx: number, checked: boolean, key: string) => {
      const switchBtn = innerRef.current?.querySelectorAll("span[data-state]")[
        idx
      ] as HTMLButtonElement;

      switchBtn &&
        switchBtn.style.setProperty(
          "--background",
          hexToHsl(checked ? colors?.switchChecked : colors?.main)
        );

      setCategory(key, checked);
    };

    useEffect(() => {
      if (!isPersonalizing || !selectedCategories) return;

      Object.entries(selectedCategories).forEach(([key, selected], idx) =>
        onSwitchChange(idx, selected || false, key)
      );
    }, [isPersonalizing]);

    if (!isCookiesBoxOpen || !selectedCategories) return null;

    const onCategoryExpand = (idx: number) => {
      const expandedCopy = [...categoriesExpanded];
      expandedCopy[idx] = !categoriesExpanded[idx];

      setCategoriesExpanded(expandedCopy);

      const categoryDescription = innerRef.current?.querySelectorAll(
        ".category-description"
      )[idx]!;

      const categoryState = !categoriesExpanded[idx];

      gsap.set(categoryDescription, { autoAlpha: 0 });

      gsap.to(categoryDescription, {
        duration: 0.2,
        height: categoryState ? "auto" : 0,
        opacity: categoryState ? 1 : 0,
        autoAlpha: categoryState ? 1 : 0,
      });
    };

    const selectAllCategories = () => {
      if (!selectedCategories) return;

      setCategories(
        Object.entries(selectedCategories).reduce((acc, [key]) => {
          cookie.set(`${COOKIE_PREFIX}${key}`, "true");
          return { ...acc, key: true };
        }, {})
      );
    };

    const handleAcceptClick = () => {
      if (!selectedCategories) return;
      if (!isPersonalizing) selectAllCategories();

      setCookiesBoxOpen(false);
      cookie.set(`${COOKIE_PREFIX}${SHOWED_COOKIE}`, "true");
    };

    return (
      <div
        {...domProps}
        ref={innerRef}
        className={cn(
          "tw-p-12 tw-flex tw-left-6 tw-flex-col tw-gap-16 tw-z-[1000000] tw-shadow-sm tw-bottom-6 tw-w-[calc(100%-48px)] lg:tw-w-fit lg:tw-max-w-[396px] tw-fixed lg:tw-right-12 lg:tw-bottom-12 lg:tw-left-auto",
          className
        )}
        style={{ background: colors?.background }}
      >
        <p
          className="tw-text-lg tw-font-medium"
          style={{ color: colors?.main }}
        >
          {texts?.title}
        </p>
        {isPersonalizing ? (
          <div className="tw-flex tw-flex-col tw-gap-4">
            {Object.entries(categories).map(
              ([key, { title, description, uncheckable }], idx) => (
                <div className="tw-flex tw-flex-col tw-gap-2" key={key}>
                  <div className="tw-flex tw-gap-4 tw-items-center">
                    <button
                      className="tw-w-fit tw-h-fit tw-transition-transform"
                      onClick={() => onCategoryExpand(idx)}
                      style={{
                        transform: `rotateZ(${
                          categoriesExpanded[idx] ? 180 : 0
                        }deg)`,
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="8"
                        viewBox="0 0 11 8"
                        fill="none"
                      >
                        <path
                          d="M1 1.5L5.5 6.5L10 1.5"
                          stroke={colors?.main}
                          strokeWidth="2"
                        />
                      </svg>
                    </button>
                    <p
                      className="tw-w-full tw-text-base tw-cursor-pointer"
                      style={{ color: colors?.main }}
                      onClick={() => onCategoryExpand(idx)}
                    >
                      {title}
                    </p>
                    <Switch
                      checked={selectedCategories[key]}
                      onCheckedChange={(checked) =>
                        !uncheckable && onSwitchChange(idx, checked, key)
                      }
                      className="sw tw-h-[22px] tw-px-[2px]"
                      style={
                        {
                          opacity: uncheckable ? "0.6" : "1.0",
                          cursor: uncheckable ? "not-allowed" : "pointer",
                          "--primary": hexToHsl(colors?.main),
                          "--input": hexToHsl(colors?.switch),
                          "--background": hexToHsl(
                            selectedCategories[key]
                              ? colors?.switchChecked
                              : colors?.main
                          ),
                        } as CSSProperties
                      }
                    />
                  </div>
                  <p
                    className="category-description tw-text-xs tw-h-0 !tw-leading-[18px] tw-opacity-0 tw-pointer-events-none"
                    style={{ color: colors?.description }}
                  >
                    {description}
                  </p>
                </div>
              )
            )}
          </div>
        ) : (
          <p
            className="tw-text-sm tw-!leading-7"
            style={{ color: colors?.description }}
          >
            {children}
          </p>
        )}

        <div>
          <button
            className="tw-px-6 tw-py-4 tw-text-sm"
            style={{ background: colors?.main, color: colors?.button }}
            onClick={handleAcceptClick}
          >
            {isPersonalizing ? texts?.choiceAccept : texts?.accept}
          </button>
          <button
            onClick={() => setIsPersonalizing(!isPersonalizing)}
            className="tw-px-6 tw-py-4 tw-text-sm"
            style={{ color: colors?.description }}
          >
            {isPersonalizing ? texts?.back : texts?.personalize}
          </button>
        </div>
      </div>
    );
  }
);

Cookies.defaultProps = defaultProps;

export default Cookies;
