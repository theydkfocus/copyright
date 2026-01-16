import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  formatYearRange,
  getCurrentYear,
  parseTemplate,
  styleObjectToString,
  validateOptions,
} from "../src/utils";

describe("getCurrentYear", () => {
  it("should return the current year", () => {
    const year = getCurrentYear();
    expect(year).toBe(new Date().getFullYear());
  });
});

describe("formatYearRange", () => {
  it("should return a range when startYear < endYear", () => {
    expect(formatYearRange(2020, 2026)).toBe("2020-2026");
  });

  it("should return a single year when startYear === endYear", () => {
    expect(formatYearRange(2026, 2026)).toBe("2026");
  });

  it("should return endYear when startYear > endYear (validation happens elsewhere)", () => {
    expect(formatYearRange(2026, 2020)).toBe("2020");
  });
});

describe("validateOptions", () => {
  let mockDate: Date;

  beforeEach(() => {
    mockDate = new Date(2026, 0, 1);
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should throw an error for empty owner", () => {
    expect(() => validateOptions({ owner: "" })).toThrow(
      "Owner name is required and cannot be empty",
    );
  });

  it("should throw an error for whitespace-only owner", () => {
    expect(() => validateOptions({ owner: "   " })).toThrow(
      "Owner name is required and cannot be empty",
    );
  });

  it("should throw an error when endYear < startYear", () => {
    expect(() =>
      validateOptions({ owner: "Test", startYear: 2025, endYear: 2020 }),
    ).toThrow("End year (2020) cannot be less than start year (2025)");
  });

  it("should not throw for valid options", () => {
    expect(() => validateOptions({ owner: "Test" })).not.toThrow();
    expect(() =>
      validateOptions({ owner: "Test", startYear: 2020, endYear: 2026 }),
    ).not.toThrow();
    expect(() =>
      validateOptions({ owner: "Test", startYear: 2026, endYear: "auto" }),
    ).not.toThrow();
  });
});

describe("parseTemplate", () => {
  const context = {
    owner: "ACME Corp",
    startYear: 2020,
    endYear: 2026,
  };

  it("should replace {symbol} with copyright symbol", () => {
    expect(parseTemplate("{symbol}", context)).toBe("\u00A9");
  });

  it("should replace {year} with year range", () => {
    expect(parseTemplate("{year}", context)).toBe("2020-2026");
  });

  it("should replace {owner} with owner name", () => {
    expect(parseTemplate("{owner}", context)).toBe("ACME Corp");
  });

  it("should replace {startYear} with start year", () => {
    expect(parseTemplate("{startYear}", context)).toBe("2020");
  });

  it("should replace {endYear} with end year", () => {
    expect(parseTemplate("{endYear}", context)).toBe("2026");
  });

  it("should replace multiple variables in a template", () => {
    const template = "{symbol} {year} {owner}";
    expect(parseTemplate(template, context)).toBe("\u00A9 2020-2026 ACME Corp");
  });

  it("should leave unknown variables as-is", () => {
    expect(parseTemplate("{unknown}", context)).toBe("{unknown}");
  });

  it("should handle templates with no variables", () => {
    expect(parseTemplate("No variables here", context)).toBe(
      "No variables here",
    );
  });
});

describe("styleObjectToString", () => {
  it("should convert camelCase to kebab-case", () => {
    expect(styleObjectToString({ fontSize: "14px" })).toBe("font-size: 14px");
  });

  it("should handle multiple properties", () => {
    const style = { fontSize: "14px", color: "gray" };
    expect(styleObjectToString(style)).toBe("font-size: 14px; color: gray");
  });

  it("should handle properties without uppercase letters", () => {
    expect(styleObjectToString({ color: "red" })).toBe("color: red");
  });

  it("should handle empty object", () => {
    expect(styleObjectToString({})).toBe("");
  });
});
