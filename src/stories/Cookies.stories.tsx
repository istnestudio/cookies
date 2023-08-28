import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import Cookies from "../";
import useCookies from "../hooks/useCookies";

const TestInfo = () => {
  const { categories } = useCookies();

  if (!categories) return null;

  return (
    <div>
      {Object.entries(categories).map(([key, value]) => (
        <p className="tw-text-white" key={key}>
          {key}: <b className=" tw-text-blue-400">{value.toString()}</b>
        </p>
      ))}
    </div>
  );
};

const meta: Meta<typeof Cookies> = {
  component: () => (
    <>
      <Cookies
        colors={{
          switch: "#eaeaea",
          switchChecked: "#FFF",
          main: "#002B89",
          background: "#FFF",
          description: "#777",
          button: "#FFF",
        }}
        categories={{
          necessary: {
            title: "Strictly Necessary",
            description:
              "Strictly necessary cookies are essential for websites to provide simple functions or to access particular features. Such features include the ability to sign in, add items to your cart in an online store, or purchase stuff on the internet.",
            selected: true,
            uncheckable: true,
          },
          targeting: {
            title: "Targeting",
            description:
              "Targeting cookies help to attract customers with targeted ads and also can be shared with other advertisers so that the performance of such ads can be monitored and measured. Targeting cookies also help build user profiles – by tracking data, websites can offer their customers the best-suited ads for their needs and keep ad revenue coming in.",
            selected: false,
          },
        }}
      >
        The site uses cookies to provide the highest quality service and for
        statistical purposes. You can read more in our{" "}
        <a style={{ color: "#002b89", fontWeight: "600" }} href="#">
          privacy policy
        </a>{" "}
        page
      </Cookies>
      <TestInfo />
    </>
  ),
};
export default meta;

type Story = StoryObj<typeof Cookies>;

export const Primary: Story = {};
