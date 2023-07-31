"use client";

import {
  forwardRef,
  PropsWithChildren,
  useState,
  useRef,
  useImperativeHandle,
  useEffect,
  CSSProperties,
  HTMLAttributes,
} from "react";

import gsap from "gsap";

import { Switch } from "./@/components/ui/switch";

import hexToHsl from "./utils/hexToHsl";
import { useCookies } from ".";
import { cn } from "./@/lib/utils";

type CookiesProps = {
  categories: {
    title: string;
    description: string;
    selected: boolean;
  }[];
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
};

const defaultProps: CookiesProps = {
  categories: [],
  texts: {
    title: "Pliki cookies",
    accept: "akceptuję",
    choiceAccept: "akceptuję wybór",
    back: "wróć",
    personalize: "dostosuj",
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
  PropsWithChildren<CookiesProps> & HTMLAttributes<HTMLDivElement>
>(({ categories, texts, colors, children, className, ...domProps }, ref) => {
  const [isPersonalizing, setIsPersonalizing] = useState(false);

  const [categoriesExpanded, setCategoriesExpanded] = useState<boolean[]>([
    ...categories.map(() => false),
  ]);

  const {
    setCategory,
    categories: selectedCategories,
    setCategories,
    isBoxOpen,
    changeBoxState,
  } = useCookies();

  const innerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => innerRef.current!);

  useEffect(() => {
    setCategories(
      categories.reduce(
        (acc, { selected, title }) => ({ ...acc, [title]: selected }),
        {}
      )
    );
  }, []);

  if (!isBoxOpen) return null;

  const onSwitchChange = (idx: number, checked: boolean, name: string) => {
    const switchBtn = innerRef.current?.querySelectorAll("span[data-state]")[
      idx
    ] as HTMLButtonElement;

    switchBtn.style.setProperty(
      "--background",
      hexToHsl(checked ? colors?.switchChecked : colors?.main)
    );

    setCategory(name, checked);
  };

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
      categories.reduce((acc, { title }) => ({ ...acc, [title]: true }), {})
    );
  };

  const handleAcceptClick = () => {
    if (!isPersonalizing) selectAllCategories();
    changeBoxState(false);
  };

  return (
    <div
      {...domProps}
      ref={innerRef}
      className={cn(
        "p-12 flex flex-col gap-16 shadow-sm w-fit lg:max-w-[396px]",
        className
      )}
      style={{ background: colors?.background }}
    >
      <p className="text-lg font-medium" style={{ color: colors?.main }}>
        {texts?.title}
      </p>
      {isPersonalizing ? (
        <div className="flex flex-col gap-4">
          {categories?.map(({ title, description }, idx) => (
            <div className="flex flex-col gap-2" key={title}>
              <div className="flex gap-4 items-center">
                <button
                  className="w-fit h-fit transition-transform"
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
                  className="w-full text-base cursor-pointer"
                  style={{ color: colors?.main }}
                  onClick={() => onCategoryExpand(idx)}
                >
                  {title}
                </p>
                <Switch
                  checked={selectedCategories[title]}
                  onCheckedChange={(checked) =>
                    onSwitchChange(idx, checked, title)
                  }
                  className="h-[22px] [&>span]:h-[14px] [&>span]:w-[14px] px-[2px]"
                  style={
                    {
                      "--primary": hexToHsl(colors?.main),
                      "--input": hexToHsl(colors?.switch),
                      "--background": hexToHsl(
                        selectedCategories[title]
                          ? colors?.switchChecked
                          : colors?.main
                      ),
                    } as CSSProperties
                  }
                />
              </div>
              <p
                className="category-description text-xs h-0 !leading-[18px] opacity-0 pointer-events-none"
                style={{ color: colors?.description }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p
          className="text-sm !leading-7"
          style={{ color: colors?.description }}
        >
          {children}
        </p>
      )}

      <div>
        <button
          className="px-6 py-4 text-sm"
          style={{ background: colors?.main, color: colors?.button }}
          onClick={handleAcceptClick}
        >
          {isPersonalizing ? texts?.choiceAccept : texts?.accept}
        </button>
        <button
          onClick={() => setIsPersonalizing(!isPersonalizing)}
          className="px-6 py-4 text-sm"
          style={{ color: colors?.description }}
        >
          {isPersonalizing ? texts?.back : texts?.personalize}
        </button>
      </div>
    </div>
  );
});

Cookies.defaultProps = defaultProps;

export default Cookies;
