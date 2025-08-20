import { describe, it, expect } from "vitest";
import { IdHelper } from "../src";

describe("IdHelper", () => {
  it("should generate ID with default options", () => {
    const userIdHelper = new IdHelper("user");
    const id = userIdHelper.generate();

    // Test that it matches the default format
    expect(id).toMatch(/^user_[a-zA-Z0-9]{10}$/);

    // Test that it starts with the prefix
    expect(id.startsWith("user_")).toBe(true);

    // Test default total length (prefix + separator + id)
    expect(id.length).toBe(15); // 'user' + '_' + 10 chars
  });

  it("should generate ID with custom options", () => {
    const userIdHelper = new IdHelper("user", {
      separator: "::",
      length: 12,
      customAlphabets: "abcdefghijklmnopqrstuvwxyz",
    });

    const id = userIdHelper.generate();

    // Test that it matches the custom format
    expect(id).toMatch(/^user::[a-z]{12}$/);

    // Test that it starts with the prefix
    expect(id.startsWith("user::")).toBe(true);

    // Test custom total length (prefix + separator + id)
    expect(id.length).toBe(18); // 'user' + '::' + 12 chars
  });

  it("should generate ID with custom separator", () => {
    const userIdHelper = new IdHelper("user", { separator: "::" });

    const id = userIdHelper.generate();

    // Test that it matches the custom format
    expect(id).toMatch(/^user::[a-zA-Z0-9]{10}$/);

    // Test that it starts with the prefix
    expect(id.startsWith("user::")).toBe(true);

    // Test custom total length (prefix + separator + id)
    expect(id.length).toBe(16); // 'user' + '::' + 10 chars
  });

  it("should generate ID with custom length", () => {
    const userIdHelper = new IdHelper("user", { length: 12 });

    const id = userIdHelper.generate();

    // Test that it matches the custom format
    expect(id).toMatch(/^user_[a-zA-Z0-9]{12}$/);

    // Test that it starts with the prefix
    expect(id.startsWith("user_")).toBe(true);

    // Test custom total length (prefix + separator + id)
    expect(id.length).toBe(17); // 'user' + '_' + 12 chars
  });

  it("should generate ID with custom alphabets", () => {
    const userIdHelper = new IdHelper("user", {
      customAlphabets: "abcdefghijklmnopqrstuvwxyz",
    });

    const id = userIdHelper.generate();

    // Test that it matches the custom format
    expect(id).toMatch(/^user_[a-z]{10}$/);

    // Test that it starts with the prefix
    expect(id.startsWith("user_")).toBe(true);

    // Test custom total length (prefix + separator + id)
    expect(id.length).toBe(15); // 'user' + '_' + 10 chars
  });
});
