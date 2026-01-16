import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Copyright } from "../src/copyright";

describe("Copyright", () => {
  let mockDate: Date;

  beforeEach(() => {
    mockDate = new Date(2026, 0, 1);
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("constructor", () => {
    it("should create an instance with valid options", () => {
      const copyright = new Copyright({ owner: "John Doe" });
      expect(copyright).toBeInstanceOf(Copyright);
    });

    it("should throw an error for empty owner", () => {
      expect(() => new Copyright({ owner: "" })).toThrow(
        "Owner name is required and cannot be empty",
      );
    });

    it("should throw an error when endYear < startYear", () => {
      expect(
        () => new Copyright({ owner: "Test", startYear: 2025, endYear: 2020 }),
      ).toThrow("End year (2020) cannot be less than start year (2025)");
    });
  });

  describe("getText", () => {
    it("should return minimal format by default", () => {
      const copyright = new Copyright({ owner: "John Doe" });
      expect(copyright.getText()).toBe("\u00A9 2026 John Doe");
    });

    it("should use startYear when provided", () => {
      const copyright = new Copyright({ owner: "John Doe", startYear: 2020 });
      expect(copyright.getText()).toBe("\u00A9 2020-2026 John Doe");
    });

    it("should handle explicit endYear", () => {
      const copyright = new Copyright({
        owner: "John Doe",
        startYear: 2020,
        endYear: 2025,
      });
      expect(copyright.getText()).toBe("\u00A9 2020-2025 John Doe");
    });

    it("should handle endYear: 'auto'", () => {
      const copyright = new Copyright({
        owner: "John Doe",
        startYear: 2020,
        endYear: "auto",
      });
      expect(copyright.getText()).toBe("\u00A9 2020-2026 John Doe");
    });
  });

  describe("setOptions", () => {
    it("should update options and return this for chaining", () => {
      const copyright = new Copyright({ owner: "John Doe" });
      const result = copyright.setOptions({ owner: "Jane Doe" });

      expect(result).toBe(copyright);
      expect(copyright.getText()).toBe("\u00A9 2026 Jane Doe");
    });

    it("should merge options instead of replacing", () => {
      const copyright = new Copyright({ owner: "John Doe", startYear: 2020 });
      copyright.setOptions({ owner: "Jane Doe" });

      expect(copyright.getText()).toBe("\u00A9 2020-2026 Jane Doe");
    });

    it("should validate new options", () => {
      const copyright = new Copyright({ owner: "John Doe" });
      expect(() => copyright.setOptions({ owner: "" })).toThrow(
        "Owner name is required and cannot be empty",
      );
    });
  });

  describe("static create", () => {
    it("should create a new Copyright instance", () => {
      const copyright = Copyright.create({ owner: "John Doe" });
      expect(copyright).toBeInstanceOf(Copyright);
      expect(copyright.getText()).toBe("\u00A9 2026 John Doe");
    });
  });

  describe("toHTML", () => {
    it("should return HTML with default span tag", () => {
      const copyright = new Copyright({ owner: "John Doe" });
      expect(copyright.toHTML()).toBe("<span>\u00A9 2026 John Doe</span>");
    });

    it("should use custom tag", () => {
      const copyright = new Copyright({ owner: "John Doe" });
      expect(copyright.toHTML({ tag: "footer" })).toBe(
        "<footer>\u00A9 2026 John Doe</footer>",
      );
    });

    it("should add className attribute", () => {
      const copyright = new Copyright({ owner: "John Doe" });
      expect(copyright.toHTML({ className: "copyright-text" })).toBe(
        '<span class="copyright-text">\u00A9 2026 John Doe</span>',
      );
    });

    it("should add style attribute", () => {
      const copyright = new Copyright({ owner: "John Doe" });
      expect(copyright.toHTML({ style: { fontSize: "14px" } })).toBe(
        '<span style="font-size: 14px">\u00A9 2026 John Doe</span>',
      );
    });

    it("should combine tag, className, and style", () => {
      const copyright = new Copyright({ owner: "John Doe" });
      const html = copyright.toHTML({
        tag: "footer",
        className: "footer-text",
        style: { color: "gray", fontSize: "12px" },
      });
      expect(html).toBe(
        '<footer class="footer-text" style="color: gray; font-size: 12px">\u00A9 2026 John Doe</footer>',
      );
    });
  });
});
