import { FORMAT_TEMPLATES } from "./formats";
import type { CopyrightOptions, CopyrightRenderOptions } from "./types";
import {
  getCurrentYear,
  parseTemplate,
  styleObjectToString,
  validateOptions,
} from "./utils";

/**
 * Main class for generating copyright notices.
 */
export class Copyright {
  private options: CopyrightOptions;

  /**
   * Creates a new Copyright instance.
   *
   * @param options - Configuration options for the copyright notice
   * @throws {Error} If owner is empty
   * @throws {Error} If endYear is less than startYear
   */
  constructor(options: CopyrightOptions) {
    validateOptions(options);
    this.options = { ...options };
  }

  /**
   * Factory method for creating a Copyright instance.
   *
   * @param options - Configuration options for the copyright notice
   * @returns A new Copyright instance
   */
  static create(options: CopyrightOptions): Copyright {
    return new Copyright(options);
  }

  /**
   * Updates the options for this instance.
   *
   * @param options - Partial options to merge with existing options
   * @returns This instance for chaining
   * @throws {Error} If the merged options are invalid
   */
  setOptions(options: Partial<CopyrightOptions>): this {
    const merged = { ...this.options, ...options };
    validateOptions(merged);
    this.options = merged;
    return this;
  }

  /**
   * Returns the plain text copyright notice.
   *
   * @returns The formatted copyright string
   */
  getText(): string {
    const currentYear = getCurrentYear();
    const startYear = this.options.startYear ?? currentYear;
    const endYear =
      this.options.endYear === "auto" || this.options.endYear === undefined
        ? currentYear
        : this.options.endYear;

    const context = {
      owner: this.options.owner,
      startYear,
      endYear,
    };

    const template =
      this.options.template ??
      FORMAT_TEMPLATES[this.options.format ?? "minimal"];

    return parseTemplate(template, context);
  }

  /**
   * Returns an HTML string with the copyright notice.
   *
   * @param renderOptions - Optional rendering configuration
   * @returns An HTML string with the configured tag and attributes
   */
  toHTML(renderOptions?: Partial<CopyrightRenderOptions>): string {
    const tag = renderOptions?.tag ?? "span";
    const text = this.getText();

    const attributes: string[] = [];

    if (renderOptions?.className) {
      attributes.push(`class="${renderOptions.className}"`);
    }

    if (renderOptions?.style && Object.keys(renderOptions.style).length > 0) {
      attributes.push(`style="${styleObjectToString(renderOptions.style)}"`);
    }

    const attrString = attributes.length > 0 ? ` ${attributes.join(" ")}` : "";

    return `<${tag}${attrString}>${text}</${tag}>`;
  }

  /**
   * Renders the copyright notice to a DOM element.
   *
   * @param target - CSS selector string or Element reference
   * @param renderOptions - Optional rendering configuration
   * @returns The created Element
   * @throws {Error} If target element is not found
   */
  render(
    target: string | Element,
    renderOptions?: Partial<CopyrightRenderOptions>,
  ): Element {
    if (typeof target === "string") {
      const container = document.querySelector(target);
      if (!container) {
        throw new Error(`Target element not found: ${target}`);
      }
      return this.renderToElement(container, renderOptions);
    }
    return this.renderToElement(target, renderOptions);
  }

  private renderToElement(
    container: Element,
    renderOptions?: Partial<CopyrightRenderOptions>,
  ): Element {
    const tag = renderOptions?.tag ?? "span";
    const el = document.createElement(tag);
    el.textContent = this.getText();

    if (renderOptions?.className) {
      el.className = renderOptions.className;
    }

    if (renderOptions?.style) {
      Object.assign(el.style, renderOptions.style);
    }

    container.appendChild(el);
    return el;
  }
}
