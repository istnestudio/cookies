import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import Cookies, { CookiesWrapper } from "../";

const meta: Meta<typeof Cookies> = {
  component: () => (
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
  ),
};
export default meta;

type Story = StoryObj<typeof Cookies>;

export const Primary: Story = {};
