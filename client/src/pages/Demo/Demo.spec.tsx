import { render } from "@testing-library/react";
import { Demo, Props } from "./Demo";
import { DemoPageObject } from "./Demo.pageObject";
import { BrowserRouter } from "react-router";

describe("Demo component", () => {
  const baseProps: Props = {
    name: "Lada",
  };

  const renderComponent = (props = baseProps) => {
    return new DemoPageObject(render(<BrowserRouter><Demo {...props} /></BrowserRouter>));
  };

  it("should render lada", async () => {
    const demo = renderComponent();
    await demo.assertName(baseProps.name);
  });

  it("should render riha", async () => {
    const demo = renderComponent({ name: "riha" });
    await demo.assertName("riha");
  });
});
