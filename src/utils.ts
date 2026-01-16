import type { CopyrightOptions } from "./types";

/**
 * Returns the current year.
 *
 * @returns The current year as a number
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * Formats a year range as a string.
 *
 * @param startYear - The start year
 * @param endYear - The end year
 * @returns A year range string (e.g., "2020-2026") or single year if equal
 */
export function formatYearRange(startYear: number, endYear: number): string {
  return startYear < endYear ? `${startYear}-${endYear}` : String(endYear);
}

/**
 * Validates copyright options.
 *
 * @param options - The options to validate
 * @throws {Error} If owner is empty
 * @throws {Error} If endYear is less than startYear
 */
export function validateOptions(options: CopyrightOptions): void {
  if (!options.owner || options.owner.trim() === "") {
    throw new Error("Owner name is required and cannot be empty");
  }

  const currentYear = getCurrentYear();
  const startYear = options.startYear ?? currentYear;
  const endYear =
    options.endYear === "auto" || options.endYear === undefined
      ? currentYear
      : options.endYear;

  if (endYear < startYear) {
    throw new Error(
      `End year (${endYear}) cannot be less than start year (${startYear})`,
    );
  }
}

/**
 * Context object for template variable resolution.
 */
export interface TemplateContext {
  owner: string;
  startYear: number;
  endYear: number;
}

/**
 * Map of template variable names to resolver functions.
 */
const TEMPLATE_VARS: Record<string, (ctx: TemplateContext) => string> = {
  symbol: () => "\u00A9",
  year: (ctx) => formatYearRange(ctx.startYear, ctx.endYear),
  owner: (ctx) => ctx.owner,
  startYear: (ctx) => String(ctx.startYear),
  endYear: (ctx) => String(ctx.endYear),
};

/**
 * Parses a template string and replaces variables with their values.
 *
 * @param template - The template string containing variables like \{symbol\}
 * @param context - The context object with values for variable resolution
 * @returns The parsed template with variables replaced
 */
export function parseTemplate(
  template: string,
  context: TemplateContext,
): string {
  return template.replaceAll(/\{(\w+)\}/g, (match, key: string) => {
    const resolver = TEMPLATE_VARS[key];
    return resolver ? resolver(context) : match;
  });
}

/**
 * Converts a style object to a CSS string for inline styles.
 *
 * @param style - Object with camelCase CSS properties
 * @returns A CSS string suitable for the style attribute
 */
export function styleObjectToString(style: Record<string, string>): string {
  return Object.entries(style)
    .map(([key, value]) => {
      const cssKey = key.replaceAll(/([A-Z])/g, "-$1").toLowerCase();
      return `${cssKey}: ${value}`;
    })
    .join("; ");
}
