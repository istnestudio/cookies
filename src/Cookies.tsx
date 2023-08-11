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

import hexToHsl from "./utils/hexToHsl";

import {
  COOKIE_PREFIX,
  useCookies,
  useCookiesBoxState,
  useCookiesChange,
} from ".";

import { CookiesContextProps } from "./context";

import { Switch } from "./@/components/ui/switch";

import { cn } from "./@/lib/utils";

type CookiesProps = {
  texts?: {
    title?: string;
    accept?: string;
    back?: string;
    personalize?: string;
    choiceAccept: string;
    description?: string;
  };
  colors?: {
    main?: string;
    background?: string;
    description?: string;
    switch: string;
    switchChecked: string;
    button?: string;
  };
  onCookiesChange?: (cats: CookiesContextProps["categories"]) => any;
  onCookiesBoxState?: (state: boolean) => any;
};

const defaultProps: CookiesProps = {
  texts: {
    description:
      "The site uses cookies to provide the highest quality service and for statistical purposes. You can read more in our privacy policy page",
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
      onCookiesBoxState,
      className,
      ...domProps
    },
    ref
  ) => {
    const [isPersonalizing, setIsPersonalizing] = useState(false);

    const {
      setCategory,
      categories: selectedCategories,
      setCategories,
      isCookiesBoxOpen,
      changeCookiesBoxState,
    } = useCookies();

    const [categoriesExpanded, setCategoriesExpanded] = useState<boolean[]>([
      ...Object.keys(selectedCategories).map(() => false),
    ]);

    useCookiesChange(onCookiesChange);
    useCookiesBoxState(onCookiesBoxState);

    const innerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => innerRef.current!);

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
      if (!isPersonalizing) return;

      Object.entries(selectedCategories).forEach(([key, { selected }], idx) =>
        onSwitchChange(idx, selected || false, key)
      );
    }, [isPersonalizing]);

    if (!isCookiesBoxOpen) return null;

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
      setCategories(
        Object.keys(selectedCategories).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {}
        )
      );
    };

    const handleAcceptClick = () => {
      if (!isPersonalizing) selectAllCategories();
      changeCookiesBoxState(false);

      cookie.set(`${COOKIE_PREFIX}accepted`, "true");

      Object.entries(selectedCategories).forEach(([key, { selected }]) => {
        cookie.set(`${COOKIE_PREFIX}${key}`, selected?.toString() || "false");
      });
    };

    return (
      <div className="tw-fixed tw-z-[99999] tw-flex tw-justify-center tw-items-end tw-w-screen tw-h-screen tw-left-0 tw-top-0 lg:tw-p-10 lg:tw-justify-end">
        <div
          {...domProps}
          ref={innerRef}
          className={cn(
            "tw-p-12 tw-flex tw-flex-col tw-gap-16 tw-shadow-sm tw-w-fit lg:tw-max-w-[396px]",
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
              {Object.entries(selectedCategories).map(
                ([key, { title, description, selected }], idx) => (
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
                        checked={selected}
                        onCheckedChange={(checked) =>
                          onSwitchChange(idx, checked, key)
                        }
                        className="sw tw-h-[22px] tw-px-[2px]"
                        style={
                          {
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
              {texts?.description}
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
      </div>
    );
  }
);

Cookies.defaultProps = defaultProps;

export default Cookies;
