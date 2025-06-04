import { RenderResult } from "@testing-library/react";

export
class BasePageObject {
  public screen: RenderResult;
  public restringCssSelector: string;

  constructor(renderResult: RenderResult, restringCssSelector?: string) {
    this.screen = renderResult;
    this.restringCssSelector = restringCssSelector || "";
  }

  private getSelector(cssSelector: string) {
    return [this.restringCssSelector, cssSelector].join(" ");
  }

  queryBySelector(cssSelector: string): Element | undefined {
    const result = this.screen.baseElement.querySelector(this.getSelector(cssSelector));
    return result || undefined;
  }

  queryAllBySelector(cssSelector: string): Element[] {
    const result = this.screen.baseElement.querySelectorAll(this.getSelector(cssSelector));
    return result.length > 0 ? Array.from(result) : [];
  }

  getBySelector(cssSelector: string): Element {
    const result = this.screen.baseElement.querySelector(this.getSelector(cssSelector));
    if (!result) {
      throw new Error(`No element '${this.getSelector(cssSelector)}' has been found`);
    }
    return result;
  }

  getAllBySelector(cssSelector: string): Element[] {
    const result = this.screen.baseElement.querySelectorAll(this.getSelector(cssSelector));
    if (result.length < 1) {
      throw new Error(`No elements '${this.getSelector(cssSelector)}' have been found`);
    }
    return Array.from(result);
  }

  debug(): void {
    this.screen.debug();
  }
}
