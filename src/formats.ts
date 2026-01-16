import type { CopyrightFormat } from "./types";

/**
 * Template strings for each preset copyright format.
 */
export const FORMAT_TEMPLATES: Record<CopyrightFormat, string> = {
  minimal: "{symbol} {year} {owner}",
  standard: "Copyright {symbol} {year} {owner}",
  full: "Copyright {symbol} {year} {owner}. All rights reserved.",
  legal: "Copyright {symbol} {year} {owner}. All Rights Reserved.",
};
