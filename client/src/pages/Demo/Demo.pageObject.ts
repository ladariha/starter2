import { BasePageObject } from "../../testutils/BasePageObject";
import { waitFor } from "@testing-library/react";

export class DemoPageObject extends BasePageObject {
  async assertName(name: string) {
    await waitFor(() => {
      expect(this.getBySelector(DemoPageObject.CSS_SELECTORS.name)).toHaveTextContent(name);
    });
  }

  static CSS_SELECTORS = {
    name: ".name"
  };
}
