/**
 * Preset format identifiers for common copyright text patterns.
 */
export type CopyrightFormat = "minimal" | "standard" | "full" | "legal";

/**
 * Core configuration for generating copyright text.
 */
export interface CopyrightOptions {
  /**
   * Copyright holder name.
   *
   * @throws {Error} If empty string provided.
   */
  owner: string;

  /**
   * First year of copyright.
   *
   * @default Current year
   */
  startYear?: number;

  /**
   * Last year of copyright.
   * - `'auto'`: Uses current year at runtime
   * - `number`: Explicit year value
   *
   * @default 'auto'
   * @throws {Error} If numeric value is less than startYear
   */
  endYear?: number | "auto";

  /**
   * Preset format to use for copyright text.
   *
   * @default 'minimal'
   */
  format?: CopyrightFormat;

  /**
   * Custom template string. When provided, overrides `format`.
   *
   * Available variables:
   * - `{symbol}` - copyright symbol
   * - `{year}` - Year or year range (e.g., "2020-2026")
   * - `{owner}` - Owner name
   * - `{startYear}` - Start year only
   * - `{endYear}` - End year only
   *
   * Unknown variables are left as-is in the output.
   *
   * @example "{symbol} {year} - {owner}"
   */
  template?: string;
}

/**
 * Extended configuration for HTML/DOM rendering.
 */
export interface CopyrightRenderOptions extends CopyrightOptions {
  /**
   * HTML element tag to use for rendering.
   *
   * @default 'span'
   */
  tag?: keyof HTMLElementTagNameMap;

  /**
   * CSS class(es) to apply to the element.
   */
  className?: string;

  /**
   * Inline CSS styles as key-value pairs.
   * Uses camelCase property names (React convention).
   *
   * @example \{ fontSize: '14px', color: 'gray' \}
   */
  style?: Record<string, string>;
}
