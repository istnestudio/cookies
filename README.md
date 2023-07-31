<div align="center"">

![Title](https://avatars.githubusercontent.com/u/100209677?s=200&v=4)

# Cookies 🍪

Customisable cookie consent box made for React apps.

![Title](https://cdn.discordapp.com/attachments/747723783544242299/1135535193088860160/image.png)

</div>

## Navigation 🔍

- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
- [Types](#types)
- [Hooks](#hooks)

<a name="installation"></a>

## Instalation 💽

Add dependency with your favorite package manager

```bash
pnpm add @istnestudio/cookies
yarn add @istnestudio/cookies
npm install --save @istnestudio/cookies
```

<a name="usage"></a>

## Usage 🔧

1. Include stylesheet (place it in the top of other css imports)

```tsx
import "@istnestudio/cookies/dist/styles.css";
import "../styles/satoshi.css"; //example css
import "../styles/global.css"; // example css
```

2. Wrap your app with **CookiesWrapper** component, place **Cookies** component inside and populate **CookiesWrapper** with cookie consent categories.

```tsx
import Cookies, { CookiesWrapper } from "@istnestudio/cookies";
import "@istnestudio/cookies/dist/styles.css";

const App = () => (
  <CookiesWrapper
    categories={{
      necessary: {
        title: "Strictly Necessary",
        description:
          "Strictly necessary cookies are essential for websites to provide simple functions or to access particular features. Such features include the ability to sign in, add items to your cart in an online store, or purchase stuff on the internet.",
        selected: true,
      },
      targeting: {
        title: "Targeting",
        description:
          "Targeting cookies help to attract customers with targeted ads and also can be shared with other advertisers so that the performance of such ads can be monitored and measured. Targeting cookies also help build user profiles – by tracking data, websites can offer their customers the best-suited ads for their needs and keep ad revenue coming in.",
        selected: false,
      },
    }}
  >
    <Cookies />
    {/*Rest of the app.... */}
  </CookiesWrapper>
);

export default App;
```

<a name="customization"></a>

## Customization 🎨

```tsx
<Cookies
  texts={{
    title: "Cookie files",
    description:
      "The site uses cookies to provide the highest quality service and for statistical purposes. You can read more in our privacy policy page",
    accept: "accept",
    choiceAccept: "accept the choice",
    back: "back",
    personalize: "personalize",
  }}
  colors={{
    switch: "#eaeaea",
    switchChecked: "#FFF",
    main: "#002B89",
    background: "#FFF",
    description: "#777",
    button: "#FFF",
  }}
  onCookiesChange={(categories) => {}}
  onCookiesBoxState={(isOpen) => {}}
/>
```

![Title](https://cdn.discordapp.com/attachments/747723783544242299/1135535193088860160/image.png)

![Title](https://cdn.discordapp.com/attachments/747723783544242299/1135535971954343946/image.png)

![Title](https://cdn.discordapp.com/attachments/747723783544242299/1135535636141584484/image.png)

![Title](https://cdn.discordapp.com/attachments/747723783544242299/1135536242491150426/image.png)

<a name="types"></a>

## Types ✒️

```ts
type Category = {
  title: string;
  description: string;
  selected?: boolean;
};

//useCookie return type
type CookiesContextProps = {
  categories: { [key: string]: Category };
  setCategory: (key: string, state: boolean) => any;
  isCookiesBoxOpen: boolean;
  changeCookiesBoxState: (state: boolean) => any;
};

//Default exported component props
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

//Default props of default exported component
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

//CookiesWrapper props
type CookiesWrapperProps = PropsWithChildren<{
  categories: CookiesContextProps["categories"];
}>;
```

<a name="hooks"></a>

## Hooks 🪝

1. **useCookies** - Returns basic info and manipulation methods for cookie box

```ts
const { setCategory, categories, isCookiesBoxOpen, changeCookiesBoxState } =
  useCookies();
```

2. **useCookiesBoxState** - Triggers callback when cookie box is opening or closing

```ts
useCookiesBoxState((isOpen) => {});
```

3. **useCookiesChange** - Triggers callback when cookie consent is switched

```ts
useCookiesBoxState((isOpen) => {});
```
